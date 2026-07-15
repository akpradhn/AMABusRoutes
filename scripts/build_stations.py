#!/usr/bin/env python3
"""Build searchable station coordinates from OSM stops and route terminals."""

import json
import math
import re
import sys
from collections import defaultdict
from pathlib import Path


def normalize(value):
    return re.sub(r"[^a-z0-9]+", " ", value.lower()).strip()


def clean_name(value):
    return re.sub(r"Bhubaneshwar", "Bhubaneswar", value, flags=re.IGNORECASE).strip()


def route_score(relation):
    score = sum(len(member.get("geometry", [])) for member in relation.get("members", []))
    if relation.get("tags", {}).get("roundtrip") == "yes":
        score -= 100_000
    return score


def area_for(lat, lon):
    if lat < 19.96:
        return "Puri / Konark"
    if lat > 20.40 and lon > 85.82:
        return "Cuttack region"
    if lon < 85.73:
        return "Khordha / Jatani"
    if lon > 86.0:
        return "Coastal region"
    return "Bhubaneswar region"


def distance_km(a, b):
    lat1, lon1 = map(math.radians, a)
    lat2, lon2 = map(math.radians, b)
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    value = math.sin(dlat / 2) ** 2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2) ** 2
    return 6371 * 2 * math.atan2(math.sqrt(value), math.sqrt(1 - value))


def add_station(stations, name, lat, lon, source):
    if not name:
        return
    name = clean_name(name)
    area = area_for(lat, lon)
    key = f"{normalize(name)}|{area}"
    station = {
        "name": name,
        "area": area,
        "lat": round(float(lat), 6),
        "lon": round(float(lon), 6),
        "source": source,
    }
    existing = stations.get(key)
    if not existing or (source == "terminal" and existing["source"] != "terminal"):
        stations[key] = station


def main():
    if len(sys.argv) != 4:
        raise SystemExit("usage: build_stations.py OSM_STOPS_JSON OSM_ROUTES_JSON OUTPUT_JS")

    stops = json.loads(Path(sys.argv[1]).read_text())
    route_data = json.loads(Path(sys.argv[2]).read_text())
    stations = {}

    for element in stops.get("elements", []):
        tags = element.get("tags", {})
        add_station(stations, tags.get("name"), element["lat"], element["lon"], "stop")

    by_ref = {}
    for relation in route_data.get("elements", []):
        ref = relation.get("tags", {}).get("ref")
        if ref and (ref not in by_ref or route_score(relation) > route_score(by_ref[ref])):
            by_ref[ref] = relation

    terminal_candidates = defaultdict(list)
    for relation in by_ref.values():
        tags = relation.get("tags", {})
        members = [member for member in relation.get("members", []) if member.get("geometry")]
        if not members:
            continue
        first = members[0]["geometry"][0]
        last = members[-1]["geometry"][-1]
        if tags.get("from"):
            terminal_candidates[normalize(tags["from"])].append((tags["from"], first["lat"], first["lon"]))
        if tags.get("to"):
            terminal_candidates[normalize(tags["to"])].append((tags["to"], last["lat"], last["lon"]))

    for candidates in terminal_candidates.values():
        clusters = []
        for candidate in candidates:
            point = (candidate[1], candidate[2])
            matching = next((cluster for cluster in clusters if distance_km(point, (cluster[0][1], cluster[0][2])) <= 0.75), None)
            if matching is None:
                clusters.append([candidate])
            else:
                matching.append(candidate)
        cluster = max(clusters, key=len)
        name = cluster[0][0]
        lat = sum(candidate[1] for candidate in cluster) / len(cluster)
        lon = sum(candidate[2] for candidate in cluster) / len(cluster)
        add_station(stations, name, lat, lon, "terminal")

    output = sorted(stations.values(), key=lambda station: normalize(station["name"]))
    for station in output:
        station["display"] = f'{station["name"]} — {station["area"]}'

    text = "window.AMA_BUS_STATIONS=" + json.dumps(output, separators=(",", ":"), ensure_ascii=True) + ";\n"
    Path(sys.argv[3]).parent.mkdir(parents=True, exist_ok=True)
    Path(sys.argv[3]).write_text(text)
    print(f"Wrote {len(output)} searchable stations to {sys.argv[3]}")


if __name__ == "__main__":
    main()

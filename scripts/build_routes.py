#!/usr/bin/env python3
"""Build the compact browser dataset from an Overpass `out geom` response."""

import json
import sys
from pathlib import Path


PDF_ROUTES = {
    "09": ("Acharya Vihar", "Patia", "Niladri Vihar"),
    "10": ("Biju Patnaik International Airport", "Biju Patnaik Park, Cuttack", "Nandankanan"),
    "11": ("Bhubaneswar Railway Station", "Nandankanan High School", "Acharya Vihar"),
    "12": ("Bhubaneswar Railway Station", "Nandankanan", "Jaydev Vihar"),
    "13": ("Nandankanan", "Lingipur", "AG Square"),
    "16": ("Bhubaneswar Railway Station", "Biju Patnaik Park, Cuttack", "NH"),
    "17": ("Biju Patnaik International Airport", "Barabati Stadium, Cuttack", "NH"),
    "18": ("Baramunda ISBT", "Jagatpur", "Nandankanan"),
    "19": ("AIIMS", "Mahanadi Vihar, OMP Square", "NH"),
    "20": ("Bhubaneswar Railway Station", "Khordha New Bus Stand", "Vani Vihar"),
    "21": ("Bhubaneswar Railway Station", "Khordha New Bus Stand", "OUAT"),
    "22A": ("Bhubaneswar Railway Station", "Khordha Road Station", ""),
    "22B": ("Jatani Gate", "Khordha New Bus Stand", "Jatani"),
    "23": ("Bhubaneswar Railway Station", "SUM Hospital", ""),
    "24": ("Sai Mandir", "Kalinga Vihar", ""),
    "24E": ("Kalinga Vihar", "Sai Mandir (Ranga Bazar)", ""),
    "25": ("Ranasinghpur (Dumduma)", "DHPL Sahoo Residency, Mancheswar", "Rangamatia"),
    "26": ("Chakeisiani", "Jadupur (Dumduma)", ""),
    "27": ("Bhubaneswar Railway Station", "AIIMS Hospital", "Delta Square"),
    "28": ("Bhubaneswar Railway Station", "Trident Galaxy", "Kalinga Nagar"),
    "29": ("Kalinga Vihar (K9B)", "Sai Mandir", ""),
    "29E": ("Kalinga Vihar (K9B)", "SBI Colony, Kesora", ""),
    "30": ("Bhubaneswar Railway Station", "Chatabar", "SUM Hospital"),
    "31": ("Bhubaneswar Railway Station", "Hi-Tech Hospital", "Laxmi Sagar"),
    "32": ("Baramunda ISBT", "Lingaraj Temple", "Master Canteen"),
    "33": ("Bhubaneswar Railway Station", "Danda Mukundapur Bypass, Pipili", ""),
    "34": ("Bhubaneswar Railway Station", "Sai Hospital, Balakati", ""),
    "35": ("Bhubaneswar Railway Station", "Udaynath College, Adaspur", "Jaydev Pitha"),
    "36": ("Bhubaneswar Railway Station", "Mundali, Cuttack", "Judicial Academy"),
    "37": ("Baramunda ISBT", "Naraj Marthapur Railway Station", "Trisulia"),
    "38": ("Bhubaneswar Railway Station", "Taraboi", "IIT"),
    "39": ("Bhubaneswar Railway Station", "AIIMS", "Bhimatangi"),
    "40": ("Baramunda ISBT", "SBI Colony, Kesora", "Badagada BRIT Colony"),
    "41": ("Baramunda ISBT", "Tangi", "Niali, Link Road, Badambadi"),
    "42": ("Baramunda ISBT", "Nandankanan", "Chandaka"),
    "50": ("Bhubaneswar Railway Station", "Puri Bus Stand", ""),
    "51": ("Baramunda ISBT", "Puri Bus Stand", "Rasulgarh Square"),
    "52": ("Puri Bus Stand", "Light House", ""),
    "53": ("Malatipatapur Bus Stand", "Shree Mandira", "Puri Bus Stand"),
    "54": ("Biju Patnaik Park, Cuttack", "Puri Bus Stand", "Puri Bypass"),
    "70": ("Bhubaneswar Railway Station", "Konark", ""),
    "71": ("Baramunda ISBT", "Konark", "Rasulgarh Square"),
    "80": ("Biju Patnaik Park, Cuttack", "Agrahat, Charbatia", "Choudhwar"),
    "81": ("Barabati Stadium", "Jagannath Temple, Salepur", "Jagatpur"),
    "82": ("Bhubaneswar Railway Station", "SCB Medical, Settlement Office", "NH"),
    "83": ("Dhabaleswar", "Kandarpur", "42 Mouja"),
}


def route_score(relation):
    """Prefer one complete directional relation and avoid an older roundtrip duplicate."""
    tags = relation.get("tags", {})
    score = sum(len(member.get("geometry", [])) for member in relation.get("members", []))
    if tags.get("roundtrip") == "yes":
        score -= 100_000
    return score


def compact_line(member):
    points = member.get("geometry", [])
    return [[round(point["lat"], 6), round(point["lon"], 6)] for point in points]


def main():
    if len(sys.argv) != 3:
        raise SystemExit("usage: build_routes.py OVERPASS_JSON OUTPUT_JS")

    source = json.loads(Path(sys.argv[1]).read_text())
    by_ref = {}
    for relation in source["elements"]:
        ref = relation.get("tags", {}).get("ref")
        if ref in PDF_ROUTES and (ref not in by_ref or route_score(relation) > route_score(by_ref[ref])):
            by_ref[ref] = relation

    routes = []
    for ref, (start, end, via) in PDF_ROUTES.items():
        relation = by_ref.get(ref)
        lines = []
        relation_id = None
        if relation:
            relation_id = relation["id"]
            lines = [line for member in relation.get("members", []) if len(line := compact_line(member)) > 1]
        routes.append({
            "ref": ref,
            "start": start,
            "end": end,
            "via": via,
            "relationId": relation_id,
            "lines": lines,
        })

    out = "window.AMA_BUS_ROUTES=" + json.dumps(routes, separators=(",", ":"), ensure_ascii=True) + ";\n"
    Path(sys.argv[2]).parent.mkdir(parents=True, exist_ok=True)
    Path(sys.argv[2]).write_text(out)
    print(f"Wrote {len(routes)} routes ({sum(bool(route['lines']) for route in routes)} mapped) to {sys.argv[2]}")


if __name__ == "__main__":
    main()

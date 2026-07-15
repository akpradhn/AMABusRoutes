# Ama Bus routes on OpenStreetMap

Interactive visualization and point-to-point planner for the 46 routes listed in the supplied 2024 CRUT capital-region network PDF. Forty-three routes use published OpenStreetMap route-relation geometry; 29E, 41 and 42 remain listed but are explicitly marked as unavailable in OSM.

The planner provides auto-matching searchable station fields, with map-click placement as a fallback. It ranks nearby direct routes and falls back to one-transfer suggestions when two mapped routes pass within 450 metres of each other. Walking distances are proximity estimates to the route lines, not verified boarding-stop or timetable information.

## Run locally

```bash
python3 -m http.server 8080
```

Open <http://localhost:8080>.

## Deploy to Vercel

The site is ready for Vercel's no-build static deployment. When importing the current parent repository, set **Root Directory** to `AMABusRoutes`, choose **Framework Preset: Other**, and leave the build, output and install commands empty.

The included `vercel.json` provides clean page URLs and baseline security headers. See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for dashboard settings, CLI commands and production checks.

## AdSense setup

The site ships with AdSense disabled so it never sends ad requests with a fake publisher ID. When a real AdSense account is available, configure it with:

```bash
python3 scripts/configure_adsense.py ca-pub-0000000000000000
```

Pass an optional responsive manual ad-slot ID as the second argument. Without a slot ID, the AdSense loader still supports Auto ads and site verification but keeps the reserved manual placement hidden.

Before requesting review:

1. Publish the complete site on a domain you control.
2. Run the configuration command with the real publisher ID and deploy the generated `ads.txt`.
3. Enable Google’s CMP or another Google-certified CMP in AdSense Privacy & messaging for applicable regions.
4. Confirm that `/ads.txt`, the privacy page, navigation, map and original guide content are publicly reachable.
5. Add the live domain in AdSense and request review.

See [ADSENSE_SETUP.md](ADSENSE_SETUP.md) for the launch checklist.

## Data notes

- Route names and endpoints are transcribed from the supplied CRUT PDF.
- Road paths are derived from OpenStreetMap CRUT bus relations queried on 14 July 2026.
- The map is a network visualization, not a live vehicle tracker or timetable.
- OpenStreetMap data is © OpenStreetMap contributors and available under the ODbL.

To rebuild `data/routes.js` from a fresh Overpass `out geom` JSON response:

```bash
python3 scripts/build_routes.py overpass-crut-geometry.json data/routes.js
```

Searchable station data can be rebuilt from named OSM stops and route terminals:

```bash
python3 scripts/build_stations.py osm-stops.json overpass-crut-geometry.json data/stations.js
```

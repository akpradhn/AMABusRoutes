(() => {
  const routes = window.AMA_BUS_ROUTES || [];
  const stations = window.AMA_BUS_STATIONS || [];
  const mappedRoutes = routes.filter((route) => route.lines.length);
  const map = L.map("map", { zoomControl: false });
  L.control.zoom({ position: "bottomright" }).addTo(map);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
  }).addTo(map);

  const networkGroup = L.featureGroup().addTo(map);
  const tripGroup = L.featureGroup().addTo(map);
  const routeLayers = new Map();
  const defaultStyle = { color: "#2577b9", weight: 2.4, opacity: 0.38, lineCap: "round", lineJoin: "round" };
  const fadedStyle = { color: "#6f879b", weight: 1.7, opacity: 0.14 };
  const selectedStyles = [
    { color: "#e3522c", weight: 5.5, opacity: 0.96, lineCap: "round", lineJoin: "round" },
    { color: "#7c4cad", weight: 5.5, opacity: 0.96, lineCap: "round", lineJoin: "round" }
  ];

  mappedRoutes.forEach((route) => {
    route.plannerPoints = route.lines.flatMap((line) => line.filter((_, index) => index % 8 === 0 || index === line.length - 1));
    const layer = L.polyline(route.lines, defaultStyle)
      .bindTooltip(`Route ${route.ref}`, { sticky: true, direction: "top" })
      .on("click", () => {
        if (!plannerMode) selectRoute(route.ref);
      });
    layer.addTo(networkGroup);
    routeLayers.set(route.ref, layer);
  });

  const networkBounds = networkGroup.getBounds();
  map.fitBounds(networkBounds, { padding: [24, 24] });

  const select = document.getElementById("route-select");
  const detail = document.getElementById("route-detail");
  const plannerView = document.getElementById("planner-view");
  const exploreView = document.getElementById("explore-view");
  const planButton = document.getElementById("mode-plan");
  const exploreButton = document.getElementById("mode-explore");
  const startButton = document.getElementById("set-start");
  const endButton = document.getElementById("set-end");
  const tripSummary = document.getElementById("trip-summary");
  const plannerResults = document.getElementById("planner-results");
  const stationList = document.getElementById("station-list");
  const startStationInput = document.getElementById("start-station");
  const endStationInput = document.getElementById("end-station");

  let plannerMode = true;
  let pendingPoint = "start";
  let startPoint = null;
  let endPoint = null;
  let startMarker = null;
  let endMarker = null;
  let startStationName = null;
  let endStationName = null;
  let journeyOptions = [];

  stations.forEach((station) => {
    const option = document.createElement("option");
    option.value = station.display;
    stationList.appendChild(option);
  });

  routes.forEach((route) => {
    const option = document.createElement("option");
    option.value = route.ref;
    option.textContent = `Route ${route.ref} · ${route.start} → ${route.end}${route.lines.length ? "" : " · not mapped"}`;
    select.appendChild(option);
  });

  function haversine(a, b) {
    const toRad = (value) => value * Math.PI / 180;
    const dLat = toRad(b[0] - a[0]);
    const dLon = toRad(b[1] - a[1]);
    const lat1 = toRad(a[0]);
    const lat2 = toRad(b[0]);
    const value = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
    return 6371 * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
  }

  function normalize(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  }

  function exactStation(value) {
    const query = normalize(value);
    const displayMatch = stations.find((station) => normalize(station.display) === query);
    if (displayMatch) return displayMatch;
    const nameMatches = stations.filter((station) => normalize(station.name) === query);
    return nameMatches.length === 1 ? nameMatches[0] : null;
  }

  function autoMatchStation(value) {
    const query = normalize(value);
    if (!query) return null;
    const exact = exactStation(value);
    if (exact) return exact;
    const matches = stations.filter((station) => normalize(station.name).includes(query) || normalize(station.display).includes(query));
    return matches.length === 1 ? matches[0] : null;
  }

  function nearestPoint(route, point) {
    let best = { distance: Infinity, point: null };
    route.plannerPoints.forEach((candidate) => {
      const distance = haversine(point, candidate);
      if (distance < best.distance) best = { distance, point: candidate };
    });
    return best;
  }

  function closestTransfer(routeA, routeB) {
    let best = { distance: Infinity, pointA: null, pointB: null };
    routeA.plannerPoints.forEach((pointA) => {
      routeB.plannerPoints.forEach((pointB) => {
        const distance = haversine(pointA, pointB);
        if (distance < best.distance) best = { distance, pointA, pointB };
      });
    });
    return best;
  }

  function formatWalk(distance) {
    if (distance < 0.1) return "under 100 m";
    if (distance < 1) return `${Math.round(distance * 1000 / 50) * 50} m`;
    return `${distance.toFixed(1)} km`;
  }

  function resetNetwork() {
    routeLayers.forEach((layer, ref) => {
      layer.setStyle(defaultStyle).bringToBack();
      layer.unbindTooltip().bindTooltip(`Route ${ref}`, { sticky: true, direction: "top" });
    });
  }

  function highlightJourney(option) {
    resetNetwork();
    routeLayers.forEach((layer) => layer.setStyle(fadedStyle));
    option.routes.forEach((route, index) => routeLayers.get(route.ref)?.setStyle(selectedStyles[index]).bringToFront());
    tripGroup.clearLayers();
    if (startMarker) startMarker.addTo(tripGroup);
    if (endMarker) endMarker.addTo(tripGroup);

    const walkingStyle = { color: "#10253d", weight: 2, opacity: 0.7, dashArray: "5 6" };
    L.polyline([startPoint, option.startNearest.point], walkingStyle).addTo(tripGroup);
    L.polyline([endPoint, option.endNearest.point], walkingStyle).addTo(tripGroup);
    if (option.transfer) L.polyline([option.transfer.pointA, option.transfer.pointB], walkingStyle).addTo(tripGroup);
    map.fitBounds(L.latLngBounds([startPoint, endPoint]), { padding: [70, 70], maxZoom: 12 });

    document.querySelectorAll(".journey-option").forEach((button, index) => {
      button.setAttribute("aria-pressed", String(journeyOptions[index] === option));
    });
  }

  function renderPlannerResults() {
    plannerResults.replaceChildren();
    if (!journeyOptions.length) {
      const message = document.createElement("p");
      message.className = "planner-empty";
      message.textContent = "No mapped route comes close enough to both points. Try placing the pins nearer a bus corridor.";
      plannerResults.appendChild(message);
      tripSummary.innerHTML = "No close route combination found for these points.";
      resetNetwork();
      return;
    }

    const heading = document.createElement("h2");
    heading.textContent = journeyOptions[0].transfer ? "Best one-transfer options" : "Best direct options";
    plannerResults.appendChild(heading);
    tripSummary.innerHTML = `<strong>${journeyOptions.length} option${journeyOptions.length === 1 ? "" : "s"} found.</strong> Select one to compare.`;

    journeyOptions.slice(0, 3).forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "journey-option";
      button.setAttribute("aria-pressed", String(index === 0));
      const routeLabel = option.routes.map((route) => `Route ${route.ref}`).join(" → ");
      const transferLabel = option.transfer ? ` · transfer walk ${formatWalk(option.transfer.distance)}` : " · direct";
      button.innerHTML = `<strong>${routeLabel}</strong><small>${formatWalk(option.startNearest.distance)} walk to board · ${formatWalk(option.endNearest.distance)} walk after alighting${transferLabel}</small>`;
      button.addEventListener("click", () => highlightJourney(option));
      plannerResults.appendChild(button);
    });
    highlightJourney(journeyOptions[0]);
  }

  function planTrip() {
    if (!startPoint || !endPoint) return;
    const proximity = mappedRoutes.map((route) => ({
      route,
      startNearest: nearestPoint(route, startPoint),
      endNearest: nearestPoint(route, endPoint)
    }));

    const direct = proximity
      .filter((item) => item.startNearest.distance <= 1.2 && item.endNearest.distance <= 1.2)
      .map((item) => ({ routes: [item.route], startNearest: item.startNearest, endNearest: item.endNearest, transfer: null, score: item.startNearest.distance + item.endNearest.distance }))
      .sort((a, b) => a.score - b.score);

    if (direct.length) {
      journeyOptions = direct.slice(0, 3);
    } else {
      const origins = proximity.filter((item) => item.startNearest.distance <= 1.4).sort((a, b) => a.startNearest.distance - b.startNearest.distance).slice(0, 10);
      const destinations = proximity.filter((item) => item.endNearest.distance <= 1.4).sort((a, b) => a.endNearest.distance - b.endNearest.distance).slice(0, 10);
      const transfers = [];
      origins.forEach((origin) => destinations.forEach((destination) => {
        if (origin.route.ref === destination.route.ref) return;
        const transfer = closestTransfer(origin.route, destination.route);
        if (transfer.distance <= 0.45) {
          transfers.push({
            routes: [origin.route, destination.route],
            startNearest: origin.startNearest,
            endNearest: destination.endNearest,
            transfer,
            score: origin.startNearest.distance + destination.endNearest.distance + transfer.distance * 1.5
          });
        }
      }));
      journeyOptions = transfers.sort((a, b) => a.score - b.score).slice(0, 3);
    }
    renderPlannerResults();
  }

  function setPendingPoint(type) {
    pendingPoint = type;
    startButton.setAttribute("aria-pressed", String(type === "start"));
    endButton.setAttribute("aria-pressed", String(type === "end"));
    map.getContainer().classList.toggle("planning-start", type === "start");
    map.getContainer().classList.toggle("planning-end", type === "end");
    tripSummary.innerHTML = type === "start" ? "Click the map to place your <strong>starting point</strong>." : "Click the map to place your <strong>destination</strong>.";
  }

  function placePoint(type, latlng, stationName = null) {
    const point = [latlng.lat, latlng.lng];
    const isStart = type === "start";
    if (isStart) {
      startPoint = point;
      startStationName = stationName;
      if (!stationName) startStationInput.value = "";
      if (startMarker) tripGroup.removeLayer(startMarker);
      startMarker = L.circleMarker(point, { radius: 8, color: "#fff", weight: 3, fillColor: "#1f8a5b", fillOpacity: 1 }).bindTooltip(stationName || "Start", { permanent: true, direction: "top", className: "route-label" }).addTo(tripGroup);
      if (!endPoint) {
        pendingPoint = null;
        startButton.setAttribute("aria-pressed", "false");
        map.getContainer().classList.remove("planning-start");
        tripSummary.innerHTML = "Now choose your <strong>destination station</strong>.";
        endStationInput.focus();
      }
    } else {
      endPoint = point;
      endStationName = stationName;
      if (!stationName) endStationInput.value = "";
      if (endMarker) tripGroup.removeLayer(endMarker);
      endMarker = L.circleMarker(point, { radius: 8, color: "#fff", weight: 3, fillColor: "#e3522c", fillOpacity: 1 }).bindTooltip(stationName || "Destination", { permanent: true, direction: "top", className: "route-label" }).addTo(tripGroup);
    }

    if (startPoint && endPoint) {
      pendingPoint = null;
      startButton.setAttribute("aria-pressed", "false");
      endButton.setAttribute("aria-pressed", "false");
      map.getContainer().classList.remove("planning-start", "planning-end");
      tripSummary.innerHTML = "Comparing mapped routes near both points…";
      planTrip();
    } else if (!startPoint) {
      tripSummary.innerHTML = "Now choose your <strong>starting station</strong>.";
      startStationInput.focus();
    }
  }

  function chooseStation(type, station) {
    const input = type === "start" ? startStationInput : endStationInput;
    input.value = station.display;
    placePoint(type, L.latLng(station.lat, station.lon), station.name);
    if (!(startPoint && endPoint)) map.setView([station.lat, station.lon], Math.max(map.getZoom(), 12));
  }

  function handleStationInput(type, input, allowAutoMatch) {
    const station = allowAutoMatch ? autoMatchStation(input.value) : exactStation(input.value);
    if (station) {
      chooseStation(type, station);
      return;
    }
    if (allowAutoMatch && input.value.trim()) {
      tripSummary.innerHTML = "Keep typing or select a station from the matching dropdown.";
    }
  }

  function clearTrip() {
    startPoint = null;
    endPoint = null;
    startMarker = null;
    endMarker = null;
    startStationName = null;
    endStationName = null;
    startStationInput.value = "";
    endStationInput.value = "";
    journeyOptions = [];
    tripGroup.clearLayers();
    plannerResults.replaceChildren();
    resetNetwork();
    pendingPoint = null;
    startButton.setAttribute("aria-pressed", "false");
    endButton.setAttribute("aria-pressed", "false");
    map.getContainer().classList.remove("planning-start", "planning-end");
    tripSummary.innerHTML = "Choose your starting station.";
    map.fitBounds(networkBounds, { padding: [24, 24] });
  }

  function setMode(mode) {
    plannerMode = mode === "plan";
    plannerView.hidden = !plannerMode;
    exploreView.hidden = plannerMode;
    planButton.setAttribute("aria-pressed", String(plannerMode));
    exploreButton.setAttribute("aria-pressed", String(!plannerMode));
    if (plannerMode) {
      if (pendingPoint) setPendingPoint(pendingPoint);
      if (journeyOptions.length) highlightJourney(journeyOptions[0]);
    } else {
      map.getContainer().classList.remove("planning-start", "planning-end");
      tripGroup.clearLayers();
      resetNetwork();
    }
  }

  function selectRoute(ref) {
    const route = routes.find((item) => item.ref === ref);
    if (!route) return;
    select.value = ref;
    routeLayers.forEach((layer) => layer.setStyle(fadedStyle));
    const layer = routeLayers.get(ref);
    if (layer) {
      layer.setStyle(selectedStyles[0]).bringToFront();
      map.fitBounds(layer.getBounds(), { padding: [48, 48], maxZoom: 13 });
    }
    const via = route.via ? `<p class="via">Via ${route.via}</p>` : "";
    const source = route.relationId
      ? `<p><a href="https://www.openstreetmap.org/relation/${route.relationId}" target="_blank" rel="noreferrer">View OSM relation ↗</a></p>`
      : '<p class="missing">No route geometry is published in OSM yet.</p>';
    detail.innerHTML = `<p class="route-number">Route ${route.ref}</p><p>${route.start} → ${route.end}</p>${via}${source}`;
  }

  map.on("click", (event) => {
    if (plannerMode && pendingPoint) placePoint(pendingPoint, event.latlng);
  });
  startButton.addEventListener("click", () => setPendingPoint("start"));
  endButton.addEventListener("click", () => setPendingPoint("end"));
  startStationInput.addEventListener("input", () => handleStationInput("start", startStationInput, true));
  endStationInput.addEventListener("input", () => handleStationInput("end", endStationInput, true));
  startStationInput.addEventListener("change", () => handleStationInput("start", startStationInput, true));
  endStationInput.addEventListener("change", () => handleStationInput("end", endStationInput, true));
  document.getElementById("clear-trip").addEventListener("click", clearTrip);
  planButton.addEventListener("click", () => setMode("plan"));
  exploreButton.addEventListener("click", () => setMode("explore"));

  select.addEventListener("change", () => {
    if (select.value === "all") {
      resetNetwork();
      map.fitBounds(networkBounds, { padding: [24, 24] });
      detail.innerHTML = '<p class="route-number">Network overview</p><p>Choose a route to isolate it and inspect its terminals.</p>';
    } else {
      selectRoute(select.value);
    }
  });

  document.getElementById("fit-map").addEventListener("click", () => {
    select.value = "all";
    resetNetwork();
    map.fitBounds(networkBounds, { padding: [24, 24] });
    detail.innerHTML = '<p class="route-number">Network overview</p><p>Choose a route to isolate it and inspect its terminals.</p>';
  });

  pendingPoint = null;
  startButton.setAttribute("aria-pressed", "false");
  map.getContainer().classList.remove("planning-start", "planning-end");
})();

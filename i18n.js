(() => {
  const STORAGE_KEY = "amaBusLanguage";
  const supported = new Set(["en", "or"]);
  const strings = {
    en: {
      "common.planner": "Route planner",
      "common.plannerShort": "Planner",
      "common.about": "About",
      "common.privacy": "Privacy",
      "common.terms": "Terms",
      "common.language": "Language",
      "common.english": "English",
      "common.odia": "ଓଡ଼ିଆ",
      "common.notOfficial": "Independent route-planning aid. Not an official CRUT service. OpenStreetMap data © contributors.",
      "home.title": "Ama Bus Route Planner | Bhubaneswar, Cuttack and Puri",
      "home.eyebrow": "CRUT CAPITAL REGION · 2024 NETWORK",
      "home.heading": "Ama Bus on OpenStreetMap",
      "home.subtitle": "Choose two points to find direct or one-transfer Ama Bus options across the capital region.",
      "home.mappedRoutes": "mapped routes",
      "home.planTrip": "Plan a trip",
      "home.explore": "Explore routes",
      "home.prompt": "Type a station name, then select a match from the dropdown.",
      "home.from": "Pickup station",
      "home.to": "Drop station",
      "home.stationPlaceholder": "Type a station name",
      "home.findBus": "Find bus",
      "home.pickStart": "Pick start on map",
      "home.pickDestination": "Pick destination on map",
      "home.chooseStart": "Choose your starting station.",
      "home.clear": "Clear trip",
      "home.route": "Route",
      "home.allRoutes": "All mapped routes",
      "home.networkOverview": "Network overview",
      "home.chooseRoute": "Choose a route to isolate it and inspect its terminals.",
      "home.fitNetwork": "Fit network",
      "home.network": "Network",
      "home.recommended": "Recommended",
      "home.advertisement": "Advertisement",
      "home.contextEyebrow": "PLAN WITH CONTEXT",
      "home.guideTitle": "How to use the Ama Bus route planner",
      "home.guideIntro": "Search for a starting station and destination, then compare nearby direct services before considering a one-transfer journey. The map highlights the recommended route and shows estimated walking gaps between your selected station and the mapped bus corridor.",
      "home.coverageTitle": "What the map covers",
      "home.coverageText": "The planner combines 46 routes from the supplied 2024 capital-region network map with 43 route geometries currently published in OpenStreetMap. Search includes 86 named stations and route terminals across Bhubaneswar, Cuttack, Puri, Khordha, Jatani, Konark and nearby corridors.",
      "home.recommendTitle": "How recommendations work",
      "home.recommendText": "Direct routes are ranked by their distance from both selected stations. When no direct service is close enough, the planner checks for two routes whose mapped paths meet within a short walking distance. It does not use live timetables, fares or vehicle positions.",
      "home.travelTitle": "Before you travel",
      "home.travelText": "Use the result as a planning aid and confirm the boarding stop, operating direction and current service information before leaving. CRUT may change diversions, schedules and route coverage after the date represented by this map.",
      "home.footer": "Independent route-planning aid. Not an official CRUT service. Roads and searchable stations © OpenStreetMap contributors.",
      "app.route": "Route {ref}",
      "app.notMapped": "not mapped",
      "app.under100": "under 100 m",
      "app.metres": "{distance} m",
      "app.kilometres": "{distance} km",
      "app.noRoute": "No mapped route comes close enough to both points. Try placing the pins nearer a bus corridor.",
      "app.noCombination": "No close route combination found for these points.",
      "app.bestTransfer": "Best one-transfer options",
      "app.bestDirect": "Best direct options",
      "app.optionsFound": "{count} option{plural} found.",
      "app.selectCompare": "Select one to compare.",
      "app.transferWalk": "transfer walk {distance}",
      "app.direct": "direct",
      "app.walkDetails": "{start} walk to board · {end} walk after alighting · {type}",
      "app.clickStart": "Click the map to place your <strong>starting point</strong>.",
      "app.clickDestination": "Click the map to place your <strong>destination</strong>.",
      "app.start": "Start",
      "app.destination": "Destination",
      "app.chooseDestination": "Now choose your <strong>destination station</strong>.",
      "app.comparing": "Comparing mapped routes near both points…",
      "app.chooseStartHtml": "Now choose your <strong>starting station</strong>.",
      "app.keepTyping": "Keep typing or select a station from the matching dropdown.",
      "app.selectPickup": "Select a pickup station from the matching dropdown.",
      "app.selectDrop": "Select a drop station from the matching dropdown.",
      "app.readyToFind": "Pickup and drop selected. Choose Find bus.",
      "app.via": "Via {via}",
      "app.viewOsm": "View OSM relation ↗",
      "app.noGeometry": "No route geometry is published in OSM yet.",
      "app.preparingAnimation": "Preparing animated route guide…",
      "app.busTravelling": "Bus travelling to the next halt…",
      "app.busAt": "Halt: {stop}",
      "app.animationReduced": "Halt: {stop} · animation paused by motion preference",
      "about.title": "About the Ama Bus Route Planner",
      "about.eyebrow": "ABOUT THIS PROJECT",
      "about.heading": "A clearer view of the Ama Bus network",
      "about.subtitle": "An independent geographic companion to the published capital-region route map.",
      "about.whyTitle": "Why this planner exists",
      "about.why1": "The official network diagram is useful for understanding connections, but it is schematic rather than geographic. This project places available Ama Bus routes on real roads so riders can compare corridors, understand the scale of a journey and identify likely transfer areas.",
      "about.why2": "The site is designed as a planning aid for residents and visitors travelling across Bhubaneswar, Cuttack, Puri and neighbouring parts of Odisha’s capital region. It does not sell tickets, track vehicles or represent the operator.",
      "about.dataTitle": "Data and methodology",
      "about.data1": "The route list and terminal descriptions come from the supplied 2024 CRUT capital-region network PDF. Road geometry comes from route relations published by OpenStreetMap contributors. Searchable stations combine named OpenStreetMap bus stops with mapped route terminals.",
      "about.data2": "Forty-three of the 46 routes listed in the PDF have usable OpenStreetMap geometry in the current dataset. Routes 29E, 41 and 42 remain visible in the route explorer but are marked as unmapped instead of being drawn from guessed coordinates.",
      "about.data3": "Recommendations are calculated from geographic proximity. A direct option must pass near both selected stations. Transfer suggestions look for two mapped corridors that approach one another closely enough to indicate a possible walking connection.",
      "about.limitTitle": "Important limitations",
      "about.limit1": "The planner does not include live arrival times, service frequency, fares or temporary diversions.",
      "about.limit2": "A mapped line near a station does not guarantee that every bus stops there in both directions.",
      "about.limit3": "Walking estimates measure proximity to a route line, not a turn-by-turn pedestrian path.",
      "about.limit4": "OpenStreetMap and operator information can change after the dataset’s 14 July 2026 verification date.",
      "about.confirm": "Always confirm current service information and the correct boarding direction before travel.",
      "privacy.title": "Privacy Policy | Ama Bus Route Planner",
      "privacy.eyebrow": "PRIVACY POLICY",
      "privacy.heading": "How this planner handles data",
      "privacy.effective": "Effective 14 July 2026.",
      "privacy.selectionTitle": "Planner selections",
      "privacy.selection": "This website does not require an account. Station searches, selected map points and calculated route options are processed in your browser for the current page visit. The site does not intentionally send those selections to an application database or retain a journey history.",
      "privacy.mapTitle": "Map and hosting requests",
      "privacy.mapHtml": "The map requests tiles from OpenStreetMap’s tile service. As with ordinary web requests, the service and the site’s hosting provider may receive technical information such as your IP address, browser details, requested URL and request time. Review the <a href=\"https://osmfoundation.org/wiki/Privacy_Policy\" rel=\"noreferrer\">OpenStreetMap Foundation privacy policy</a> for its practices.",
      "privacy.adsTitle": "Advertising and cookies",
      "privacy.ads1": "When advertising is enabled, this site may use Google AdSense. Third-party vendors, including Google, may place or read cookies in your browser, or use web beacons, IP addresses and other identifiers to serve and measure advertising. Google’s advertising cookies may allow Google and its partners to serve ads based on visits to this site and other sites.",
      "privacy.ads2Html": "You can learn <a href=\"https://policies.google.com/technologies/partner-sites\" rel=\"noreferrer\">how Google uses information from partner sites</a>, manage personalized advertising in <a href=\"https://adssettings.google.com/\" rel=\"noreferrer\">Google Ads Settings</a>, and review broader industry opt-out choices at <a href=\"https://www.aboutads.info/choices/\" rel=\"noreferrer\">AboutAds</a>.",
      "privacy.ads3": "Other certified advertising vendors may also serve ads when enabled. Their identities and available choices are presented through the consent message or the publisher’s AdSense controls.",
      "privacy.consentTitle": "Consent and privacy choices",
      "privacy.consent": "For visitors in regions where consent or opt-out notices are required, the site owner must configure a Google-certified consent management platform before serving personalized advertising. The message may allow you to accept, reject or manage advertising choices. Your selection may be stored so the message does not need to appear on every visit.",
      "privacy.updateTitle": "Policy updates",
      "privacy.update": "This policy may be updated when site features, hosting or advertising services change. The effective date at the top of this page will be revised when material changes are published.",
      "privacy.footer": "Questions about route accuracy are separate from privacy requests and should be checked against current operator information.",
      "terms.title": "Terms of Use | Ama Bus Route Planner",
      "terms.eyebrow": "TERMS OF USE",
      "terms.heading": "Use the planner as a travel aid",
      "terms.independentTitle": "Independent information",
      "terms.independent": "This website is an independent route-planning aid and is not operated, endorsed or maintained by CRUT or Ama Bus. Names and route references are used only to help users understand public transport coverage.",
      "terms.guaranteeTitle": "No real-time service guarantee",
      "terms.guarantee1": "Results are based on a published network map and community-maintained geographic data. They may be incomplete, outdated or inaccurate. The planner does not guarantee that a route is operating, that a station is served, that a transfer is permitted or that a journey can be completed within any particular time.",
      "terms.guarantee2": "Users are responsible for checking current timetables, directions, accessibility, fares, safety conditions and operator announcements before relying on a suggested journey.",
      "terms.thirdPartyTitle": "Map and third-party material",
      "terms.thirdParty": "OpenStreetMap data is made available under its applicable open-data terms and remains attributed to OpenStreetMap contributors. Links to external services are provided for convenience; those services have their own terms and privacy practices.",
      "terms.useTitle": "Acceptable use",
      "terms.use": "You may use the planner for personal travel research. Do not attempt to disrupt the site, overload map services, misrepresent route results as official instructions, or use automated traffic to create invalid advertising impressions or clicks.",
      "terms.changeTitle": "Changes and availability",
      "terms.change": "Features, route data and these terms may change as the project evolves. The site may be unavailable temporarily and no continuous service level is promised.",
      "terms.footer": "Confirm current service information before travel.",
      "error.title": "Page not found | Ama Bus Route Planner",
      "error.eyebrow": "404 · PAGE NOT FOUND",
      "error.heading": "That stop is not on this route",
      "error.subtitle": "The page may have moved, or the address may be incorrect.",
      "error.returnTitle": "Return to the network map",
      "error.returnText": "Open the route planner to search stations, compare direct services and explore mapped Ama Bus routes.",
      "error.open": "Open route planner"
    },
    or: {
      "common.planner": "ରୁଟ୍ ପ୍ଲାନର୍",
      "common.plannerShort": "ପ୍ଲାନର୍",
      "common.about": "ଆମ ବିଷୟରେ",
      "common.privacy": "ଗୋପନୀୟତା",
      "common.terms": "ବ୍ୟବହାର ସର୍ତ୍ତ",
      "common.language": "ଭାଷା",
      "common.english": "English",
      "common.odia": "ଓଡ଼ିଆ",
      "common.notOfficial": "ସ୍ୱାଧୀନ ରୁଟ୍ ପ୍ଲାନିଂ ସହାୟିକା। ଏହା CRUTର ଅଧିକୃତ ସେବା ନୁହେଁ। OpenStreetMap ତଥ୍ୟ © ଅବଦାନକାରୀମାନେ।",
      "home.title": "ଆମ ବସ୍ ରୁଟ୍ ପ୍ଲାନର୍ | ଭୁବନେଶ୍ୱର, କଟକ ଓ ପୁରୀ",
      "home.eyebrow": "CRUT ରାଜଧାନୀ ଅଞ୍ଚଳ · ୨୦୨୪ ନେଟୱର୍କ",
      "home.heading": "OpenStreetMapରେ ଆମ ବସ୍",
      "home.subtitle": "ରାଜଧାନୀ ଅଞ୍ଚଳରେ ସିଧାସଳଖ କିମ୍ବା ଗୋଟିଏ ବଦଳ ସହିତ ଆମ ବସ୍ ବିକଳ୍ପ ପାଇବାକୁ ଦୁଇଟି ସ୍ଥାନ ବାଛନ୍ତୁ।",
      "home.mappedRoutes": "ମ୍ୟାପ୍ ହୋଇଥିବା ରୁଟ୍",
      "home.planTrip": "ଯାତ୍ରା ଯୋଜନା",
      "home.explore": "ରୁଟ୍ ଦେଖନ୍ତୁ",
      "home.prompt": "ଷ୍ଟେସନ୍ ନାମ ଟାଇପ୍ କରି ତାଲିକାରୁ ମେଳ ଥିବା ଷ୍ଟେସନ୍ ବାଛନ୍ତୁ।",
      "home.from": "ପିକଅପ୍ ଷ୍ଟେସନ୍",
      "home.to": "ଡ୍ରପ୍ ଷ୍ଟେସନ୍",
      "home.stationPlaceholder": "ଷ୍ଟେସନ୍ ନାମ ଟାଇପ୍ କରନ୍ତୁ",
      "home.findBus": "ବସ୍ ଖୋଜନ୍ତୁ",
      "home.pickStart": "ମ୍ୟାପ୍‌ରେ ଆରମ୍ଭ ବାଛନ୍ତୁ",
      "home.pickDestination": "ମ୍ୟାପ୍‌ରେ ଗନ୍ତବ୍ୟ ବାଛନ୍ତୁ",
      "home.chooseStart": "ଆପଣଙ୍କ ଆରମ୍ଭ ଷ୍ଟେସନ୍ ବାଛନ୍ତୁ।",
      "home.clear": "ଯାତ୍ରା ହଟାନ୍ତୁ",
      "home.route": "ରୁଟ୍",
      "home.allRoutes": "ସମସ୍ତ ମ୍ୟାପ୍ ହୋଇଥିବା ରୁଟ୍",
      "home.networkOverview": "ନେଟୱର୍କ ସାରାଂଶ",
      "home.chooseRoute": "ଗୋଟିଏ ରୁଟ୍‌କୁ ଅଲଗା କରି ତାହାର ଟର୍ମିନାଲ୍ ଦେଖିବାକୁ ରୁଟ୍ ବାଛନ୍ତୁ।",
      "home.fitNetwork": "ସମ୍ପୂର୍ଣ୍ଣ ନେଟୱର୍କ ଦେଖନ୍ତୁ",
      "home.network": "ନେଟୱର୍କ",
      "home.recommended": "ସୁପାରିଶ",
      "home.advertisement": "ବିଜ୍ଞାପନ",
      "home.contextEyebrow": "ବୁଝି ବିଚାରି ଯୋଜନା କରନ୍ତୁ",
      "home.guideTitle": "ଆମ ବସ୍ ରୁଟ୍ ପ୍ଲାନର୍ କିପରି ବ୍ୟବହାର କରିବେ",
      "home.guideIntro": "ଆରମ୍ଭ ଷ୍ଟେସନ୍ ଓ ଗନ୍ତବ୍ୟ ଖୋଜନ୍ତୁ, ତାପରେ ଗୋଟିଏ ବଦଳ ଥିବା ଯାତ୍ରା ପୂର୍ବରୁ ନିକଟସ୍ଥ ସିଧାସଳଖ ସେବାଗୁଡ଼ିକ ତୁଳନା କରନ୍ତୁ। ମ୍ୟାପ୍ ସୁପାରିଶ ହୋଇଥିବା ରୁଟ୍ ଦେଖାଏ ଏବଂ ଷ୍ଟେସନ୍‌ରୁ ବସ୍ ରାସ୍ତା ପର୍ଯ୍ୟନ୍ତ ଆନୁମାନିକ ଚାଲିବା ଦୂରତା ଦର୍ଶାଏ।",
      "home.coverageTitle": "ମ୍ୟାପ୍‌ରେ କ’ଣ ଅଛି",
      "home.coverageText": "ଏହି ପ୍ଲାନର୍ ୨୦୨୪ ରାଜଧାନୀ ଅଞ୍ଚଳ ନେଟୱର୍କ ମ୍ୟାପ୍‌ର ୪୬ଟି ରୁଟ୍‌କୁ OpenStreetMapରେ ବର୍ତ୍ତମାନ ଉପଲବ୍ଧ ୪୩ଟି ରୁଟ୍ ଜ୍ୟାମିତି ସହ ଯୋଡ଼ିଛି। ଭୁବନେଶ୍ୱର, କଟକ, ପୁରୀ, ଖୋର୍ଦ୍ଧା, ଜଟଣୀ, କୋଣାର୍କ ଓ ନିକଟସ୍ଥ ଅଞ୍ଚଳର ୮୬ଟି ଷ୍ଟେସନ୍ ଓ ରୁଟ୍ ଟର୍ମିନାଲ୍ ଖୋଜିହେବ।",
      "home.recommendTitle": "ସୁପାରିଶ କିପରି କାମ କରେ",
      "home.recommendText": "ଦୁଇଟି ବାଛିଥିବା ଷ୍ଟେସନ୍‌ରୁ ଦୂରତା ଆଧାରରେ ସିଧାସଳଖ ରୁଟ୍‌ଗୁଡ଼ିକୁ କ୍ରମ ଦିଆଯାଏ। ନିକଟରେ ସିଧା ସେବା ନଥିଲେ, ପ୍ଲାନର୍ ଅଳ୍ପ ଚାଲିବା ଦୂରତାରେ ମିଶୁଥିବା ଦୁଇଟି ରୁଟ୍ ଖୋଜେ। ଏଥିରେ ଲାଇଭ୍ ସମୟସାରଣୀ, ଭଡ଼ା କିମ୍ବା ଗାଡ଼ିର ସ୍ଥିତି ବ୍ୟବହାର ହୁଏ ନାହିଁ।",
      "home.travelTitle": "ଯାତ୍ରା ପୂର୍ବରୁ",
      "home.travelText": "ଫଳାଫଳକୁ ଯାତ୍ରା ଯୋଜନାର ସହାୟକ ଭାବେ ବ୍ୟବହାର କରନ୍ତୁ ଏବଂ ବାହାରିବା ପୂର୍ବରୁ ବୋର୍ଡିଂ ଷ୍ଟପ୍, ଯାତ୍ରା ଦିଗ ଓ ବର୍ତ୍ତମାନର ସେବା ସୂଚନା ଯାଞ୍ଚ କରନ୍ତୁ।",
      "home.footer": "ସ୍ୱାଧୀନ ରୁଟ୍ ପ୍ଲାନିଂ ସହାୟିକା। ଏହା CRUTର ଅଧିକୃତ ସେବା ନୁହେଁ। ରାସ୍ତା ଓ ଖୋଜିହେଉଥିବା ଷ୍ଟେସନ୍ © OpenStreetMap ଅବଦାନକାରୀମାନେ।",
      "app.route": "ରୁଟ୍ {ref}",
      "app.notMapped": "ମ୍ୟାପ୍ ହୋଇନାହିଁ",
      "app.under100": "୧୦୦ ମିଟରରୁ କମ୍",
      "app.metres": "{distance} ମିଟର",
      "app.kilometres": "{distance} କି.ମି.",
      "app.noRoute": "ଦୁଇଟି ସ୍ଥାନ ନିକଟକୁ ଆସୁଥିବା କୌଣସି ମ୍ୟାପ୍ ରୁଟ୍ ମିଳିଲା ନାହିଁ। ପିନ୍‌ଗୁଡ଼ିକୁ ବସ୍ ରାସ୍ତାର ଆହୁରି ନିକଟରେ ରଖନ୍ତୁ।",
      "app.noCombination": "ଏହି ସ୍ଥାନଗୁଡ଼ିକ ପାଇଁ ନିକଟ ରୁଟ୍ ମିଶ୍ରଣ ମିଳିଲା ନାହିଁ।",
      "app.bestTransfer": "ଶ୍ରେଷ୍ଠ ଗୋଟିଏ-ବଦଳ ବିକଳ୍ପ",
      "app.bestDirect": "ଶ୍ରେଷ୍ଠ ସିଧାସଳଖ ବିକଳ୍ପ",
      "app.optionsFound": "{count}ଟି ବିକଳ୍ପ ମିଳିଲା।",
      "app.selectCompare": "ତୁଳନା ପାଇଁ ଗୋଟିଏ ବାଛନ୍ତୁ।",
      "app.transferWalk": "ବଦଳ ପାଇଁ {distance} ଚାଲନ୍ତୁ",
      "app.direct": "ସିଧାସଳଖ",
      "app.walkDetails": "ବସ୍ ଧରିବାକୁ {start} ଚାଲନ୍ତୁ · ଓହ୍ଲାଇବା ପରେ {end} ଚାଲନ୍ତୁ · {type}",
      "app.clickStart": "ଆପଣଙ୍କ <strong>ଆରମ୍ଭ ସ୍ଥାନ</strong> ରଖିବାକୁ ମ୍ୟାପ୍‌ରେ କ୍ଲିକ୍ କରନ୍ତୁ।",
      "app.clickDestination": "ଆପଣଙ୍କ <strong>ଗନ୍ତବ୍ୟ</strong> ରଖିବାକୁ ମ୍ୟାପ୍‌ରେ କ୍ଲିକ୍ କରନ୍ତୁ।",
      "app.start": "ଆରମ୍ଭ",
      "app.destination": "ଗନ୍ତବ୍ୟ",
      "app.chooseDestination": "ଏବେ ଆପଣଙ୍କ <strong>ଗନ୍ତବ୍ୟ ଷ୍ଟେସନ୍</strong> ବାଛନ୍ତୁ।",
      "app.comparing": "ଦୁଇଟି ସ୍ଥାନ ନିକଟର ମ୍ୟାପ୍ ରୁଟ୍ ତୁଳନା କରାଯାଉଛି…",
      "app.chooseStartHtml": "ଏବେ ଆପଣଙ୍କ <strong>ଆରମ୍ଭ ଷ୍ଟେସନ୍</strong> ବାଛନ୍ତୁ।",
      "app.keepTyping": "ଟାଇପ୍ କରିଚାଲନ୍ତୁ କିମ୍ବା ତାଲିକାରୁ ଷ୍ଟେସନ୍ ବାଛନ୍ତୁ।",
      "app.selectPickup": "ମେଳ ଥିବା ତାଲିକାରୁ ପିକଅପ୍ ଷ୍ଟେସନ୍ ବାଛନ୍ତୁ।",
      "app.selectDrop": "ମେଳ ଥିବା ତାଲିକାରୁ ଡ୍ରପ୍ ଷ୍ଟେସନ୍ ବାଛନ୍ତୁ।",
      "app.readyToFind": "ପିକଅପ୍ ଓ ଡ୍ରପ୍ ବାଛିଛନ୍ତି। ବସ୍ ଖୋଜନ୍ତୁ ବଟନ୍ ଦବାନ୍ତୁ।",
      "app.via": "ଭାୟା {via}",
      "app.viewOsm": "OSM ରିଲେସନ୍ ଦେଖନ୍ତୁ ↗",
      "app.noGeometry": "ଏହି ରୁଟ୍‌ର ଜ୍ୟାମିତି ଏପର୍ଯ୍ୟନ୍ତ OSMରେ ପ୍ରକାଶିତ ହୋଇନାହିଁ।",
      "app.preparingAnimation": "ଆନିମେଟେଡ୍ ରୁଟ୍ ଗାଇଡ୍ ପ୍ରସ୍ତୁତ ହେଉଛି…",
      "app.busTravelling": "ବସ୍ ପରବର୍ତ୍ତୀ ଷ୍ଟପ୍‌କୁ ଯାଉଛି…",
      "app.busAt": "ଷ୍ଟପ୍: {stop}",
      "app.animationReduced": "ଷ୍ଟପ୍: {stop} · ମୋସନ୍ ପସନ୍ଦ ଅନୁସାରେ ଆନିମେସନ୍ ବନ୍ଦ",
      "about.title": "ଆମ ବସ୍ ରୁଟ୍ ପ୍ଲାନର୍ ବିଷୟରେ",
      "about.eyebrow": "ଏହି ପ୍ରକଳ୍ପ ବିଷୟରେ",
      "about.heading": "ଆମ ବସ୍ ନେଟୱର୍କର ଏକ ସ୍ପଷ୍ଟ ଦୃଶ୍ୟ",
      "about.subtitle": "ପ୍ରକାଶିତ ରାଜଧାନୀ ଅଞ୍ଚଳ ରୁଟ୍ ମ୍ୟାପ୍‌ର ଏକ ସ୍ୱାଧୀନ ଭୌଗୋଳିକ ସହାୟିକା।",
      "about.whyTitle": "ଏହି ପ୍ଲାନର୍ କାହିଁକି ତିଆରି ହୋଇଛି",
      "about.why1": "ଅଧିକୃତ ନେଟୱର୍କ ଚିତ୍ର ସଂଯୋଗ ବୁଝିବାରେ ଉପଯୋଗୀ, କିନ୍ତୁ ଏହା ଭୌଗୋଳିକ ମ୍ୟାପ୍ ନୁହେଁ। ଏହି ପ୍ରକଳ୍ପ ଉପଲବ୍ଧ ଆମ ବସ୍ ରୁଟ୍‌ଗୁଡ଼ିକୁ ପ୍ରକୃତ ରାସ୍ତାରେ ଦେଖାଏ, ଯାହାଦ୍ୱାରା ଯାତ୍ରୀମାନେ ରାସ୍ତା ତୁଳନା କରି ଯାତ୍ରାର ଦୂରତା ଓ ସମ୍ଭାବ୍ୟ ବଦଳ ସ୍ଥାନ ବୁଝିପାରିବେ।",
      "about.why2": "ଏହି ସାଇଟ୍ ଭୁବନେଶ୍ୱର, କଟକ, ପୁରୀ ଓ ଓଡ଼ିଶାର ରାଜଧାନୀ ଅଞ୍ଚଳର ପଡ଼ୋଶୀ ସ୍ଥାନର ବାସିନ୍ଦା ଓ ପର୍ଯ୍ୟଟକଙ୍କ ପାଇଁ ଏକ ଯାତ୍ରା ଯୋଜନା ସହାୟିକା। ଏହା ଟିକେଟ୍ ବିକ୍ରି, ଗାଡ଼ି ଟ୍ରାକ୍ କିମ୍ବା ଅପରେଟରଙ୍କ ପ୍ରତିନିଧିତ୍ୱ କରେ ନାହିଁ।",
      "about.dataTitle": "ତଥ୍ୟ ଓ ପଦ୍ଧତି",
      "about.data1": "ରୁଟ୍ ତାଲିକା ଓ ଟର୍ମିନାଲ୍ ବିବରଣୀ ୨୦୨୪ CRUT ରାଜଧାନୀ ଅଞ୍ଚଳ ନେଟୱର୍କ PDFରୁ ଆସିଛି। ରାସ୍ତା ଜ୍ୟାମିତି OpenStreetMap ଅବଦାନକାରୀଙ୍କ ପ୍ରକାଶିତ ରୁଟ୍ ରିଲେସନ୍‌ରୁ ଆସିଛି।",
      "about.data2": "PDFର ୪୬ଟି ରୁଟ୍‌ମଧ୍ୟରୁ ୪୩ଟିର ବ୍ୟବହାରଯୋଗ୍ୟ OpenStreetMap ଜ୍ୟାମିତି ଅଛି। 29E, 41 ଓ 42 ରୁଟ୍ ତାଲିକାରେ ରହିଛି, କିନ୍ତୁ ଅନୁମାନିତ ରେଖା ଆଙ୍କିବା ପରିବର୍ତ୍ତେ ମ୍ୟାପ୍ ହୋଇନଥିବା ବୋଲି ଚିହ୍ନିତ।",
      "about.data3": "ଭୌଗୋଳିକ ନିକଟତା ଆଧାରରେ ସୁପାରିଶ ଗଣନା କରାଯାଏ। ସିଧାସଳଖ ବିକଳ୍ପ ବାଛିଥିବା ଦୁଇଟି ଷ୍ଟେସନ୍ ନିକଟ ଦେଇ ଯିବା ଦରକାର। ବଦଳ ସୁପାରିଶ ପାଇଁ ଚାଲି ଯୋଡ଼ିହେବା ଭଳି ନିକଟକୁ ଆସୁଥିବା ଦୁଇଟି ରୁଟ୍ ଖୋଜାଯାଏ।",
      "about.limitTitle": "ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ସୀମାବଦ୍ଧତା",
      "about.limit1": "ପ୍ଲାନର୍‌ରେ ଲାଇଭ୍ ପହଞ୍ଚିବା ସମୟ, ସେବା ବାରମ୍ବାରତା, ଭଡ଼ା କିମ୍ବା ସାମୟିକ ରୁଟ୍ ପରିବର୍ତ୍ତନ ନାହିଁ।",
      "about.limit2": "ଷ୍ଟେସନ୍ ନିକଟରେ ମ୍ୟାପ୍ ରେଖା ଥିବାର ଅର୍ଥ ପ୍ରତ୍ୟେକ ବସ୍ ଦୁଇ ଦିଗରେ ସେଠାରେ ରୁକିବ ବୋଲି ନିଶ୍ଚିତ ନୁହେଁ।",
      "about.limit3": "ଚାଲିବା ଆନୁମାନ ରୁଟ୍ ରେଖା ପର୍ଯ୍ୟନ୍ତ ନିକଟତା ମାପେ, ପାଦଚଲା ଦିଗନିର୍ଦ୍ଦେଶ ନୁହେଁ।",
      "about.limit4": "୧୪ ଜୁଲାଇ ୨୦୨୬ର ଯାଞ୍ଚ ତାରିଖ ପରେ OpenStreetMap ଓ ଅପରେଟର ସୂଚନା ବଦଳିପାରେ।",
      "about.confirm": "ଯାତ୍ରା ପୂର୍ବରୁ ବର୍ତ୍ତମାନର ସେବା ସୂଚନା ଓ ସଠିକ୍ ବୋର୍ଡିଂ ଦିଗ ନିଶ୍ଚିତ କରନ୍ତୁ।",
      "privacy.title": "ଗୋପନୀୟତା ନୀତି | ଆମ ବସ୍ ରୁଟ୍ ପ୍ଲାନର୍",
      "privacy.eyebrow": "ଗୋପନୀୟତା ନୀତି",
      "privacy.heading": "ଏହି ପ୍ଲାନର୍ ତଥ୍ୟ କିପରି ପରିଚାଳନା କରେ",
      "privacy.effective": "୧୪ ଜୁଲାଇ ୨୦୨୬ରୁ ପ୍ରଭାବୀ।",
      "privacy.selectionTitle": "ପ୍ଲାନର୍‌ରେ ବାଛିଥିବା ତଥ୍ୟ",
      "privacy.selection": "ଏହି ୱେବସାଇଟ୍ ପାଇଁ ଆକାଉଣ୍ଟ ଦରକାର ନାହିଁ। ଷ୍ଟେସନ୍ ଖୋଜା, ମ୍ୟାପ୍‌ରେ ବାଛିଥିବା ସ୍ଥାନ ଓ ଗଣନା ହୋଇଥିବା ରୁଟ୍ ବିକଳ୍ପ ବର୍ତ୍ତମାନର ପୃଷ୍ଠା ଭିଜିଟ୍ ସମୟରେ ଆପଣଙ୍କ ବ୍ରାଉଜରରେ ପ୍ରକ୍ରିୟା କରାଯାଏ। ସାଇଟ୍ ଏହି ବିକଳ୍ପକୁ ଇଚ୍ଛାକୃତ ଭାବେ ଡାଟାବେସ୍‌କୁ ପଠାଏ ନାହିଁ କିମ୍ବା ଯାତ୍ରା ଇତିହାସ ରଖେ ନାହିଁ।",
      "privacy.mapTitle": "ମ୍ୟାପ୍ ଓ ହୋଷ୍ଟିଂ ଅନୁରୋଧ",
      "privacy.mapHtml": "ମ୍ୟାପ୍ OpenStreetMapର ଟାଇଲ୍ ସେବାରୁ ଟାଇଲ୍ ମାଗେ। ସାଧାରଣ ୱେବ୍ ଅନୁରୋଧ ଭଳି, ସେବା ଓ ହୋଷ୍ଟିଂ ପ୍ରଦାନକାରୀ ଆପଣଙ୍କ IP ଠିକଣା, ବ୍ରାଉଜର ବିବରଣୀ, ଅନୁରୋଧ URL ଓ ସମୟ ଭଳି ପ୍ରାଯୁକ୍ତିକ ସୂଚନା ପାଇପାରନ୍ତି। ସେମାନଙ୍କ ପଦ୍ଧତି ପାଇଁ <a href=\"https://osmfoundation.org/wiki/Privacy_Policy\" rel=\"noreferrer\">OpenStreetMap Foundation ଗୋପନୀୟତା ନୀତି</a> ଦେଖନ୍ତୁ।",
      "privacy.adsTitle": "ବିଜ୍ଞାପନ ଓ କୁକି",
      "privacy.ads1": "ବିଜ୍ଞାପନ ସକ୍ରିୟ ଥିଲେ ଏହି ସାଇଟ୍ Google AdSense ବ୍ୟବହାର କରିପାରେ। Google ସମେତ ତୃତୀୟ-ପକ୍ଷ ବିକ୍ରେତା ବିଜ୍ଞାପନ ଦେଖାଇବା ଓ ମାପିବା ପାଇଁ ଆପଣଙ୍କ ବ୍ରାଉଜରରେ କୁକି ରଖିପାରନ୍ତି କିମ୍ବା ପଢ଼ିପାରନ୍ତି ଏବଂ ୱେବ୍ ବିକନ୍, IP ଠିକଣା ଓ ଅନ୍ୟ ପରିଚୟକ ବ୍ୟବହାର କରିପାରନ୍ତି।",
      "privacy.ads2Html": "<a href=\"https://policies.google.com/technologies/partner-sites\" rel=\"noreferrer\">Google ସହଭାଗୀ ସାଇଟ୍‌ର ତଥ୍ୟ କିପରି ବ୍ୟବହାର କରେ</a> ଜାଣନ୍ତୁ, <a href=\"https://adssettings.google.com/\" rel=\"noreferrer\">Google Ads Settings</a>ରେ ବ୍ୟକ୍ତିଗତ ବିଜ୍ଞାପନ ପରିଚାଳନା କରନ୍ତୁ ଏବଂ <a href=\"https://www.aboutads.info/choices/\" rel=\"noreferrer\">AboutAds</a>ରେ ଅନ୍ୟ ବିକଳ୍ପ ଦେଖନ୍ତୁ।",
      "privacy.ads3": "ସକ୍ରିୟ ଥିଲେ ଅନ୍ୟ ସ୍ୱୀକୃତ ବିଜ୍ଞାପନ ବିକ୍ରେତାମାନେ ମଧ୍ୟ ବିଜ୍ଞାପନ ଦେଖାଇପାରନ୍ତି। ସେମାନଙ୍କ ପରିଚୟ ଓ ଉପଲବ୍ଧ ବିକଳ୍ପ ସମ୍ମତି ବାର୍ତ୍ତା କିମ୍ବା ପ୍ରକାଶକଙ୍କ AdSense ନିୟନ୍ତ୍ରଣରେ ଦେଖାଯାଏ।",
      "privacy.consentTitle": "ସମ୍ମତି ଓ ଗୋପନୀୟତା ବିକଳ୍ପ",
      "privacy.consent": "ଯେଉଁ ଅଞ୍ଚଳରେ ସମ୍ମତି କିମ୍ବା ଅପ୍ଟ-ଆଉଟ୍ ସୂଚନା ଦରକାର, ସେଠାରେ ବ୍ୟକ୍ତିଗତ ବିଜ୍ଞାପନ ଦେଖାଇବା ପୂର୍ବରୁ ସାଇଟ୍ ମାଲିକଙ୍କୁ Google-ସ୍ୱୀକୃତ ସମ୍ମତି ପରିଚାଳନା ପ୍ଲାଟଫର୍ମ ବିନ୍ୟାସ କରିବା ଦରକାର। ଆପଣଙ୍କ ପସନ୍ଦ ସଞ୍ଚୟ ହୋଇପାରେ।",
      "privacy.updateTitle": "ନୀତି ଅଦ୍ୟତନ",
      "privacy.update": "ସାଇଟ୍‌ର ବୈଶିଷ୍ଟ୍ୟ, ହୋଷ୍ଟିଂ କିମ୍ବା ବିଜ୍ଞାପନ ସେବା ବଦଳିଲେ ଏହି ନୀତି ଅଦ୍ୟତନ ହୋଇପାରେ। ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ ପରିବର୍ତ୍ତନ ପ୍ରକାଶିତ ହେଲେ ଉପରେ ଥିବା ପ୍ରଭାବୀ ତାରିଖ ବଦଳାଯିବ।",
      "privacy.footer": "ରୁଟ୍‌ର ସଠିକତା ସମ୍ପର୍କିତ ପ୍ରଶ୍ନ ଗୋପନୀୟତା ଅନୁରୋଧଠାରୁ ଅଲଗା; ବର୍ତ୍ତମାନର ଅପରେଟର ସୂଚନାରେ ଏହା ଯାଞ୍ଚ କରନ୍ତୁ।",
      "terms.title": "ବ୍ୟବହାର ସର୍ତ୍ତ | ଆମ ବସ୍ ରୁଟ୍ ପ୍ଲାନର୍",
      "terms.eyebrow": "ବ୍ୟବହାର ସର୍ତ୍ତ",
      "terms.heading": "ପ୍ଲାନର୍‌କୁ ଯାତ୍ରା ସହାୟିକା ଭାବେ ବ୍ୟବହାର କରନ୍ତୁ",
      "terms.independentTitle": "ସ୍ୱାଧୀନ ସୂଚନା",
      "terms.independent": "ଏହି ୱେବସାଇଟ୍ ଏକ ସ୍ୱାଧୀନ ରୁଟ୍ ପ୍ଲାନିଂ ସହାୟିକା ଏବଂ CRUT କିମ୍ବା ଆମ ବସ୍ ଦ୍ୱାରା ପରିଚାଳିତ, ଅନୁମୋଦିତ କିମ୍ବା ରକ୍ଷଣାବେକ୍ଷଣ ହୁଏ ନାହିଁ। ନାମ ଓ ରୁଟ୍ ନମ୍ବର କେବଳ ସାଧାରଣ ପରିବହନ ବୁଝିବାରେ ସାହାଯ୍ୟ ପାଇଁ ବ୍ୟବହୃତ।",
      "terms.guaranteeTitle": "ରିଅଲ୍-ଟାଇମ୍ ସେବାର ନିଶ୍ଚିତତା ନାହିଁ",
      "terms.guarantee1": "ଫଳାଫଳ ପ୍ରକାଶିତ ନେଟୱର୍କ ମ୍ୟାପ୍ ଓ ସମୁଦାୟ ପରିଚାଳିତ ଭୌଗୋଳିକ ତଥ୍ୟ ଉପରେ ଆଧାରିତ। ଏଗୁଡ଼ିକ ଅସମ୍ପୂର୍ଣ୍ଣ, ପୁରୁଣା କିମ୍ବା ଭୁଲ୍ ହୋଇପାରେ। କୌଣସି ରୁଟ୍ ଚାଲୁଛି, ଷ୍ଟେସନ୍‌ରେ ବସ୍ ରୁକୁଛି, ବଦଳ ସମ୍ଭବ କିମ୍ବା ନିର୍ଦ୍ଦିଷ୍ଟ ସମୟରେ ଯାତ୍ରା ସମାପ୍ତ ହେବ—ପ୍ଲାନର୍ ଏହାର ନିଶ୍ଚିତତା ଦିଏ ନାହିଁ।",
      "terms.guarantee2": "ସୁପାରିଶ ଉପରେ ଭରସା କରିବା ପୂର୍ବରୁ ବର୍ତ୍ତମାନର ସମୟସାରଣୀ, ଦିଗ, ସୁଗମତା, ଭଡ଼ା, ସୁରକ୍ଷା ଅବସ୍ଥା ଓ ଅପରେଟର ଘୋଷଣା ଯାଞ୍ଚ କରିବା ଉପଯୋଗକର୍ତ୍ତାଙ୍କ ଦାୟିତ୍ୱ।",
      "terms.thirdPartyTitle": "ମ୍ୟାପ୍ ଓ ତୃତୀୟ-ପକ୍ଷ ସାମଗ୍ରୀ",
      "terms.thirdParty": "OpenStreetMap ତଥ୍ୟ ତାହାର ପ୍ରଯୁଜ୍ୟ ଖୋଲା-ତଥ୍ୟ ସର୍ତ୍ତ ଅନୁସାରେ ଉପଲବ୍ଧ ଏବଂ OpenStreetMap ଅବଦାନକାରୀଙ୍କୁ ଶ୍ରେୟ ଦିଆଯାଏ। ବାହ୍ୟ ସେବାର ଲିଙ୍କ ସୁବିଧା ପାଇଁ ଦିଆଯାଇଛି; ସେମାନଙ୍କର ନିଜସ୍ୱ ସର୍ତ୍ତ ଓ ଗୋପନୀୟତା ପଦ୍ଧତି ଅଛି।",
      "terms.useTitle": "ଗ୍ରହଣଯୋଗ୍ୟ ବ୍ୟବହାର",
      "terms.use": "ଆପଣ ବ୍ୟକ୍ତିଗତ ଯାତ୍ରା ଅନୁସନ୍ଧାନ ପାଇଁ ପ୍ଲାନର୍ ବ୍ୟବହାର କରିପାରିବେ। ସାଇଟ୍‌କୁ ବାଧା ଦେବା, ମ୍ୟାପ୍ ସେବା ଉପରେ ଅତ୍ୟଧିକ ଚାପ ଦେବା, ଫଳାଫଳକୁ ଅଧିକୃତ ନିର୍ଦ୍ଦେଶ ଭାବେ ଭୁଲ୍ ଭାବେ ଦେଖାଇବା କିମ୍ବା ଅବୈଧ ବିଜ୍ଞାପନ ଇମ୍ପ୍ରେସନ୍/କ୍ଲିକ୍ ପାଇଁ ସ୍ୱୟଂଚାଳିତ ଟ୍ରାଫିକ୍ ବ୍ୟବହାର କରନ୍ତୁ ନାହିଁ।",
      "terms.changeTitle": "ପରିବର୍ତ୍ତନ ଓ ଉପଲବ୍ଧତା",
      "terms.change": "ପ୍ରକଳ୍ପ ବିକଶିତ ହେବା ସହ ବୈଶିଷ୍ଟ୍ୟ, ରୁଟ୍ ତଥ୍ୟ ଓ ଏହି ସର୍ତ୍ତ ବଦଳିପାରେ। ସାଇଟ୍ ସାମୟିକ ଭାବେ ଅନୁପଲବ୍ଧ ହୋଇପାରେ ଏବଂ ନିରନ୍ତର ସେବାର ପ୍ରତିଶ୍ରୁତି ନାହିଁ।",
      "terms.footer": "ଯାତ୍ରା ପୂର୍ବରୁ ବର୍ତ୍ତମାନର ସେବା ସୂଚନା ନିଶ୍ଚିତ କରନ୍ତୁ।",
      "error.title": "ପୃଷ୍ଠା ମିଳିଲା ନାହିଁ | ଆମ ବସ୍ ରୁଟ୍ ପ୍ଲାନର୍",
      "error.eyebrow": "୪୦୪ · ପୃଷ୍ଠା ମିଳିଲା ନାହିଁ",
      "error.heading": "ଏହି ଷ୍ଟପ୍ ରୁଟ୍‌ରେ ନାହିଁ",
      "error.subtitle": "ପୃଷ୍ଠାଟି ସ୍ଥାନାନ୍ତର ହୋଇଥାଇପାରେ କିମ୍ବା ଠିକଣା ଭୁଲ୍ ହୋଇପାରେ।",
      "error.returnTitle": "ନେଟୱର୍କ ମ୍ୟାପ୍‌କୁ ଫେରନ୍ତୁ",
      "error.returnText": "ଷ୍ଟେସନ୍ ଖୋଜିବା, ସିଧାସଳଖ ସେବା ତୁଳନା କରିବା ଓ ମ୍ୟାପ୍ ହୋଇଥିବା ଆମ ବସ୍ ରୁଟ୍ ଦେଖିବା ପାଇଁ ପ୍ଲାନର୍ ଖୋଲନ୍ତୁ।",
      "error.open": "ରୁଟ୍ ପ୍ଲାନର୍ ଖୋଲନ୍ତୁ"
    }
  };

  let language = supported.has(localStorage.getItem(STORAGE_KEY)) ? localStorage.getItem(STORAGE_KEY) : "en";

  function t(key, values = {}) {
    const template = strings[language][key] || strings.en[key] || key;
    return Object.entries(values).reduce((text, [name, value]) => text.replaceAll(`{${name}}`, value), template);
  }

  function apply(root = document) {
    document.documentElement.lang = language === "or" ? "or" : "en";
    root.querySelectorAll("[data-i18n]").forEach((element) => { element.textContent = t(element.dataset.i18n); });
    root.querySelectorAll("[data-i18n-html]").forEach((element) => { element.innerHTML = t(element.dataset.i18nHtml); });
    root.querySelectorAll("[data-i18n-placeholder]").forEach((element) => { element.placeholder = t(element.dataset.i18nPlaceholder); });
    root.querySelectorAll("[data-i18n-content]").forEach((element) => { element.content = t(element.dataset.i18nContent); });
    const page = document.body?.dataset.page;
    if (page && strings[language][`${page}.title`]) document.title = t(`${page}.title`);
  }

  function setLanguage(next, persist = true) {
    if (!supported.has(next)) return;
    language = next;
    if (persist) localStorage.setItem(STORAGE_KEY, language);
    apply();
    document.querySelectorAll("[data-language-control]").forEach((control) => { control.value = language; });
    window.dispatchEvent(new CustomEvent("amabus:languagechange", { detail: { language } }));
  }

  function buildToolbar() {
    const toolbar = document.createElement("div");
    toolbar.className = "language-toolbar";
    toolbar.innerHTML = `<label><span aria-hidden="true">A / ଅ</span><span class="sr-only" data-i18n="common.language">Language</span><select data-language-control aria-label="Language"><option value="en">English</option><option value="or">ଓଡ଼ିଆ</option></select></label>`;
    toolbar.querySelector("select").value = language;
    toolbar.querySelector("select").addEventListener("change", (event) => setLanguage(event.target.value));
    document.body.prepend(toolbar);
  }

  function buildWelcome() {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const overlay = document.createElement("div");
    overlay.className = "language-welcome";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "language-title");
    overlay.innerHTML = `
      <form class="language-card">
        <p class="eyebrow">WELCOME · ସ୍ୱାଗତ</p>
        <h1 id="language-title">Choose your language<br><span lang="or">ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ</span></h1>
        <p>Use the same language across the route planner.<br><span lang="or">ସମ୍ପୂର୍ଣ୍ଣ ରୁଟ୍ ପ୍ଲାନର୍‌ରେ ଏହି ଭାଷା ବ୍ୟବହାର ହେବ।</span></p>
        <fieldset>
          <legend class="sr-only">Language</legend>
          <label><input type="radio" name="welcome-language" value="en" checked><span><strong>English</strong><small>Continue in English</small></span></label>
          <label lang="or"><input type="radio" name="welcome-language" value="or"><span><strong>ଓଡ଼ିଆ</strong><small>ଓଡ଼ିଆରେ ଆଗକୁ ଯାଆନ୍ତୁ</small></span></label>
        </fieldset>
        <button type="submit">Continue · ଆଗକୁ ଯାଆନ୍ତୁ</button>
      </form>`;
    overlay.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      const selected = new FormData(event.currentTarget).get("welcome-language");
      setLanguage(selected);
      overlay.remove();
    });
    document.body.appendChild(overlay);
    overlay.querySelector("input:checked").focus();
  }

  window.AmaBusI18n = { t, apply, setLanguage, get language() { return language; } };
  document.addEventListener("DOMContentLoaded", () => {
    buildToolbar();
    apply();
    buildWelcome();
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  const map = L.map("map").setView([37.5, 33.5], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
  }).addTo(map);

  const layers = [
    {
      name: "AOI",
      url: "http://localhost:8080/geoserver/tmet/wms",
      params: {
        layers: "tmet:aoi",
        format: "image/png",
        transparent: true,
        time: "2023-08-15T08:45:00.000Z", // Example time, you can change it as needed
      },
    },
  ];

  layers.forEach((layer) => {
    L.tileLayer.wms(layer.url, layer.params).addTo(map);
  });

  const infoDiv = document.getElementById("info");

  map.on("click", function (e) {
    const latlng = e.latlng;
    const containerPoint = map.latLngToContainerPoint(latlng);
    const size = map.getSize();
    const bbox = map.getBounds().toBBoxString();

    const promises = layers.map((layer) => {
      const url = new URL(layer.url);
      url.searchParams.set("SERVICE", "WMS");
      url.searchParams.set("VERSION", "1.1.1");
      url.searchParams.set("REQUEST", "GetFeatureInfo");
      url.searchParams.set("LAYERS", layer.params.layers);
      url.searchParams.set("QUERY_LAYERS", layer.params.layers);
      url.searchParams.set("INFO_FORMAT", "application/json");
      url.searchParams.set("FEATURE_COUNT", "5");
      url.searchParams.set("X", Math.floor(containerPoint.x));
      url.searchParams.set("Y", Math.floor(containerPoint.y));
      url.searchParams.set("SRS", "EPSG:4326");
      url.searchParams.set("WIDTH", size.x);
      url.searchParams.set("HEIGHT", size.y);
      url.searchParams.set("BBOX", bbox);
      url.searchParams.set("TIME", "2023-08-16T08:45:00.000Z");

      return axios.get(url.toString()).then((response) => ({
        layer: layer.name,
        data: response.data,
      }));
    });

    Promise.all(promises)
      .then((results) => {
        infoDiv.innerHTML = `<h4>Clicked Point: ${latlng.lat}, ${latlng.lng}</h4>`;
        results.forEach((result) => {
          const layerDiv = document.createElement("div");
          layerDiv.innerHTML = `
                    <h4>${result.layer}</h4>
                    <pre>${JSON.stringify(result.data, null, 2)}</pre>
                `;
          infoDiv.appendChild(layerDiv);
        });
      })
      .catch((error) => {
        console.error("Error fetching layer data:", error);
      });
  });
});

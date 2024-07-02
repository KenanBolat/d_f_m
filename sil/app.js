document.addEventListener("DOMContentLoaded", function () {
  const map = L.map('map').setView([37.5, 33.5], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
  }).addTo(map);

  const imageMosaicLayerUrl = 'http://localhost:8080/geoserver/tmet/wms';
  const postgisLayerUrl = 'http://localhost:8080/geoserver/tmet/wms';
  const params = {
      layers: 'tmet:tmet',
      format: 'image/png',
      transparent: true,
      time: '2023-08-15T08:45:00.000Z', // Example time, change as needed
  };

  L.tileLayer.wms(imageMosaicLayerUrl, params).addTo(map);

  const infoDiv = document.getElementById('info');

  map.on('click', function (e) {
      const latlng = e.latlng;
      const containerPoint = map.latLngToContainerPoint(latlng);
      const size = map.getSize();
      const bbox = map.getBounds().toBBoxString();
      const crs = map.options.crs.code;

      // GetFeatureInfo request for ImageMosaic layer
      const mosaicUrl = new URL(imageMosaicLayerUrl);
      mosaicUrl.searchParams.set('SERVICE', 'WMS');
      mosaicUrl.searchParams.set('VERSION', '1.1.1');
      mosaicUrl.searchParams.set('REQUEST', 'GetFeatureInfo');
      mosaicUrl.searchParams.set('LAYERS', 'tmet:tmet');
      mosaicUrl.searchParams.set('QUERY_LAYERS', 'tmet:tmet');
      mosaicUrl.searchParams.set('INFO_FORMAT', 'application/json');
      mosaicUrl.searchParams.set('FEATURE_COUNT', '1');
      mosaicUrl.searchParams.set('X', Math.floor(containerPoint.x));
      mosaicUrl.searchParams.set('Y', Math.floor(containerPoint.y));
      mosaicUrl.searchParams.set('SRS', crs);
      mosaicUrl.searchParams.set('WIDTH', size.x);
      mosaicUrl.searchParams.set('HEIGHT', size.y);
      mosaicUrl.searchParams.set('BBOX', bbox);
      mosaicUrl.searchParams.set('TIME', params.time);

      axios.get(mosaicUrl.toString()).then(mosaicResponse => {
        const mosaicData = mosaicResponse.data;

        // WFS GetFeature request for PostGIS layer with CQL_FILTER
        const postgisUrl = new URL(postgisLayerUrl);
        postgisUrl.searchParams.set('service', 'WFS');
        postgisUrl.searchParams.set('version', '1.0.0');
        postgisUrl.searchParams.set('request', 'GetFeature');
        postgisUrl.searchParams.set('typeName', 'tmet:tmet_fs');
        postgisUrl.searchParams.set('outputFormat', 'application/json');
        postgisUrl.searchParams.set('CQL_FILTER', "mission like 'MSG' AND ingestion='2023-08-14T08:45:00'");

        return axios.get(postgisUrl.toString());
    }).then(postgisResponse => {
        const postgisData = postgisResponse.data;
        console.log('PostGIS Data:', postgisData);
        debugger

        // Display results
        infoDiv.innerHTML = `<h4>Clicked Point: ${latlng.lat}, ${latlng.lng}</h4>`;
        infoDiv.innerHTML += `<h4>ImageMosaic Data:</h4><pre>${JSON.stringify(mosaicData, null, 2)}</pre>`;
        infoDiv.innerHTML += `<h4>PostGIS Data:</h4><pre>${JSON.stringify(postgisData, null, 2)}</pre>`;
    }).catch(error => {
        console.error('Error fetching data:', error);
    });
});
});
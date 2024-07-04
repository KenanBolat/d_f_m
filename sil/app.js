document.addEventListener("DOMContentLoaded", function () {
  const map = L.map('map').setView([37.5, 33.5], 6);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
  }).addTo(map);

  const imageMosaicLayerUrl = 'http://localhost:8080/geoserver/tmet/wms';
  const postgisLayerUrl = 'http://localhost:8080/geoserver/tmet/wms';
  const params = {
      layers: 'tmet:aoi',
      format: 'image/png',
      transparent: true,
      time: '2023-08-16T08:45:00.000Z',
      dim_mission: 'XYZ',
      dim_channel: 'WV_062'
  };

  L.tileLayer.wms(imageMosaicLayerUrl, params).addTo(map);
  L.tileLayer.wms(postgisLayerUrl, {layers:'tmet:border', transparent: true, format: 'image/png',}).addTo(map);

  
  const infoDiv = document.getElementById('info');

  map.on('click', function (e) {
      const latlng = e.latlng;
      const containerPoint = map.latLngToContainerPoint(latlng);
      const size = map.getSize();
      const bbox = map.getBounds().toBBoxString();
      const crs = map.options.crs.code;

      let mosaicData = null;
      let postgisData = null;

      // GetFeatureInfo request for ImageMosaic layer
      const mosaicUrl = new URL(imageMosaicLayerUrl);
      mosaicUrl.searchParams.set('SERVICE', 'WMS');
      mosaicUrl.searchParams.set('VERSION', '1.1.1');
      mosaicUrl.searchParams.set('REQUEST', 'GetFeatureInfo');
      mosaicUrl.searchParams.set('LAYERS', 'tmet:aoi');
      mosaicUrl.searchParams.set('QUERY_LAYERS', 'tmet:aoi');
      mosaicUrl.searchParams.set('INFO_FORMAT', 'application/json');
      mosaicUrl.searchParams.set('FEATURE_COUNT', '1');
      mosaicUrl.searchParams.set('X', Math.floor(containerPoint.x));
      mosaicUrl.searchParams.set('Y', Math.floor(containerPoint.y));
      mosaicUrl.searchParams.set('SRS', 'EPSG:4326');
      mosaicUrl.searchParams.set('WIDTH', size.x);
      mosaicUrl.searchParams.set('HEIGHT', size.y);
      mosaicUrl.searchParams.set('BBOX', bbox);
      mosaicUrl.searchParams.set('TIME', params.time);
      mosaicUrl.searchParams.set('DIM_MISSION', params.dim_mission);
      mosaicUrl.searchParams.set('DIM_CHANNEL', params.dim_channel);

      axios.get(mosaicUrl.toString()).then(mosaicResponse => {
         mosaicData = mosaicResponse.data;

        // WFS GetFeature request for PostGIS layer with CQL_FILTER
        const postgisUrl = new URL(postgisLayerUrl);
        postgisUrl.searchParams.set('service', 'WFS');
        postgisUrl.searchParams.set('version', '1.0.0');
        postgisUrl.searchParams.set('request', 'GetFeature');
        postgisUrl.searchParams.set('typeName', 'tmet:aoi_fs');
        postgisUrl.searchParams.set('outputFormat', 'application/json');
        //ingestion='2023-08-14 08:45:00.000' 
        postgisUrl.searchParams.set('CQL_FILTER', 
                                                    `mission like '${params.dim_mission}' 
                                                    AND ingestion='${params.time.replace('T', ' ').replace('Z', '')}' 
                                                    AND channel='${params.dim_channel}' 
                                                    AND Intersects(the_geom, POINT(${latlng.lng} ${latlng.lat }))`);

        return axios.get(postgisUrl.toString());
    }).then(postgisResponse => {
        postgisData = postgisResponse.data;
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
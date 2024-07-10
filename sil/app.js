document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map').setView([37.5, 33.5], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    const imageMosaicLayerUrl = 'http://localhost:8080/geoserver/tmet/wms';
    const postgisLayerUrl = 'http://localhost:8080/geoserver/tmet/ows';
    let currentLayers = [];
    const params = {
        layers: ['tmet:aoi'],  // Add all the layers you need
        format: 'image/png',
        transparent: true,
        time: '',
        dim_mission: 'XYZ',
        dim_channel: 'WV_062'
    };

    const initializeMapLayers = () => {
        currentLayers.forEach(layer => map.removeLayer(layer));
        currentLayers = params.layers.map(layer => {
            return L.tileLayer.wms(imageMosaicLayerUrl, {
                layers: layer,
                format: params.format,
                transparent: params.transparent,
                time: params.time,
                DIM_MISSION: params.dim_mission,
                DIM_CHANNEL: params.dim_channel
            }).addTo(map);
        });
    };

    L.tileLayer.wms(postgisLayerUrl, {
        layers: 'tmet:border',
        transparent: true,
        format: 'image/png',
    }).addTo(map);

    const infoDiv = document.getElementById('info');
    const legendImage = document.getElementById('legend-image');


    
    const updateLegend = () => {
        const legendUrl = `${imageMosaicLayerUrl}?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetLegendGraphic&LAYER=${params.layers[0]}&format=image/png&STYLE=&DIM_MISSION=${params.dim_mission}&DIM_CHANNEL=${params.dim_channel}`;
        legendImage.src = legendUrl;
    };

    const updateMap = () => {
        initializeMapLayers();
        updateLegend();
    };


    const formatDateToLocalISO = (date) => {
        const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
        const localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, -1);
        return localISOTime+'Z';
    };

    let startDatePicker = flatpickr("#start-date", {
        enableTime: true,
        dateFormat: "Y-m-d H:i:S",
        defaultDate: "2023-08-14 08:45:00",
        onChange: function(selectedDates, dateStr, instance) {
            params.time = selectedDates[0] ? formatDateToLocalISO(selectedDates[0]) : '';

        }
    });

    let endDatePicker = flatpickr("#end-date", {
        enableTime: true,
        dateFormat: "Y-m-d H:i:S",
        defaultDate: "2023-08-14 08:45:00",
        onChange: function(selectedDates, dateStr, instance) {
            params.end_time = selectedDates[0] ? formatDateToLocalISO(selectedDates[0]) : '';
        }
    });

    document.getElementById('search-button').addEventListener('click', function () {
        params.dim_mission = document.getElementById('mission-select').value;
        params.dim_channel = document.getElementById('channel-select').value;
        debugger
        if (params.time === '') {
            const selectedDate = startDatePicker.selectedDates[0];
            params.time = selectedDate ? formatDateToLocalISO(selectedDate) : formatDateToLocalISO(new Date());
        }
        updateMap();
    });

    map.on('click', function (e) {
        const latlng = e.latlng;
        const containerPoint = map.latLngToContainerPoint(latlng);
        const size = map.getSize();
        const bbox = map.getBounds().toBBoxString();
        const crs = map.options.crs.code;

        let mosaicData = [];
        let postgisData = null;

        const requests = params.layers.map(layer => {
            // GetFeatureInfo request for each ImageMosaic layer
            const mosaicUrl = new URL(imageMosaicLayerUrl);
            mosaicUrl.searchParams.set('SERVICE', 'WMS');
            mosaicUrl.searchParams.set('VERSION', '1.1.1');
            mosaicUrl.searchParams.set('REQUEST', 'GetFeatureInfo');
            mosaicUrl.searchParams.set('LAYERS', layer);
            mosaicUrl.searchParams.set('QUERY_LAYERS', layer);
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

            return axios.get(mosaicUrl.toString());
        });

        Promise.all(requests).then(responses => {
            mosaicData = responses.map(response => response.data);

            // WFS GetFeature request for PostGIS layer with CQL_FILTER
            const postgisUrl = new URL(postgisLayerUrl);
            postgisUrl.searchParams.set('service', 'WFS');
            postgisUrl.searchParams.set('version', '1.0.0');
            postgisUrl.searchParams.set('request', 'GetFeature');
            postgisUrl.searchParams.set('typeName', 'tmet:aoi_fs');
            postgisUrl.searchParams.set('outputFormat', 'application/json');
            postgisUrl.searchParams.set('CQL_FILTER',
                `mission like '${params.dim_mission}' AND
                ingestion='${params.time.replace('T', ' ').replace('Z', '')}' AND
                channel='${params.dim_channel}' AND
                Intersects(the_geom, POINT(${latlng.lng} ${latlng.lat}))`);

            return axios.get(postgisUrl.toString());
        }).then(postgisResponse => {
            postgisData = postgisResponse.data;

            // Display results
            infoDiv.innerHTML = `<h4>Clicked Point: ${latlng.lat}, ${latlng.lng}</h4>`;
            mosaicData.forEach((data, index) => {
                infoDiv.innerHTML += `<h4>ImageMosaic Data (Layer ${params.layers[index]}):</h4><pre>${JSON.stringify(data, null, 2)}</pre>`;
            });
            infoDiv.innerHTML += `<h4>PostGIS Data:</h4><pre>${JSON.stringify(postgisData, null, 2)}</pre>`;
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    });

    // Initialize the map layers
    updateMap();
});

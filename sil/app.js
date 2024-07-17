document.addEventListener("DOMContentLoaded", function () {
    const map = L.map('map').setView([42, 33.5], 6);

    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const noBasemapLayer = L.layerGroup();

    googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    });

    const imageMosaicLayerUrl = 'http://localhost:8080/geoserver/tmet/wms';
    const postgisLayerUrl = 'http://localhost:8080/geoserver/tmet/wms';
    let currentLayers = [];
    let animationInterval = null;
    let isPaused = false;
    let pauseTime = null;

    const params = {
        layers: ['tmet:aoi', 'tmet:rgb', 'tmet:cloud'],  // Add all the layers you need
        format: 'image/png',
        transparent: true,
        time: '',
        dim_mission: 'XYZ',
        dim_channel: 'WV_062'
    };

    const initializeMapLayers = () => {
        currentLayers.forEach(layer => map.removeLayer(layer));

        let selectedLayer = "";  
        if (params.dim_channel === 'natural_color') 
             selectedLayer = 'tmet:rgb';
        else if (params.dim_channel === 'ir_cloud_day')
            selectedLayer = 'tmet:cloud';
        else 
            selectedLayer = 'tmet:aoi';
        debugger;
        currentLayers = params.layers.map(layer => {
            return L.tileLayer.wms(imageMosaicLayerUrl, {
                layers: selectedLayer,
                format: params.format,
                transparent: params.transparent,
                time: params.time,
                DIM_MISSION: params.dim_mission,
                DIM_CHANNEL: params.dim_channel
            }).addTo(map);
        });
    };

    const infoDiv = document.getElementById('info');
    const legendImage = document.getElementById('legend-image');

    const updateLegend = () => {
        const legendUrl = `${imageMosaicLayerUrl}?SERVICE=WMS&VERSION=1.1.0&REQUEST=GetLegendGraphic&LAYER=${params.layers[0]}&format=image/png&STYLE=&DIM_MISSION=${params.dim_mission}&DIM_CHANNEL=${params.dim_channel}`;
        document.getElementById('legend-image').src = legendUrl;
        const legendLabel = document.getElementById('legend-label');
        legendLabel.innerText = `Mission: ${params.dim_mission},  Channel: ${params.dim_channel}, Date: ${params.time}`;
    };

    const updateMap = () => {
        initializeMapLayers();
        updateLegend();
    };

    const formatDateToLocalISO = (date) => {
        const tzoffset = date.getTimezoneOffset() * 60000; //offset in milliseconds
        const localISOTime = (new Date(date - tzoffset)).toISOString().slice(0, -1);
        return localISOTime + 'Z';
    };

    let startDatePicker = flatpickr("#start-date", {
        enableTime: true,
        dateFormat: "Y-m-d H:i:S",
        defaultDate: "2023-08-14 08:45:00",
        onChange: function (selectedDates, dateStr, instance) {
            params.time = selectedDates[0] ? formatDateToLocalISO(selectedDates[0]) : '';
        }
    });

    let endDatePicker = flatpickr("#end-date", {
        enableTime: true,
        dateFormat: "Y-m-d H:i:S",
        defaultDate: "2023-08-15 08:45:00",
        onChange: function (selectedDates, dateStr, instance) {
            params.end_time = selectedDates[0] ? formatDateToLocalISO(selectedDates[0]) : '';
        }
    });

    document.getElementById('search-button').addEventListener('click', function () {
        params.dim_mission = document.getElementById('mission-select').value;
        params.dim_channel = document.getElementById('channel-select').value;
        if (params.time === '') {
            const selectedDate = startDatePicker.selectedDates[0];
            params.time = selectedDate ? formatDateToLocalISO(selectedDate) : formatDateToLocalISO(new Date());
        }
        updateMap();
    });

    const animateMap = (startDate, endDate, interval = 1000) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        let currentTime = start;
        isPaused = false;

        const runAnimation = () => {
            if (currentTime > end) {
                clearInterval(animationInterval);
                return;
            }

            params.time = formatDateToLocalISO(currentTime);
            initializeMapLayers();
            endDatePicker.setDate(currentTime);
            updateLegend();

            currentTime.setMinutes(currentTime.getMinutes() + 15); // Update time by 15 minutes
        };

        animationInterval = setInterval(runAnimation, interval);

        document.getElementById('pause-button').addEventListener('click', function () {
            if (animationInterval) {
                clearInterval(animationInterval);
                pauseTime = currentTime;
                isPaused = true;
            }
        });

        document.getElementById('play-button').addEventListener('click', function () {
            if (isPaused) {
                currentTime = pauseTime;
                animationInterval = setInterval(runAnimation, interval);
                isPaused = false;
            }
        });

        document.getElementById('stop-button').addEventListener('click', function () {
            if (animationInterval) {
                clearInterval(animationInterval);
                isPaused = false;
            }
        });
    };

    document.getElementById('start-animation').addEventListener('click', function () {
        const startDate = document.getElementById('start-date').value;
        const endDate = document.getElementById('end-date').value;
        params.dim_mission = document.getElementById('mission-select').value;
        params.dim_channel = document.getElementById('channel-select').value;

        if (startDate && endDate) {
            animateMap(startDate, endDate);
        }
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
            document.getElementById('clicked-point').innerText = `${latlng.lat}, ${latlng.lng}`;

            const rasterTableBody = document.getElementById('raster-table-body');
            rasterTableBody.innerHTML = '';
            mosaicData.forEach((data, index) => {
                Object.entries(data.features[0].properties).forEach(([key, value]) => {
                    const row = rasterTableBody.insertRow();
                    row.insertCell(0).innerText = key;
                    row.insertCell(1).innerText = value;
                });
            });

            const postgisTableBody = document.getElementById('postgis-table-body');
            postgisTableBody.innerHTML = '';
            postgisData.features.forEach((feature, index) => {
                Object.entries(feature.properties).forEach(([key, value]) => {
                    const row = postgisTableBody.insertRow();
                    row.insertCell(0).innerText = key;
                    row.insertCell(1).innerText = value;
                });
            });

            $('#raster-table').DataTable();
            $('#postgis-table').DataTable();
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    });

    const baseMaps = {
        "Open Street Map": osmLayer,
        "Google Streets": googleStreets,
        "Google Terrain": googleTerrain,
        "Google Satellite": googleSat,
        "Google Hybrid": googleHybrid,
        "Empty": noBasemapLayer
    };

    const overlayMaps = {
        "Border": L.tileLayer.wms(postgisLayerUrl, {
            layers: 'tmet:border',
            transparent: true,
            format: 'image/png',
        }),
        "RGB": L.tileLayer.wms(imageMosaicLayerUrl, {
            layers: 'tmet:rgb',
            transparent: true,
            format: 'image/png',
        }),
        "Cloud": L.tileLayer.wms(imageMosaicLayerUrl, {
            layers: 'tmet:cloud',
            transparent: true,
            format: 'image/png',
        })
    };

    // Add layer control to the map
    L.control.layers(baseMaps, overlayMaps).addTo(map);

    // Initialize the map layers
    updateMap();

    // Initialize Leaflet Sidebar
    const sidebar = L.control.sidebar('sidebar', {
        closeButton: true,
        position: 'left'
    }).addTo(map);

    // Add AOI layer control to the sidebar
    const layerControlDiv = document.getElementById('layer-control');
    params.layers.forEach(layer => {
        const layerItem = document.createElement('div');
        layerItem.innerHTML = `<input type="checkbox" id="${layer}" checked> <label for="${layer}">${layer}</label>`;
        debugger
        layerControlDiv.appendChild(layerItem);

        document.getElementById(layer).addEventListener('change', function (e) {
            if (e.target.checked) {
                currentLayers.find(l => l.wmsParams.layers === layer).addTo(map);
            } else {
                map.removeLayer(currentLayers.find(l => l.wmsParams.layers === layer));
            }
        });
    });

    // Show the sidebar initially
    sidebar.open('home');
    const legendControl = L.control({ position: 'topright' });
    legendControl.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'legend');
        div.innerHTML = '<h4>Legend</h4><img id="legend-image" src="" alt="Legend"><div id="legend-label"></div>';
        return div;
    };
    legendControl.addTo(map);
    updateLegend();
});

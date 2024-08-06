const express = require('express');
const client = require('prom-client');
const axios = require('axios');

const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const gauge = new client.Gauge({
    name: 'geoserver_status',
    help: 'GeoServer status'
});

const checkGeoServer = async () => {
    try {
        const response = await axios.get('http://geoserver:8080/geoserver/rest/about/status');
        if (response.status === 200) {
            gauge.set(1); // 1 means up
        } else {
            gauge.set(0); // 0 means down
        }
    } catch (error) {
        gauge.set(0); // 0 means down
    }
};

// Check GeoServer status every 15 seconds
setInterval(checkGeoServer, 15000);
checkGeoServer(); // Initial check

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

const PORT = 9103;
app.listen(PORT, () => {
    console.log(`GeoServer exporter running on port ${PORT}`);
});

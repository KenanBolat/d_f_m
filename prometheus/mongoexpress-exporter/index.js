const express = require('express');
const client = require('prom-client');
const axios = require('axios');

const app = express();
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

const gauge = new client.Gauge({
    name: 'mongoexpress_status',
    help: 'MongoExpress status'
});

const checkMongoExpress = async () => {
    try {
        const response = await axios.get('http://mongoexpress:8081');
        if (response.status === 200) {
            gauge.set(1); // 1 means up
        } else {
            gauge.set(0); // 0 means down
        }
    } catch (error) {
        gauge.set(0); // 0 means down
    }
};

// Check MongoExpress status every 15 seconds
setInterval(checkMongoExpress, 15000);
checkMongoExpress(); // Initial check

app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

const PORT = 9104;
app.listen(PORT, () => {
    console.log(`MongoExpress exporter running on port ${PORT}`);
});


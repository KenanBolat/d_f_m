const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/api/tools", (req, res) => {
  const tools = [
    { name: "pgAdmin", url: "http://localhost:5050" },
    { name: "MongoExpress", url: "http://localhost:8081" },
    { name: "Elasticsearch", url: "http://localhost:9200" },
    { name: "GeoServer", url: "http://localhost:8080/geoserver" },
    { name: "RabbitMQ", url: "http://localhost:15672" },
  ];
  res.json(tools);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

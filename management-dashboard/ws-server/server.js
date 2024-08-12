const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const axios = require("axios");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Service URLs from environment variables or default values
const services = [
  {
    name: "db_admin",
    checkUrl: process.env.PGADMIN_URL || "http://localhost:5050/misc/ping",
  },
  {
    name: "mongo-express",
    checkUrl: process.env.MONGOEXPRESS_URL || "http://localhost:8081",
    auth: {
      username: "admin",
      password: "pass",
    },
  },
  {
    name: "Elasticsearch",
    checkUrl:
      process.env.ELASTICSEARCH_URL || "http://localhost:9200/_cluster/health",
  },
  {
    name: "GeoServer",
    checkUrl:
      process.env.GEOSERVER_URL ||
      "http://localhost:8080/geoserver/rest/about/status",
    auth: {
      username: "admin",
      password: "geoserver",
    },
  },
  {
    name: "RabbitMQ",
    checkUrl: process.env.RABBITMQ_URL || "http://localhost:15672/api/overview",
    auth: {
      username: "guest",
      password: "guest",
    },
  },
];

console.log(services);
console.log("web socket server is running!");

let serviceStatuses = {};

const checkServiceStatus = async () => {
  for (const service of services) {
    try {
      //   const response = await axios.get(service.checkUrl);
      let response = "" || null;
      if (service.auth) {
        const { username, password } = service.auth;
        const basicAuth = Buffer.from(`${username}:${password}`).toString(
          "base64"
        );
        response = await axios.get(service.checkUrl, {
          headers: {
            Authorization: `Basic ${basicAuth}`,
          },
        });
      } else {
        response = await axios.get(service.checkUrl);
      }

      if (response.status === 200) {
        serviceStatuses[service.name] = "Online";
      } else {
        serviceStatuses[service.name] = "Offline";
      }
    } catch (error) {
      console.log("error====================", error);
      serviceStatuses[service.name] = "Offline";
    }
  }
  broadcastStatus();
};

const broadcastStatus = () => {
  const statusMessage = JSON.stringify(serviceStatuses);
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(statusMessage);
    }
  });
};

setInterval(checkServiceStatus, 60000); // Check every 60 seconds

wss.on("connection", (ws) => {
  ws.send(JSON.stringify(serviceStatuses));
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`WebSocket server running on port ${PORT}`);
  checkServiceStatus(); // Initial check
});

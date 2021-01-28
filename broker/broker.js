const dotenv = require("dotenv");
const connectDB = require("../backend/config/db");
// Load env vars
dotenv.config();

// Load model
// const Records = require("../backend/models/Records");
const Room = require("../backend/models/Room");
const Device = require("../backend/models/Device");
// const User = require("../backend/models/User");

// Connect to Database
connectDB();

const aedesOptions = { concurrency: 200, connectTimeout: 5000 };
const aedes = require("aedes")({ aedesOptions });
const server = require("net").createServer(aedes.handle);
const port = process.env.MQTT_BROKER_PORT || 1883;

const httpServer = require("http").createServer();
const ws = require("websocket-stream");
const wsPort = 8883;

ws.createServer({ server: httpServer }, aedes.handle);
server.listen(port, function () {
  console.log("Broker listening on port", port);
});

httpServer.listen(wsPort, function () {
  console.log("Aedes MQTT-WS listening on port: " + wsPort);
  /*******************************************************
   *************** Broker Authentication and authorize *****************
   ******************************************************/

  aedes.authenticate = async (client, username, password, callback) => {
    if (username && username === process.env.MQTT_USERNAME) {
      if (password && password == process.env.MQTT_PASSWORD) {
        callback(null, true);
        console.log(`Client: ${client.id} authenticated successfully`);
      }
    } else {
      callback(false, false);
    }
  };
  aedes.authorizePublish = async (client, packet, callback) => {
    if (client.id !== "webApplicationServer") {
      try {
        const esp = await Room.findById(client.id);
        if (esp) {
          callback(null, true);
        }
      } catch (error) {
        console.log(error);
        callback(false, false);
      }
    }
    callback(null, true);
  };

  /*******************************************************
   ****************** Broker Events **********************
   ******************************************************/

  /* Fire when broker connected */
  aedes.on("clientReady", async (client) => {
    console.log(`Client ${client.id} has connected!`);
    // can push data to database
  });

  /* Publish message reaches to the broker */
  aedes.on("publish", async (publish, client) => {
    /* If not from an authenticated and connected client */
    // can push data to database

    if (!client) {
      return;
    }
    if (client.id !== "webApplicationServer") {
      const esp = await Room.findById(client.id);
      if (esp) {
        if (publish.payload.toString() == 0) {
          await Device.findByIdAndUpdate(
            publish.topic.substring(1 + publish.topic.indexOf("/")),
            { state: "off" }
          );
        } else {
          await Device.findByIdAndUpdate(
            publish.topic.substring(1 + publish.topic.indexOf("/")),
            { state: "on" }
          );
        }
      }
    }
    console.log(
      `Published message ${publish.payload.toString()} of topic ${
        publish.topic
      } from ${client.id}`
    );
  });

  /* Client subscribes to a topic */
  aedes.on("subscribe", (subscriptions, client) => {
    subscriptions.forEach((topic) => {
      console.log(
        `Client ${client.id} has subscribed to ${topic.topic} with QoS ${topic.qos}`
      );
    });
  });

  /* Client unsubscribes to a topic */
  aedes.on("unsubscribe", (unsubscriptions, client) => {
    console.log(`Client ${client.id} has unsubscribed from ${unsubscriptions}`);
  });

  /* Connection acknowledgement sent from  server to client */
  aedes.on("connackSent", (connack, client) => {
    if (connack.returnCode == 4) {
      return console.log("Auth error.");
    }
    console.log(
      `Ack sent to ${client.id} with return code ${connack.returnCode}`
    );
  });

  /* For QOS 1 or 2  - Packet successfully delivered to client */
  aedes.on("ack", async (packet, client) => {
    console.log(`Message ack\'d from ${client.id}`);
  });

  /* On client disconnect */
  aedes.on("clientDisconnect", async (client) => {
    console.log(`Client ${client.id} has disconnected`);
  });
});

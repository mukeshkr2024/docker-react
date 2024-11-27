const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const redis = require("redis");
const keys = require("./keys");

// Initialize Express App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Client Setup
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("error", () => console.error("Lost connection to PostgreSQL"));

const connectWithRetry = async () => {
  try {
    await pgClient.query("SELECT 1"); // Dummy query to test connection
    console.log("Connected to PostgreSQL");
  } catch (err) {
    console.error("PostgreSQL not ready, retrying...", err.message);
    setTimeout(connectWithRetry, 2000); // Retry after 2 seconds
  }
};

connectWithRetry();

// Ensure Table Exists
(async () => {
  try {
    await pgClient.query("CREATE TABLE IF NOT EXISTS values (number INT)");
    console.log("Table 'values' ensured.");
  } catch (err) {
    console.error("Error creating table:", err.message);
  }
})();

// Redis Client Setup
const redisClient = redis.createClient({
  socket: {
    host: keys.redisHost,
    port: keys.redisPort,
    reconnectStrategy: () => 1000,
  },
});

const redisPublisher = redisClient.duplicate();

(async () => {
  try {
    await redisClient.connect();
    await redisPublisher.connect();
    console.log("Redis clients connected.");
  } catch (err) {
    console.error("Error connecting to Redis:", err.message);
  }
})();

// Routes
app.get("/", (req, res) => res.send("Server is up and running"));

app.get("/values/all", async (req, res) => {
  try {
    const values = await pgClient.query("SELECT * FROM values");
    res.status(200).send(values.rows);
  } catch (err) {
    console.error("Error fetching all values:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/values/current", async (req, res) => {
  try {
    const values = await redisClient.hGetAll("values");
    res.status(200).send(values);
  } catch (err) {
    console.error("Error fetching current values:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/values", async (req, res) => {
  const { index } = req.body;

  if (index === undefined || index === null) {
    return res.status(400).send("Index is required");
  }

  if (parseInt(index, 10) > 40) {
    return res.status(400).send("Index out of range");
  }

  try {
    await redisClient.hSet("values", index, "Nothing yet!");
    redisPublisher.publish("insert", index);
    await pgClient.query("INSERT INTO values (number) VALUES ($1)", [index]);
    res.status(201).send({ working: true });
  } catch (err) {
    console.error("Error inserting value:", err.message);
    res.status(500).send("Internal Server Error");
  }
});

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

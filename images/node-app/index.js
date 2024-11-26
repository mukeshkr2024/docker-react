const express = require("express");
const redis = require("redis");

const app = express();

// Create Redis client and connect
const client = redis.createClient({
  url: "redis://redis-server:6379",
});

client.on("error", (err) => console.error("Redis Client Error", err));

(async () => {
  // Connect to Redis
  await client.connect();

  // Initialize visits key
  await client.set("visits", 0);

  // Define route
  app.get("/", async (req, res) => {
    try {
      const visits = await client.get("visits");
      res.send("Number of visits: " + visits);
      await client.set("visits", parseInt(visits) + 1);
    } catch (err) {
      console.error("Error fetching/updating visits:", err);
      res.status(500).send("An error occurred");
    }
  });

  // Start server
  app.listen(8081, () => {
    console.log("Listening on port 8081");
  });
})();

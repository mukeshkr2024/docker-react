module.exports = {
  redisHost: process.env.REDIS_HOST || "localhost",
  redisPort: parseInt(process.env.REDIS_PORT, 10) || 6379,
  pgUser: process.env.PG_USER || "postgres",
  pgHost: process.env.PG_HOST || "localhost",
  pgDatabase: process.env.PG_DATABASE || "postgres",
  pgPassword: process.env.PG_PASSWORD || "password",
  pgPort: parseInt(process.env.PG_PORT, 10) || 5432,
};

export const getConfig = isEnvProduction => ({
  user: "recipe-book-web-user",
  database: isEnvProduction
    ? "recipe-book_production"
    : "recipe-book_development",
  password: "tea",
  host: "localhost",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
});

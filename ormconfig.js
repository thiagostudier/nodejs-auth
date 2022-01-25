require('dotenv').config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env"
})

module.exports = { 
  "type": process.env.NODE_ENV === "test" ? "sqlite" : process.env.DB_DIALECT,
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.NODE_ENV == "test" ? "__tests__/database-sqlite.sqlite" : process.env.DB_NAME,
  "migrations": ["src/database/migrations/*.ts"],
  "entities": ["src/entities/*.ts"],
  "cli" : {
    "migrationsDir": "src/database/migrations",
    "entitiesDir": "src/entities"
  }
}
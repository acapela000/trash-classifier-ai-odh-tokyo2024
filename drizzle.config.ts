import { defineConfig } from "drizzle-kit";


export default defineConfig({
  dialect: 'sqlite',
  schema: './src/db/schema.ts',
  out: './migrations',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL || "http://127.0.0.1:8080",
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});

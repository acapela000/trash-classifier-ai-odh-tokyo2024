// import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { env } from "process";
import { config } from "dotenv";
// config(); // This will load the environment variables from .env

//config();
// config({ path: ".env" }); // or .env.local

const client = createClient({
  url: process.env.NEXT_PUBLIC_TURSO_CONNECTION_URL! || "http://localhost:3000",
  authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN!,
});
console.log(process.env.TURSO_CONNECTION_URL); // Make sure this logs the correct URL

export const db = drizzle(client);

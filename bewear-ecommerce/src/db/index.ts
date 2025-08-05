import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "./schema"; // Adjust the import path as necessary
export const db = drizzle(process.env.DATABASE_URL!, {
  schema,
});

import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const connectionString = process.env.CONNECTION_STRING;

const pool = new Pool({
    connectionString: connectionString,
});

export const db = drizzle(pool, { schema });
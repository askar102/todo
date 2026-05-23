import { Pool } from "pg";

// Fro hot-reload
const globalForDb = globalThis as unknown as {
    dbPool?: Pool;
};

// If pool exits, we using it. If not -> creating new Pool
export const db = globalForDb.dbPool ?? new Pool({
    connectionString: process.env.DATABASE_URL
});

if (process.env.NODE_ENV !== "production") {
    globalForDb.dbPool = db;
}
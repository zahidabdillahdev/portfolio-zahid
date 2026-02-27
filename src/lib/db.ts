import { Pool } from 'pg';

const isConfigured = !!process.env.DATABASE_URL;

const pool = isConfigured 
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
    })
  : null;

export const query = (text: string, params?: any[]) => {
  if (!pool) {
    throw new Error("Database not configured");
  }
  return pool.query(text, params);
};

export { isConfigured };
export default pool;

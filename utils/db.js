import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import schema from './schema'
const sql = neon(process.env.NEXT_PUBLIC_DIZZLE_DB_URL);
export const db = drizzle(sql,{schema});

import * as dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

dotenv.config()

if (!process.env.POSTGRES_DB_URL) {
	throw new Error('POSTGRES_DB_URL environment variable is not set')
}

export const client = postgres(process.env.POSTGRES_DB_URL)
export const db = drizzle(client, { schema })

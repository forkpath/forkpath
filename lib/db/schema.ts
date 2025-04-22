import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 100 }),
	email: varchar('email', { length: 255 }).notNull().unique(),
	password: text('password').notNull(),
	createdAt: timestamp('createdAt').notNull().defaultNow(),
	updatedAt: timestamp('updatedAt').notNull().defaultNow(),
	deletedAt: timestamp('deletedAt')
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

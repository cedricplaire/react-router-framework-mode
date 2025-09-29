import { pgTable, unique, integer, varchar, foreignKey, serial, jsonb, text, date, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const roles = pgEnum("roles", ['guest', 'user', 'admin'])
export const sex = pgEnum("sex", ['male', 'female'])
export const status = pgEnum("status", ['pending', 'paid'])


export const guestBook = pgTable("guestBook", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: ""guestBook_id_seq"", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647 }),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
}, (table) => {
	return {
		guestBookEmailUnique: unique("guestBook_email_unique").on(table.email),
	}
});

export const profileInfo = pgTable("profile_info", {
	id: serial().primaryKey().notNull(),
	userId: integer("user_id"),
	metadata: jsonb(),
	biography: text(),
	job: varchar({ length: 255 }),
}, (table) => {
	return {
		profileInfoUserIdUsersLzIdFk: foreignKey({
			columns: [table.userId],
			foreignColumns: [usersLz.id],
			name: "profile_info_user_id_usersLZ_id_fk"
		}),
	}
});

export const usersLz = pgTable("usersLZ", {
	id: serial().primaryKey().notNull(),
	avatar: varchar({ length: 255 }),
	firstName: varchar({ length: 255 }).notNull(),
	lastName: varchar({ length: 128 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	birthday: date(),
	sex: sex(),
	role: roles().default('guest'),
}, (table) => {
	return {
		usersLzEmailUnique: unique("usersLZ_email_unique").on(table.email),
	}
});

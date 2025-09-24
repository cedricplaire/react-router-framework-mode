import { integer, pgTable, pgEnum, serial, text, varchar, jsonb } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
import { seed } from "drizzle-seed";

export const rolesEnum = pgEnum("roles", ["guest", "user", "admin"]);
export const paidStatusEnum = pgEnum("status", ["pending", "paid"]);
export const sexEnum = pgEnum("sex", ["male", "female"]);

export const guestBook = pgTable("guestBook", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const usersLZ = pgTable("usersLZ", {
  id: serial('id').primaryKey(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 128 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  avatar: varchar({ length: 255 }),
  sex: sexEnum(),
  role: rolesEnum().default("guest")
});

export const usersRelations = relations(usersLZ, ({ one }) => ({
	profileInfo: one(profileInfo),
}));

export const profileInfo = pgTable('profile_info', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').references(() => usersLZ.id),
	metadata: jsonb('metadata'),
  biography: text(),
  job: varchar({ length: 255 })
});

export const profileInfoRelations = relations(profileInfo, ({ one }) => ({
	user: one(usersLZ, { fields: [profileInfo.userId], references: [usersLZ.id] }),
}));

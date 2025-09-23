import { integer, pgTable, serial, varchar, jsonb } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';

export const guestBook = pgTable("guestBook", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export const usersLZ = pgTable("usersLZ", {
  id: serial('id').primaryKey(),
  fullName: varchar({ length: 255 }).notNull(),
  nickName: varchar({ length: 128 }).notNull(),
  avatar: varchar({ length: 255 })
});

export const usersRelations = relations(usersLZ, ({ one }) => ({
	profileInfo: one(profileInfo),
}));

export const profileInfo = pgTable('profile_info', {
	id: serial('id').primaryKey(),
	userId: integer('user_id').references(() => usersLZ.id),
	metadata: jsonb('metadata'),
});

export const profileInfoRelations = relations(profileInfo, ({ one }) => ({
	user: one(usersLZ, { fields: [profileInfo.userId], references: [usersLZ.id] }),
}));

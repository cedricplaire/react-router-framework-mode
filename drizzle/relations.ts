import { relations } from "drizzle-orm/relations";
import { usersLz, profileInfo } from "./schema";

export const profileInfoRelations = relations(profileInfo, ({one}) => ({
	usersLz: one(usersLz, {
		fields: [profileInfo.userId],
		references: [usersLz.id]
	}),
}));

export const usersLzRelations = relations(usersLz, ({many}) => ({
	profileInfos: many(profileInfo),
}));
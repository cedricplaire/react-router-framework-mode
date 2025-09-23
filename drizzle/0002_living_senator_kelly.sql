CREATE TYPE "public"."status" AS ENUM('pending', 'paid');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('guest', 'user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."sex" AS ENUM('male', 'female');--> statement-breakpoint
ALTER TABLE "profile_info" ADD COLUMN "biography" text;--> statement-breakpoint
ALTER TABLE "profile_info" ADD COLUMN "job" varchar(255);--> statement-breakpoint
ALTER TABLE "usersLZ" ADD COLUMN "firstName" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "usersLZ" ADD COLUMN "lastName" varchar(128) NOT NULL;--> statement-breakpoint
ALTER TABLE "usersLZ" ADD COLUMN "email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "usersLZ" ADD COLUMN "birthday" date;--> statement-breakpoint
ALTER TABLE "usersLZ" ADD COLUMN "sex" "sex";--> statement-breakpoint
ALTER TABLE "usersLZ" ADD COLUMN "role" "roles" DEFAULT 'guest';--> statement-breakpoint
ALTER TABLE "usersLZ" DROP COLUMN IF EXISTS "fullName";--> statement-breakpoint
ALTER TABLE "usersLZ" DROP COLUMN IF EXISTS "nickName";--> statement-breakpoint
ALTER TABLE "usersLZ" ADD CONSTRAINT "usersLZ_email_unique" UNIQUE("email");
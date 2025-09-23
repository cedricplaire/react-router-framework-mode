import { createRequestHandler } from "@react-router/express";
import { drizzle } from "drizzle-orm/postgres-js";
import express from "express";
import postgres from "postgres";
import { AsyncLocalStorage } from "node:async_hooks";
import { pgTable, varchar, integer } from "drizzle-orm/pg-core";
const guestBook = pgTable("guestBook", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique()
});
const schema = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  guestBook
}, Symbol.toStringTag, { value: "Module" }));
const DatabaseContext = new AsyncLocalStorage();
function database() {
  const db2 = DatabaseContext.getStore();
  if (!db2) {
    throw new Error("DatabaseContext not set");
  }
  return db2;
}
const app = express();
if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is required");
const client = postgres(process.env.DATABASE_URL);
const db = drizzle(client, { schema });
app.use((_, __, next) => DatabaseContext.run(db, next));
app.use(
  createRequestHandler({
    build: () => import("./server-build-C1jDQJ6h.js"),
    getLoadContext() {
      return {
        VALUE_FROM_EXPRESS: "Hello from Express"
      };
    }
  })
);
export {
  app as a,
  database as d,
  guestBook as g
};

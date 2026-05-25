import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Reading history: tracks a user's reading status for each book.
 * bookKey is a stable identifier: "{partShortName}::{bookTitle}" (slugified).
 */
export const readingHistory = mysqlTable("reading_history", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  bookKey: varchar("bookKey", { length: 512 }).notNull(),
  bookTitle: text("bookTitle").notNull(),
  bookAuthor: text("bookAuthor"),
  partName: varchar("partName", { length: 256 }),
  categoryName: varchar("categoryName", { length: 256 }),
  status: mysqlEnum("status", ["want_to_read", "reading", "completed"]).notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ReadingHistory = typeof readingHistory.$inferSelect;
export type InsertReadingHistory = typeof readingHistory.$inferInsert;

/**
 * Bookmarks: lets users save resources (articles, tools, etc.) to a personal list.
 * resourceKey is a stable identifier for the resource.
 */
export const bookmarks = mysqlTable("bookmarks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  resourceKey: varchar("resourceKey", { length: 512 }).notNull(),
  resourceTitle: text("resourceTitle").notNull(),
  resourceType: varchar("resourceType", { length: 64 }),
  resourceUrl: text("resourceUrl"),
  domainId: varchar("domainId", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Bookmark = typeof bookmarks.$inferSelect;
export type InsertBookmark = typeof bookmarks.$inferInsert;

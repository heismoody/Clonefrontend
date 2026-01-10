import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").notNull(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const watchlist = pgTable("watchlist", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  movieId: integer("movie_id").notNull(),
  title: text("title").notNull(),
  posterUrl: text("poster_url"),
  year: text("year"),
  mediaType: text("media_type").notNull(), // 'movie' or 'tv'
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

export const refreshTokens = pgTable("refresh_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  revoked: integer("revoked").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const collectionItems = pgTable("collection_items", {
  id: serial("id").primaryKey(),
  collectionId: integer("collection_id")
    .references(() => collections.id, { onDelete: "cascade" })
    .notNull(),
  movieId: integer("movie_id").notNull(),
  title: text("title").notNull(),
  posterUrl: text("poster_url"),
  mediaType: text("media_type").notNull(),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

// Type exports for TypeScript
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type WatchlistItem = typeof watchlist.$inferSelect;
export type NewWatchlistItem = typeof watchlist.$inferInsert;
export type RefreshToken = typeof refreshTokens.$inferSelect;
export type NewRefreshToken = typeof refreshTokens.$inferInsert;
export type Collection = typeof collections.$inferSelect;
export type NewCollection = typeof collections.$inferInsert;
export type CollectionItem = typeof collectionItems.$inferSelect;
export type NewCollectionItem = typeof collectionItems.$inferInsert;

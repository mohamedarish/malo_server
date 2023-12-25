import { serial, text, pgTable } from "drizzle-orm/pg-core";

export const datuk = pgTable("datuk", {
    id: serial("id").primaryKey(),
    word: text("word").notNull(),
    meaning: text("meaning").notNull(),
});

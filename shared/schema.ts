import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  chapterNumber: integer("chapter_number").notNull(),
  title: text("title").notNull(),
  description: text("description"),
});

export const shlokas = pgTable("shlokas", {
  id: serial("id").primaryKey(),
  chapterId: integer("chapter_id").references(() => chapters.id).notNull(),
  verseNumber: integer("verse_number").notNull(),
  sanskrit: text("sanskrit").notNull(),
  transliteration: text("transliteration").notNull(),
  translation: text("translation").notNull(),
  purport: text("purport"),
  wordMeanings: jsonb("word_meanings").$type<Array<{sanskrit: string, english: string}>>(),
});

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  messages: jsonb("messages").$type<Array<{role: 'user' | 'assistant', content: string, timestamp: string}>>().notNull().default([]),
  currentStep: integer("current_step").default(0),
  progressPercentage: integer("progress_percentage").default(0),
  selectedShlokaId: integer("selected_shloka_id").references(() => shlokas.id),
  createdAt: text("created_at").notNull(),
});

export const insertChapterSchema = createInsertSchema(chapters);
export const insertShlokaSchema = createInsertSchema(shlokas);
export const insertConversationSchema = createInsertSchema(conversations).omit({ id: true });

export type Chapter = typeof chapters.$inferSelect;
export type Shloka = typeof shlokas.$inferSelect;
export type Conversation = typeof conversations.$inferSelect;
export type InsertChapter = z.infer<typeof insertChapterSchema>;
export type InsertShloka = z.infer<typeof insertShlokaSchema>;
export type InsertConversation = z.infer<typeof insertConversationSchema>;

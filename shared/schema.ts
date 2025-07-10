import { pgTable, text, serial, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  chapterNumber: integer("chapter_number").notNull(),
  title: text("title").notNull(),
  description: text("description"),
});

// Using existing shloks table structure
export const shloks = pgTable("shloks", {
  id: serial("id").primaryKey(),
  chapterNumber: integer("chapter_number"),
  verse: integer("verse"),
  sanskrit: text("sanskrit"),
  translation: text("translation"),
  explanation: text("explanation"),
  tags: text("tags"),
  chapter: text("chapter"),
  wordMeaning: text("word_meaning"),
  createdAt: text("created_at"),
});

export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  messages: jsonb("messages").$type<Array<{role: 'user' | 'assistant', content: string, timestamp: string}>>().notNull(),
  currentStep: integer("current_step").default(0),
  progressPercentage: integer("progress_percentage").default(0),
  selectedShlokId: integer("selected_shlok_id").references(() => shloks.id),
  createdAt: text("created_at").notNull(),
});

export const insertChapterSchema = createInsertSchema(chapters);
export const insertShlokSchema = createInsertSchema(shloks);
export const insertConversationSchema = createInsertSchema(conversations).omit({ id: true });

export type Chapter = typeof chapters.$inferSelect;
export type Shlok = typeof shloks.$inferSelect;
export type Conversation = typeof conversations.$inferSelect;
export type InsertChapter = z.infer<typeof insertChapterSchema>;
export type InsertShlok = z.infer<typeof insertShlokSchema>;
export type InsertConversation = z.infer<typeof insertConversationSchema>;

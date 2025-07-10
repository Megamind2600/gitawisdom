import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { chapters, shloks, conversations } from "@shared/schema";
import type { Chapter, Shlok, Conversation, InsertConversation } from "@shared/schema";
import { eq, ilike, or } from "drizzle-orm";

// Handle URL encoding for special characters in Supabase connection string
function fixSupabaseConnectionString(url: string): string {
  // Common issues with Supabase connection strings
  if (!url) return "";
  
  // Fix common encoding issues
  let fixedUrl = url
    .replace(/\*(?!%)/g, '%2A')  // Only encode * if not already encoded
    .replace(/%U(?![0-9A-Fa-f]{2})/g, '%25U')  // Fix %U sequences
    .replace(/aws-0-us-west-1\.pooler\.supabase\.com/g, 'aws-0-us-west-1.pooler.supabase.com');
  
  // Ensure proper protocol
  if (!fixedUrl.startsWith('postgresql://') && !fixedUrl.startsWith('postgres://')) {
    fixedUrl = 'postgresql://' + fixedUrl;
  }
  
  console.log('Database URL (first 50 chars):', fixedUrl.substring(0, 50) + '...');
  return fixedUrl;
}

const sql = neon(fixSupabaseConnectionString(process.env.DATABASE_URL || ""));
const db = drizzle(sql);

export class DatabaseStorage {
  async getChapter(id: number): Promise<Chapter | undefined> {
    const result = await db.select().from(chapters).where(eq(chapters.id, id));
    return result[0];
  }

  async getAllChapters(): Promise<Chapter[]> {
    return await db.select().from(chapters);
  }

  async getShloka(id: number): Promise<Shloka | undefined> {
    const result = await db.select().from(shlokas).where(eq(shlokas.id, id));
    return result[0];
  }

  async getShlokasByChapter(chapterId: number): Promise<Shloka[]> {
    return await db.select().from(shlokas).where(eq(shlokas.chapterId, chapterId));
  }

  async searchShlokas(query: string): Promise<Shloka[]> {
    const searchTerm = `%${query}%`;
    return await db.select().from(shlokas).where(
      or(
        ilike(shlokas.translation, searchTerm),
        ilike(shlokas.transliteration, searchTerm),
        ilike(shlokas.purport, searchTerm)
      )
    );
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const result = await db.insert(conversations).values(insertConversation).returning();
    return result[0];
  }

  async getConversation(sessionId: string): Promise<Conversation | undefined> {
    const result = await db.select().from(conversations).where(eq(conversations.sessionId, sessionId));
    return result[0];
  }

  async updateConversation(sessionId: string, updates: Partial<Conversation>): Promise<Conversation> {
    const result = await db.update(conversations)
      .set(updates)
      .where(eq(conversations.sessionId, sessionId))
      .returning();
    
    if (result.length === 0) {
      throw new Error(`Conversation not found: ${sessionId}`);
    }
    
    return result[0];
  }

  // Initialize database - create tables if they don't exist and seed with sample data
  async initializeDatabase(): Promise<void> {
    try {
      // Test if tables exist by counting rows
      const chaptersCount = await db.select().from(chapters).then(rows => rows.length);
      const shlokasCount = await db.select().from(shlokas).then(rows => rows.length);
      
      console.log(`Found ${chaptersCount} chapters and ${shlokasCount} shlokas in database`);
      
      // If no data exists, this might be a fresh database - we'll use the existing data
      if (chaptersCount === 0 && shlokasCount === 0) {
        console.log('No data found in database. Tables might not exist yet.');
        console.log('Please ensure your Supabase database has the required tables and data.');
      }
    } catch (error) {
      console.error('Database initialization error:', error);
      throw error;
    }
  }
}
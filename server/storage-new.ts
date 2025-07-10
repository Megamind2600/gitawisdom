import { chapters, shloks, conversations, type Chapter, type Shlok, type Conversation, type InsertConversation } from "@shared/schema";
import { DatabaseStorage } from "./database";

export interface IStorage {
  // Chapter operations
  getChapter(id: number): Promise<Chapter | undefined>;
  getAllChapters(): Promise<Chapter[]>;
  
  // Shlok operations  
  getShlok(id: number): Promise<Shlok | undefined>;
  getShloksByChapter(chapterNumber: number): Promise<Shlok[]>;
  searchShloks(query: string): Promise<Shlok[]>;
  
  // Conversation operations
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  getConversation(sessionId: string): Promise<Conversation | undefined>;
  updateConversation(sessionId: string, updates: Partial<Conversation>): Promise<Conversation>;
}

export class MemStorage implements IStorage {
  private chapters: Map<number, Chapter> = new Map();
  private shloks: Map<number, Shlok> = new Map();
  private conversations: Map<string, Conversation> = new Map();
  private currentChapterId = 1;
  private currentShlokId = 1;
  private currentConversationId = 1;

  constructor() {
    // Initialize with some sample data from Prabhupada's Bhagavad Gita As It Is
    this.seedData();
  }

  private seedData() {
    // Sample chapters
    const chapter1: Chapter = {
      id: this.currentChapterId++,
      chapterNumber: 1,
      title: "Observing the Armies on the Battlefield of Kuruksetra",
      description: "Arjuna's dilemma and despondency on the battlefield"
    };
    
    const chapter2: Chapter = {
      id: this.currentChapterId++,
      chapterNumber: 2,
      title: "Contents of the Gita Summarized",
      description: "The eternal soul and the temporary body"
    };
    
    this.chapters.set(chapter1.id, chapter1);
    this.chapters.set(chapter2.id, chapter2);

    // Sample shloks using your existing table structure
    const shlok1: Shlok = {
      id: this.currentShlokId++,
      chapterNumber: 2,
      verse: 47,
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
      translation: "You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
      explanation: "There are three considerations here: prescribed duties, capriciously work, and inaction. Prescribed duties are activities enjoined in terms of one's acquired modes of material nature.",
      wordMeaning: "karmani - in prescribed duties; eva - certainly; adhikarah - right; te - of you; ma - never; phalesu - in the fruits; kadacana - at any time",
      tags: "duty, action, detachment, karma-yoga",
      chapter: "Chapter 2",
      createdAt: new Date().toISOString(),
    };
    
    const shlok2: Shlok = {
      id: this.currentShlokId++,
      chapterNumber: 2,
      verse: 20,
      sanskrit: "न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः। अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥",
      translation: "For the soul there is neither birth nor death. It is not slain when the body is slain.",
      explanation: "Qualitatively, the small atomic fragmental part of the Supreme Spirit is one with the Supreme.",
      wordMeaning: "na - never; jayate - takes birth; mriyate - dies; va - either; kadacit - at any time; na - never; ayam - this",
      tags: "soul, eternity, death, rebirth",
      chapter: "Chapter 2",
      createdAt: new Date().toISOString(),
    };
    
    const shlok3: Shlok = {
      id: this.currentShlokId++,
      chapterNumber: 2,
      verse: 13,
      sanskrit: "देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा। तथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति॥",
      translation: "As the embodied soul continuously passes, in this body, from boyhood to youth to old age, the soul similarly passes into another body at death. A sober person is not bewildered by such a change.",
      explanation: "Since every living entity is an individual soul, each is changing his body every moment, manifesting sometimes as a child, sometimes as a youth, and sometimes as an old man.",
      wordMeaning: "dehinah - of the embodied; asmin - in this; yatha - as; dehe - in the body; kaumaram - boyhood; yauvanam - youth; jara - old age",
      tags: "body, soul, change, wisdom",
      chapter: "Chapter 2",
      createdAt: new Date().toISOString(),
    };
    
    this.shloks.set(shlok1.id, shlok1);
    this.shloks.set(shlok2.id, shlok2);
    this.shloks.set(shlok3.id, shlok3);
  }

  async getChapter(id: number): Promise<Chapter | undefined> {
    return this.chapters.get(id);
  }

  async getAllChapters(): Promise<Chapter[]> {
    return Array.from(this.chapters.values());
  }

  async getShlok(id: number): Promise<Shlok | undefined> {
    return this.shloks.get(id);
  }

  async getShloksByChapter(chapterNumber: number): Promise<Shlok[]> {
    return Array.from(this.shloks.values()).filter(s => s.chapterNumber === chapterNumber);
  }

  async searchShloks(query: string): Promise<Shlok[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.shloks.values()).filter(s => 
      s.sanskrit?.toLowerCase().includes(lowerQuery) ||
      s.translation?.toLowerCase().includes(lowerQuery) ||
      s.explanation?.toLowerCase().includes(lowerQuery) ||
      s.tags?.toLowerCase().includes(lowerQuery)
    );
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const conversation: Conversation = {
      id: this.currentConversationId++,
      ...insertConversation,
      selectedShlokId: insertConversation.selectedShlokId || null,
    };
    
    this.conversations.set(conversation.sessionId, conversation);
    return conversation;
  }

  async getConversation(sessionId: string): Promise<Conversation | undefined> {
    return this.conversations.get(sessionId);
  }

  async updateConversation(sessionId: string, updates: Partial<Conversation>): Promise<Conversation> {
    const existing = this.conversations.get(sessionId);
    if (!existing) {
      throw new Error(`Conversation not found: ${sessionId}`);
    }
    
    const updated: Conversation = { ...existing, ...updates };
    this.conversations.set(sessionId, updated);
    return updated;
  }
}

let storage: IStorage;

async function initializeStorage() {
  try {
    const dbStorage = new DatabaseStorage();
    await dbStorage.initializeDatabase();
    storage = dbStorage;
    console.log("✓ Using database storage");
  } catch (error) {
    console.error("Database storage failed, falling back to memory storage:", error.message);
    storage = new MemStorage();
    console.log("✓ Using memory storage with sample data");
  }
}

export { storage, initializeStorage };
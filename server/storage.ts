import { chapters, shlokas, conversations, type Chapter, type Shloka, type Conversation, type InsertConversation } from "@shared/schema";

export interface IStorage {
  // Chapter operations
  getChapter(id: number): Promise<Chapter | undefined>;
  getAllChapters(): Promise<Chapter[]>;
  
  // Shloka operations  
  getShloka(id: number): Promise<Shloka | undefined>;
  getShlokasByChapter(chapterId: number): Promise<Shloka[]>;
  searchShlokas(query: string): Promise<Shloka[]>;
  
  // Conversation operations
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  getConversation(sessionId: string): Promise<Conversation | undefined>;
  updateConversation(sessionId: string, updates: Partial<Conversation>): Promise<Conversation>;
}

export class MemStorage implements IStorage {
  private chapters: Map<number, Chapter> = new Map();
  private shlokas: Map<number, Shloka> = new Map();
  private conversations: Map<string, Conversation> = new Map();
  private currentChapterId = 1;
  private currentShlokaId = 1;
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

    // Sample shlokas
    const shloka1: Shloka = {
      id: this.currentShlokaId++,
      chapterId: chapter2.id,
      verseNumber: 47,
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
      transliteration: "karmany evadhikaras te ma phalesu kadacana ma karma-phala-hetur bhur ma te sango 'stv akarmani",
      translation: "You have a right to perform your prescribed duty, but never to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
      purport: "There are three considerations here: prescribed duties, capriciously work, and inaction. Prescribed duties are activities enjoined in terms of one's acquired modes of material nature.",
      wordMeanings: [
        { sanskrit: "karmani", english: "in prescribed duties" },
        { sanskrit: "eva", english: "certainly" },
        { sanskrit: "adhikarah", english: "right" },
        { sanskrit: "te", english: "of you" },
        { sanskrit: "ma", english: "never" },
        { sanskrit: "phalesu", english: "in the fruits" },
        { sanskrit: "kadacana", english: "at any time" },
        { sanskrit: "ma", english: "never" },
        { sanskrit: "karma-phala", english: "in the result of the work" },
        { sanskrit: "hetuh", english: "cause" },
        { sanskrit: "bhuh", english: "become" },
        { sanskrit: "ma", english: "never" },
        { sanskrit: "te", english: "of you" },
        { sanskrit: "sangah", english: "attachment" },
        { sanskrit: "astu", english: "be there" },
        { sanskrit: "akarmani", english: "in not doing" }
      ]
    };

    const shloka2: Shloka = {
      id: this.currentShlokaId++,
      chapterId: chapter2.id,
      verseNumber: 20,
      sanskrit: "न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः। अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे॥",
      transliteration: "na jayate mriyate va kadacin nayam bhutva bhavita va na bhuyah ajo nityah sasvato 'yam purano na hanyate hanyamane sarire",
      translation: "For the soul there is neither birth nor death. It is not slain when the body is slain.",
      purport: "Qualitatively, the small atomic fragmental part of the Supreme Spirit is one with the Supreme.",
      wordMeanings: [
        { sanskrit: "na", english: "never" },
        { sanskrit: "jayate", english: "takes birth" },
        { sanskrit: "mriyate", english: "dies" },
        { sanskrit: "va", english: "either" },
        { sanskrit: "kadacit", english: "at any time" },
        { sanskrit: "na", english: "never" },
        { sanskrit: "ayam", english: "this" },
        { sanskrit: "bhutva", english: "having come into being" },
        { sanskrit: "bhavita", english: "will come to be" },
        { sanskrit: "va", english: "or" },
        { sanskrit: "na", english: "not" },
        { sanskrit: "bhuyah", english: "or is again" },
        { sanskrit: "ajah", english: "unborn" },
        { sanskrit: "nityah", english: "eternal" },
        { sanskrit: "sasvato", english: "permanent" },
        { sanskrit: "ayam", english: "this" },
        { sanskrit: "puranah", english: "the oldest" },
        { sanskrit: "na", english: "never" },
        { sanskrit: "hanyate", english: "is killed" },
        { sanskrit: "hanyamane", english: "being killed" },
        { sanskrit: "sarire", english: "the body" }
      ]
    };

    this.shlokas.set(shloka1.id, shloka1);
    this.shlokas.set(shloka2.id, shloka2);
  }

  async getChapter(id: number): Promise<Chapter | undefined> {
    return this.chapters.get(id);
  }

  async getAllChapters(): Promise<Chapter[]> {
    return Array.from(this.chapters.values());
  }

  async getShloka(id: number): Promise<Shloka | undefined> {
    return this.shlokas.get(id);
  }

  async getShlokasByChapter(chapterId: number): Promise<Shloka[]> {
    return Array.from(this.shlokas.values()).filter(s => s.chapterId === chapterId);
  }

  async searchShlokas(query: string): Promise<Shloka[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.shlokas.values()).filter(s => 
      s.translation.toLowerCase().includes(searchTerm) ||
      s.purport?.toLowerCase().includes(searchTerm) ||
      s.transliteration.toLowerCase().includes(searchTerm)
    );
  }

  async createConversation(insertConversation: InsertConversation): Promise<Conversation> {
    const conversation: Conversation = {
      id: this.currentConversationId++,
      sessionId: insertConversation.sessionId,
      messages: insertConversation.messages as Array<{role: 'user' | 'assistant', content: string, timestamp: string}>,
      currentStep: insertConversation.currentStep || 0,
      progressPercentage: insertConversation.progressPercentage || 0,
      selectedShlokaId: insertConversation.selectedShlokaId || null,
      createdAt: insertConversation.createdAt,
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

export const storage = new MemStorage();

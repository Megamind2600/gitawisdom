export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AIResponse {
  message: string;
  options: string[];
  shouldShowShloka: boolean;
}

export interface WordMeaning {
  sanskrit: string;
  english: string;
}

export interface Chapter {
  id: number;
  chapterNumber: number;
  title: string;
  description?: string;
}

export interface Shloka {
  id: number;
  chapterId: number;
  verseNumber: number;
  sanskrit: string;
  transliteration: string;
  translation: string;
  purport?: string;
  wordMeanings?: WordMeaning[];
}

export interface Conversation {
  id: number;
  sessionId: string;
  messages: Message[];
  currentStep: number;
  progressPercentage: number;
  selectedShlokaId?: number | null;
  createdAt: string;
}

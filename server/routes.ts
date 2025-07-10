import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function registerRoutes(app: Express): Promise<Server> {
  // Create or get conversation
  app.post("/api/conversations", async (req, res) => {
    try {
      const { sessionId } = req.body;
      
      let conversation = await storage.getConversation(sessionId);
      
      if (!conversation) {
        conversation = await storage.createConversation({
          sessionId,
          messages: [],
          currentStep: 0,
          progressPercentage: 0,
          selectedShlokaId: null,
          createdAt: new Date().toISOString()
        });
      }
      
      res.json(conversation);
    } catch (error) {
      res.status(500).json({ error: "Failed to create conversation" });
    }
  });

  // Get conversation
  app.get("/api/conversations/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const conversation = await storage.getConversation(sessionId);
      
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      
      res.json(conversation);
    } catch (error) {
      res.status(500).json({ error: "Failed to get conversation" });
    }
  });

  // Send message and get AI response
  app.post("/api/conversations/:sessionId/messages", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }
      
      let conversation = await storage.getConversation(sessionId);
      if (!conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }
      
      // Add user message
      const userMessage = {
        role: 'user' as const,
        content: message,
        timestamp: new Date().toISOString()
      };
      
      const updatedMessages = [...conversation.messages, userMessage];
      
      // Get AI response
      const systemPrompt = `You are a compassionate guide helping users reflect through the wisdom of the Bhagavad Gita. 
      
      IMPORTANT RULES:
      - Never give advice. Always encourage self-reflection and introspection.
      - Use phrases like "Let's explore this together" or "That's a meaningful feeling"
      - Ask thoughtful questions to help users go deeper
      - Offer 2-3 clickable response options that are affirming and introspective
      - Keep responses warm, compassionate, and non-judgmental
      - Progress the conversation naturally toward deeper self-understanding
      
      Respond in JSON format with:
      {
        "message": "your compassionate response",
        "options": ["option1", "option2", "option3"],
        "progressPercentage": number (0-100),
        "shouldShowShloka": boolean,
        "shlokaQuery": "search terms if shouldShowShloka is true"
      }`;
      
      const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              message: { type: "string" },
              options: { type: "array", items: { type: "string" } },
              progressPercentage: { type: "number" },
              shouldShowShloka: { type: "boolean" },
              shlokaQuery: { type: "string" }
            },
            required: ["message", "options", "progressPercentage", "shouldShowShloka"]
          }
        },
        contents: [
          ...updatedMessages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] }))
        ]
      });
      
      const aiResponse = JSON.parse(response.text || "{}");
      
      const assistantMessage = {
        role: 'assistant' as const,
        content: aiResponse.message,
        timestamp: new Date().toISOString()
      };
      
      const finalMessages = [...updatedMessages, assistantMessage];
      
      // Update conversation
      const updatedConversation = await storage.updateConversation(sessionId, {
        messages: finalMessages,
        currentStep: (conversation.currentStep || 0) + 1,
        progressPercentage: aiResponse.progressPercentage || Math.min(100, (conversation.progressPercentage || 0) + 20)
      });
      
      // If AI suggests showing shloka, find relevant one
      let relevantShloka = null;
      if (aiResponse.shouldShowShloka && aiResponse.shlokaQuery) {
        const shlokas = await storage.searchShlokas(aiResponse.shlokaQuery);
        if (shlokas.length > 0) {
          relevantShloka = shlokas[0];
          await storage.updateConversation(sessionId, {
            selectedShlokaId: relevantShloka.id
          });
        }
      }
      
      res.json({
        conversation: updatedConversation,
        aiResponse: {
          message: aiResponse.message,
          options: aiResponse.options || [],
          shouldShowShloka: aiResponse.shouldShowShloka || false
        },
        relevantShloka
      });
      
    } catch (error) {
      console.error("Error processing message:", error);
      res.status(500).json({ error: "Failed to process message" });
    }
  });

  // Get shloka with chapter info
  app.get("/api/shlokas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const shloka = await storage.getShloka(id);
      
      if (!shloka) {
        return res.status(404).json({ error: "Shloka not found" });
      }
      
      const chapter = await storage.getChapter(shloka.chapterId);
      
      res.json({
        shloka,
        chapter
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to get shloka" });
    }
  });

  // Get chapters
  app.get("/api/chapters", async (req, res) => {
    try {
      const chapters = await storage.getAllChapters();
      res.json(chapters);
    } catch (error) {
      res.status(500).json({ error: "Failed to get chapters" });
    }
  });

  // Text-to-speech endpoint
  app.post("/api/tts", async (req, res) => {
    try {
      const { text } = req.body;
      
      if (!text) {
        return res.status(400).json({ error: "Text is required" });
      }
      
      // For now, we'll use the Web Speech API on the frontend
      // In a production app, you'd integrate with Google Cloud Text-to-Speech
      res.json({ 
        success: true, 
        message: "Use Web Speech API on frontend",
        text 
      });
      
    } catch (error) {
      res.status(500).json({ error: "Failed to generate speech" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

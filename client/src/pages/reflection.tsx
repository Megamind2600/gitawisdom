import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ProgressBar } from "@/components/progress-bar";
import { apiRequest } from "@/lib/queryClient";
import { Send, Home, Heart, Lightbulb, Mountain } from "lucide-react";
import type { Message, AIResponse, Conversation } from "@/lib/types";

interface ReflectionProps {
  sessionId: string;
  onGoHome: () => void;
  onShowShloka: (shlokaId: number) => void;
}

export default function Reflection({ sessionId, onGoHome, onShowShloka }: ReflectionProps) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [pendingOptions, setPendingOptions] = useState<string[]>([]);

  // Get or create conversation
  const { data: conversation, refetch } = useQuery<Conversation>({
    queryKey: ["/api/conversations", sessionId],
    queryFn: async () => {
      const response = await apiRequest("GET", `/api/conversations/${sessionId}`);
      return response.json();
    },
    retry: false,
  });

  // Create conversation if it doesn't exist
  const createConversation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/conversations", { sessionId });
      return response.json();
    },
    onSuccess: () => {
      refetch();
    },
  });

  // Send message mutation
  const sendMessage = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", `/api/conversations/${sessionId}/messages`, {
        message,
      });
      return response.json();
    },
    onSuccess: (data) => {
      setCurrentMessage("");
      setPendingOptions(data.aiResponse?.options || []);
      refetch();
      
      // If AI suggests showing shloka, navigate to it
      if (data.aiResponse?.shouldShowShloka && data.relevantShloka) {
        setTimeout(() => {
          onShowShloka(data.relevantShloka.id);
        }, 1000);
      }
    },
  });

  // Initialize conversation if needed
  useEffect(() => {
    if (!conversation) {
      createConversation.mutate();
    }
  }, [conversation]);

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      sendMessage.mutate(currentMessage.trim());
    }
  };

  const handleSelectResponse = (response: string) => {
    sendMessage.mutate(response);
    setPendingOptions([]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageIcon = (role: string) => {
    if (role === "assistant") {
      return <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
        <span className="text-white text-sm">🪷</span>
      </div>;
    } else {
      return <div className="bg-gray-300 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
        <span className="text-gray-600 text-sm">👤</span>
      </div>;
    }
  };

  const getOptionIcon = (index: number) => {
    const icons = [Heart, Lightbulb, Mountain];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="w-4 h-4 text-orange-500 mr-2" />;
  };

  if (!conversation) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🕉️</div>
          <p className="text-gray-600">Preparing your reflection space...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      {/* Progress Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-orange-500 text-xl">🕉️</span>
              <span className="font-serif font-semibold text-gray-800">Reflection Journey</span>
            </div>
            <div className="flex items-center space-x-4">
              <ProgressBar percentage={conversation.progressPercentage} />
              <Button
                variant="ghost"
                size="sm"
                onClick={onGoHome}
                className="text-gray-500 hover:text-gray-700"
              >
                <Home className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Conversation Area */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Show initial message if no conversation yet */}
              {conversation.messages.length === 0 && (
                <div className="flex items-start space-x-4">
                  {getMessageIcon("assistant")}
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-gray-800">
                        Welcome to your reflection journey. I'm here to accompany you as you explore your inner landscape through the timeless wisdom of the Bhagavad Gita. 
                        <br/><br/>
                        Let's begin gently. How are you feeling today?
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Just now</p>
                  </div>
                </div>
              )}

              {/* Conversation messages */}
              {conversation.messages.map((message, index) => (
                <div key={index} className={`flex items-start space-x-4 ${message.role === 'user' ? 'justify-end' : ''}`}>
                  {message.role === 'user' ? (
                    <>
                      <div className="flex-1 max-w-md">
                        <div className="bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl p-4 text-white">
                          <p>{message.content}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2 text-right">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                      {getMessageIcon(message.role)}
                    </>
                  ) : (
                    <>
                      {getMessageIcon(message.role)}
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-2xl p-4">
                          <p className="text-gray-800">{message.content}</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(message.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}

              {/* Show pending options if AI provided them */}
              {pendingOptions.length > 0 && (
                <div className="flex items-start space-x-4">
                  {getMessageIcon("assistant")}
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl p-4">
                      <p className="text-gray-800 mb-4">You can choose from these reflections, or share your own thoughts:</p>
                      <div className="space-y-2">
                        {pendingOptions.map((option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start text-left bg-white hover:bg-orange-50 border-orange-200 hover:border-orange-500 text-gray-700 hover:text-orange-700 h-auto py-3 px-4"
                            onClick={() => handleSelectResponse(option)}
                          >
                            {getOptionIcon(index)}
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Input Area */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <Textarea
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Share your thoughts, or choose from the options above..."
                  className="resize-none border-orange-200 focus:border-orange-500 focus:ring-orange-500"
                  rows={3}
                />
              </div>
              <Button
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || sendMessage.isPending}
                className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-500 text-white transform hover:scale-105 transition-all duration-200"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

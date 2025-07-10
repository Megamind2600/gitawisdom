import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Reflection from "@/pages/reflection";
import ShlokaDisplay from "@/pages/shloka";

type AppState = "home" | "reflection" | "shloka";

function App() {
  const [currentState, setCurrentState] = useState<AppState>("home");
  const [sessionId, setSessionId] = useState<string>("");
  const [currentShlokaId, setCurrentShlokaId] = useState<number | null>(null);

  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handleStartReflection = () => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setCurrentState("reflection");
  };

  const handleGoHome = () => {
    setCurrentState("home");
    setSessionId("");
    setCurrentShlokaId(null);
  };

  const handleShowShloka = (shlokaId: number) => {
    setCurrentShlokaId(shlokaId);
    setCurrentState("shloka");
  };

  const handleStartNewReflection = () => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setCurrentShlokaId(null);
    setCurrentState("reflection");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        
        {currentState === "home" && (
          <Home onStartReflection={handleStartReflection} />
        )}
        
        {currentState === "reflection" && (
          <Reflection
            sessionId={sessionId}
            onGoHome={handleGoHome}
            onShowShloka={handleShowShloka}
          />
        )}
        
        {currentState === "shloka" && currentShlokaId && (
          <ShlokaDisplay
            shlokaId={currentShlokaId}
            onGoHome={handleGoHome}
            onStartNewReflection={handleStartNewReflection}
          />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

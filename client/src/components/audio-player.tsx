import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

interface AudioPlayerProps {
  text: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
}

export function AudioPlayer({ text, onPlay, onPause, onEnd }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setIsSupported(true);
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const playAudio = () => {
    if (!synthRef.current || !isSupported) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7; // Slow and calm
    utterance.pitch = 0.9;
    utterance.volume = 0.8;
    
    // Try to use a calm, deeper voice
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('David') || 
      voice.name.includes('Alex') ||
      voice.name.includes('Google') ||
      voice.lang.includes('en')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      onPlay?.();
    };

    utterance.onend = () => {
      setIsPlaying(false);
      onEnd?.();
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      console.error('Speech synthesis error');
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const pauseAudio = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsPlaying(false);
      onPause?.();
    }
  };

  const replayAudio = () => {
    pauseAudio();
    setTimeout(() => playAudio(), 100);
  };

  if (!isSupported) {
    return (
      <div className="text-center text-gray-500 text-sm">
        Audio playback not supported in this browser
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-4">
      {!isPlaying ? (
        <Button 
          onClick={playAudio}
          className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-500 text-white"
        >
          <Play className="w-4 h-4 mr-2" />
          Play Shloka
        </Button>
      ) : (
        <Button 
          onClick={pauseAudio}
          variant="outline"
          className="border-orange-300 text-orange-600 hover:bg-orange-50"
        >
          <Pause className="w-4 h-4 mr-2" />
          Pause
        </Button>
      )}
      
      <Button 
        onClick={replayAudio}
        variant="outline"
        className="border-orange-300 text-orange-600 hover:bg-orange-50"
        disabled={isPlaying}
      >
        <RotateCcw className="w-4 h-4 mr-2" />
        Replay
      </Button>
    </div>
  );
}

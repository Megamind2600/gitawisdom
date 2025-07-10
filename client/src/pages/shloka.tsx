import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AudioPlayer } from "@/components/audio-player";
import { ProgressBar } from "@/components/progress-bar";
import { Home, RotateCcw, Star, Book } from "lucide-react";
import type { Chapter, Shloka } from "@/lib/types";

interface ShlokaProps {
  shlokaId: number;
  onGoHome: () => void;
  onStartNewReflection: () => void;
}

export default function ShlokaDisplay({ shlokaId, onGoHome, onStartNewReflection }: ShlokaProps) {
  const { data, isLoading, error } = useQuery<{shloka: Shloka; chapter: Chapter}>({
    queryKey: ["/api/shlokas", shlokaId],
    enabled: !!shlokaId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🕉️</div>
          <p className="text-gray-600">Preparing your shloka...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-gray-600">Unable to load shloka. Please try again.</p>
          <Button onClick={onGoHome} className="mt-4">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const { shloka, chapter } = data;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-orange-500 text-xl">🕉️</span>
              <span className="font-serif font-semibold text-gray-800">Your Reflection</span>
            </div>
            <div className="flex items-center space-x-4">
              <ProgressBar percentage={100} />
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

      {/* Shloka Container */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Journey Complete Message */}
        <div className="text-center mb-8">
          <Star className="w-12 h-12 text-amber-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2 font-serif">Your Reflection Journey is Complete</h2>
          <p className="text-gray-600">Here is a shloka that resonates with your inner exploration</p>
        </div>

        {/* Shloka Card */}
        <Card className="overflow-hidden border border-orange-100 shadow-xl">
          {/* Chapter Info */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold font-serif">Chapter {chapter.chapterNumber}: {chapter.title}</h3>
                <p className="text-orange-100 text-sm">Verse {chapter.chapterNumber}.{shloka.verseNumber}</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <Book className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Sanskrit Shloka */}
          <div className="p-6 bg-gradient-to-b from-orange-50 to-white">
            <div className="text-center">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Sanskrit Shloka</h4>
              <p className="text-2xl leading-relaxed text-gray-800 mb-6 font-serif">
                {shloka.transliteration.split(' ').map((word, index) => (
                  <span key={index} className="inline-block mr-2 mb-1">
                    {word}
                  </span>
                ))}
              </p>
              
              {/* Audio Controls */}
              <div className="mb-6">
                <AudioPlayer 
                  text={`${shloka.transliteration}. ${shloka.translation}`}
                />
              </div>
            </div>
          </div>

          {/* English Translation */}
          <div className="p-6 border-t border-orange-100">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">English Translation</h4>
            <p className="text-gray-700 leading-relaxed text-lg">
              {shloka.translation}
            </p>
          </div>

          {/* Word Meanings */}
          {shloka.wordMeanings && shloka.wordMeanings.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-orange-100">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Word Meanings</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {shloka.wordMeanings.map((meaning, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <span className="font-medium text-orange-500 font-serif">{meaning.sanskrit}</span>
                    <span className="text-gray-600">—</span>
                    <span className="text-gray-700">{meaning.english}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Purport */}
          {shloka.purport && (
            <div className="p-6 border-t border-orange-100">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Purport</h4>
              <p className="text-gray-700 leading-relaxed">
                {shloka.purport}
              </p>
            </div>
          )}

          {/* Attribution */}
          <div className="p-4 bg-gray-100 border-t border-orange-100">
            <p className="text-center text-sm text-gray-600 flex items-center justify-center">
              <Book className="w-4 h-4 mr-2" />
              From "Bhagavad Gita As It Is" by A.C. Bhaktivedanta Swami Prabhupada (1972 Edition)
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button
            onClick={onStartNewReflection}
            className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-500 text-white font-semibold transform hover:scale-105 transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            New Reflection
          </Button>
          <Button
            variant="outline"
            onClick={onGoHome}
            className="bg-white hover:bg-gray-50 text-gray-700 font-semibold border-gray-300 hover:border-gray-400"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </Button>
        </div>
      </div>
    </div>
  );
}

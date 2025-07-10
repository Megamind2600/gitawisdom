import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, Book, MessageCircle, HelpCircle, Route, Scroll } from "lucide-react";

interface HomeProps {
  onStartReflection: () => void;
}

export default function Home({ onStartReflection }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 to-amber-600 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">🕉️</div>
              <h1 className="text-2xl font-bold font-serif">Gita Reflection</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <span className="text-sm opacity-90">Self-Guided Wisdom</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="text-6xl mb-6">🪷</div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 font-serif">
                Journey Within Through Timeless Wisdom
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                A space for self-guided reflection using the profound teachings of the Bhagavad Gita
              </p>
            </div>

            {/* Important Disclaimers */}
            <Card className="mb-8 border-l-4 border-orange-500">
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-3 gap-6 text-left">
                  <div className="flex items-start space-x-3">
                    <Heart className="w-5 h-5 text-pink-500 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">No Advice Given</h3>
                      <p className="text-sm text-gray-600">This app does not offer advice. We encourage your own introspection and reflection.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Shield className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Anonymous & Private</h3>
                      <p className="text-sm text-gray-600">Your data is not stored. All conversations remain completely anonymous.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Book className="w-5 h-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">Authentic Source</h3>
                      <p className="text-sm text-gray-600">All verses sourced from Prabhupada's 1972 "Bhagavad Gita As It Is" edition.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={onStartReflection}
              className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-amber-600 hover:to-orange-500 text-white font-semibold py-4 px-8 rounded-full text-lg transform hover:scale-105 transition-all duration-300"
            >
              Begin Your Reflection Journey
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 font-serif">Your Reflection Journey</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-amber-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Share Your Feelings</h3>
              <p className="text-sm text-gray-600">Express how you're feeling in your own words</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-800 to-blue-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Thoughtful Questions</h3>
              <p className="text-sm text-gray-600">Gentle questions to help you explore deeper</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-pink-500 to-pink-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Route className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Guided Reflection</h3>
              <p className="text-sm text-gray-600">Progress through your inner journey at your pace</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-amber-600 to-yellow-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Scroll className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Discover Wisdom</h3>
              <p className="text-sm text-gray-600">Receive a relevant shloka with deep meanings</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-blue-800 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">🕉️</div>
                <h3 className="text-xl font-bold font-serif">Gita Reflection</h3>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                A sacred space for self-guided reflection through the timeless wisdom of the Bhagavad Gita.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Our Promise</h4>
              <ul className="space-y-2 text-blue-100 text-sm">
                <li className="flex items-center"><span className="mr-2">✓</span>No advice given - only reflection</li>
                <li className="flex items-center"><span className="mr-2">✓</span>Complete privacy & anonymity</li>
                <li className="flex items-center"><span className="mr-2">✓</span>Authentic Prabhupada translations</li>
                <li className="flex items-center"><span className="mr-2">✓</span>Compassionate guidance</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Source</h4>
              <p className="text-blue-100 text-sm leading-relaxed">
                All Sanskrit verses, translations, and word meanings are sourced from 
                <strong> "Bhagavad Gita As It Is"</strong> by A.C. Bhaktivedanta Swami Prabhupada, 1972 Edition.
              </p>
            </div>
          </div>
          <div className="border-t border-blue-700 mt-8 pt-6 text-center">
            <p className="text-blue-200 text-sm">
              © 2024 Gita Reflection. Made with reverence for ancient wisdom.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

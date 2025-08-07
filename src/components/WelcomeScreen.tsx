import { BookOpen, MessageCircle, Sparkles, ArrowRight, FlaskConical, Calculator, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onSolvePastPapers: () => void;
  onAskQuestions: () => void;
  onNewChat: () => void;
}

const WelcomeScreen = ({ onSolvePastPapers, onAskQuestions, onNewChat }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] text-center px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50"></div>
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-200/30 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-pink-200/30 rounded-full blur-2xl animate-bounce"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-200/30 rounded-full blur-xl animate-pulse"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                <FlaskConical className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-3 h-3 text-yellow-800" />
              </div>
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
                ChemBot
              </h1>
              <p className="text-xl text-gray-600 font-medium">AI Chemistry Assistant</p>
            </div>
          </div>
          
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
            Your intelligent companion for mastering chemistry. Get instant help with reactions, 
            calculations, past papers, and complex chemical concepts.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Past Papers Card */}
          <div 
            className="group relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-scale-in"
            onClick={onSolvePastPapers}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors">
                Solve Past Papers
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Access and solve chemistry past papers with step-by-step solutions and detailed explanations.
              </p>
              
              <div className="flex items-center text-purple-600 font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Ask Questions Card */}
          <div 
            className="group relative bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer animate-scale-in"
            onClick={onAskQuestions}
            style={{ animationDelay: '0.1s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-red-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-700 transition-colors">
                Ask Questions
              </h3>
              <p className="text-gray-600 text-base leading-relaxed mb-6">
                Get instant answers to your chemistry questions with explanations and chemical equations.
              </p>
              
              <div className="flex items-center text-red-600 font-semibold group-hover:gap-3 gap-2 transition-all duration-300">
                <span>Start Chatting</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* Features Row */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80">
            <Calculator className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Calculations</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80">
            <FlaskConical className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Reactions</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/80">
            <FileText className="w-8 h-8 text-pink-600 mb-2" />
            <span className="text-sm font-medium text-gray-700">Concepts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
import { BookOpen, MessageCircleQuestion } from 'lucide-react';

interface WelcomeScreenProps {
  onSolvePastPapers: () => void;
  onAskQuestions: () => void;
}

const WelcomeScreen = ({ onSolvePastPapers, onAskQuestions }: WelcomeScreenProps) => {
  return (
    <div className="text-center max-w-2xl mx-auto animate-enter">
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">
          How can I help you today?
        </h2>
        <p className="text-xl text-gray-600">
          Choose your learning approach
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <button
          onClick={onSolvePastPapers}
          className="group p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-chemistry-blue hover:shadow-xl transition-all duration-300 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-chemistry-blue to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Solve Past Papers</h3>
          <p className="text-gray-600 leading-relaxed">
            Get step-by-step solutions for specific exam questions
          </p>
        </button>

        <button
          onClick={onAskQuestions}
          className="group p-8 bg-white rounded-2xl border-2 border-gray-200 hover:border-chemistry-green hover:shadow-xl transition-all duration-300 text-center"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-chemistry-green to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <MessageCircleQuestion className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Ask Questions</h3>
          <p className="text-gray-600 leading-relaxed">
            Get help with concepts, homework, or general questions
          </p>
        </button>
      </div>

    </div>
  );
};

export default WelcomeScreen;
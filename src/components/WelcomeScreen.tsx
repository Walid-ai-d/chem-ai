import { BookOpen, MessageCircleQuestion } from 'lucide-react';

interface WelcomeScreenProps {
  onSolvePastPapers: () => void;
  onAskQuestions: () => void;
  onNewChat: () => void;
}

const WelcomeScreen = ({ onSolvePastPapers, onAskQuestions }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      <div className="text-center space-y-3">
        <h2 className="text-2xl font-semibold text-foreground">
          How can I help you today?
        </h2>
        <p className="text-sm text-muted-foreground">
          Choose how you'd like to get started
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <button
          onClick={onSolvePastPapers}
          className="group flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:bg-accent/50 transition-all duration-200"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-medium text-foreground mb-1">Past Papers</h3>
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Solve specific exam questions
          </p>
        </button>

        <button
          onClick={onAskQuestions}
          className="group flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border hover:border-primary/50 hover:bg-accent/50 transition-all duration-200"
        >
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
            <MessageCircleQuestion className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-medium text-foreground mb-1">Ask Questions</h3>
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            Get help with concepts
          </p>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
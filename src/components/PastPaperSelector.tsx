import { useState, useEffect } from 'react';
import { ChevronLeft, ArrowRight, Calendar, BookOpen, FileText, Hash, MoreHorizontal, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PastPaperSelectorProps {
  onComplete: (selection: {
    year: string;
    session: string;
    paperNumber: string;
    variant: string;
    questionNumber: string;
    subpart?: string;
  }) => void;
  onBack: () => void;
}

type Step = 'year' | 'session' | 'paper' | 'variant' | 'question' | 'subpart';

const PastPaperSelector = ({ onComplete, onBack }: PastPaperSelectorProps) => {
  const [currentStep, setCurrentStep] = useState<Step>('year');
  const [selection, setSelection] = useState({
    year: '',
    session: '',
    paperNumber: '',
    variant: '',
    questionNumber: '',
    subpart: ''
  });

  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];
  const sessions = [
    { value: 'may-june', label: 'May/June', icon: '🌸' },
    { value: 'oct-nov', label: 'Oct/Nov', icon: '🍂' },
    { value: 'feb-march', label: 'Feb/March', icon: '❄️' }
  ];
  const papers = ['1', '2', '3', '4', '5'];
  const variants = ['1', '2', '3'];

  const stepTitles = {
    year: 'Select Year',
    session: 'Select Session',
    paper: 'Choose Paper',
    variant: 'Choose Variant',
    question: 'Question Number',
    subpart: 'Subpart (Optional)'
  };

  const stepIcons = {
    year: Calendar,
    session: BookOpen,
    paper: FileText,
    variant: Hash,
    question: Hash,
    subpart: MoreHorizontal
  };

  // Auto-progression logic
  useEffect(() => {
    const steps: Step[] = ['year', 'session', 'paper', 'variant', 'question', 'subpart'];
    const currentIndex = steps.indexOf(currentStep);
    
    const autoProgress = () => {
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1]);
      } else if (currentStep === 'subpart') {
        // Auto-complete if we're at the last step
        onComplete(selection);
      }
    };

    // Auto-progress after selection with delay for better UX
    if (currentStep === 'year' && selection.year) {
      setTimeout(autoProgress, 800);
    } else if (currentStep === 'session' && selection.session) {
      setTimeout(autoProgress, 800);
    } else if (currentStep === 'paper' && selection.paperNumber) {
      setTimeout(autoProgress, 800);
    } else if (currentStep === 'variant' && selection.variant) {
      setTimeout(autoProgress, 800);
    } else if (currentStep === 'question' && selection.questionNumber) {
      setTimeout(autoProgress, 800);
    }
  }, [selection, currentStep, onComplete]);

  const handleBack = () => {
    const steps: Step[] = ['year', 'session', 'paper', 'variant', 'question', 'subpart'];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1]);
    } else {
      onBack();
    }
  };

  const handleSkip = () => {
    onComplete(selection);
  };

  const renderProgressBar = () => {
    const steps: Step[] = ['year', 'session', 'paper', 'variant', 'question', 'subpart'];
    const currentIndex = steps.indexOf(currentStep);
    
    return (
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-3">
          {steps.map((step, index) => {
            const Icon = stepIcons[step];
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={step} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isCompleted
                      ? 'bg-gradient-to-r from-chemistry-green to-green-500 text-white scale-105'
                      : isCurrent
                      ? 'bg-gradient-to-r from-chemistry-blue to-blue-500 text-white scale-110 shadow-lg'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-1 mx-2 rounded-full transition-all duration-500 ${
                      isCompleted ? 'bg-chemistry-green' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={handleBack}
          className="p-3 hover:bg-accent rounded-full transition-all duration-200 hover:scale-105"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-chemistry-blue to-chemistry-purple bg-clip-text text-transparent">
            {stepTitles[currentStep]}
          </h2>
          <p className="text-muted-foreground mt-1">Step {['year', 'session', 'paper', 'variant', 'question', 'subpart'].indexOf(currentStep) + 1} of 6</p>
        </div>
      </div>

      {renderProgressBar()}

      {/* Content */}
      <div className="bg-card rounded-3xl p-8 shadow-xl border border-border min-h-[300px] animate-scale-in">
        {currentStep === 'year' && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {years.map((year, index) => (
              <button
                key={year}
                onClick={() => setSelection({ ...selection, year })}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in ${
                  selection.year === year
                    ? 'border-chemistry-blue bg-gradient-to-r from-chemistry-blue/10 to-blue-500/10 text-chemistry-blue'
                    : 'border-border hover:border-chemistry-blue/50 bg-background'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Calendar className="w-6 h-6 mx-auto mb-2" />
                <div className="text-xl font-bold">{year}</div>
              </button>
            ))}
          </div>
        )}

        {currentStep === 'session' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sessions.map((session, index) => (
              <button
                key={session.value}
                onClick={() => setSelection({ ...selection, session: session.value })}
                className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in ${
                  selection.session === session.value
                    ? 'border-chemistry-green bg-gradient-to-r from-chemistry-green/10 to-green-500/10 text-chemistry-green'
                    : 'border-border hover:border-chemistry-green/50 bg-background'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl mb-4">{session.icon}</div>
                <div className="text-xl font-bold">{session.label}</div>
              </button>
            ))}
          </div>
        )}

        {currentStep === 'paper' && (
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            {papers.map((paper, index) => (
              <button
                key={paper}
                onClick={() => setSelection({ ...selection, paperNumber: paper })}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in ${
                  selection.paperNumber === paper
                    ? 'border-chemistry-orange bg-gradient-to-r from-chemistry-orange/10 to-orange-500/10 text-chemistry-orange'
                    : 'border-border hover:border-chemistry-orange/50 bg-background'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <FileText className="w-6 h-6 mx-auto mb-2" />
                <div className="text-xl font-bold">Paper {paper}</div>
              </button>
            ))}
          </div>
        )}

        {currentStep === 'variant' && (
          <div className="grid grid-cols-3 gap-6">
            {variants.map((variant, index) => (
              <button
                key={variant}
                onClick={() => setSelection({ ...selection, variant })}
                className={`p-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in ${
                  selection.variant === variant
                    ? 'border-chemistry-purple bg-gradient-to-r from-chemistry-purple/10 to-purple-500/10 text-chemistry-purple'
                    : 'border-border hover:border-chemistry-purple/50 bg-background'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Hash className="w-6 h-6 mx-auto mb-2" />
                <div className="text-xl font-bold">Variant {variant}</div>
              </button>
            ))}
          </div>
        )}

        {currentStep === 'question' && (
          <div className="max-w-md mx-auto">
            <div className="mb-6 text-center">
              <Hash className="w-8 h-8 mx-auto mb-2 text-chemistry-blue" />
              <p className="text-muted-foreground">Enter the question number</p>
            </div>
            <Input
              type="text"
              placeholder="e.g., 1, 2, 3..."
              value={selection.questionNumber}
              onChange={(e) => setSelection({ ...selection, questionNumber: e.target.value })}
              className="text-center text-xl py-6 rounded-xl border-2 focus:border-chemistry-blue"
              autoFocus
            />
          </div>
        )}

        {currentStep === 'subpart' && (
          <div className="max-w-md mx-auto">
            <div className="mb-6 text-center">
              <MoreHorizontal className="w-8 h-8 mx-auto mb-2 text-chemistry-green" />
              <p className="text-muted-foreground">Enter subpart (optional)</p>
            </div>
            <Input
              type="text"
              placeholder="e.g., a, b, c, i, ii..."
              value={selection.subpart}
              onChange={(e) => setSelection({ ...selection, subpart: e.target.value })}
              className="text-center text-xl py-6 rounded-xl border-2 focus:border-chemistry-green"
              autoFocus
            />
            <div className="flex gap-4 mt-8 justify-center">
              <Button
                onClick={handleSkip}
                variant="outline"
                className="flex items-center gap-2 px-8"
              >
                Skip & Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                onClick={() => onComplete(selection)}
                className="flex items-center gap-2 px-8"
              >
                Complete
                <Check className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PastPaperSelector;
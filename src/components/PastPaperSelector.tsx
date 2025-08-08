import { useState, useEffect } from 'react';
import { ChevronLeft, ArrowRight, Calendar, BookOpen, FileText, Hash, MoreHorizontal, Check, ChevronRight } from 'lucide-react';
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
    { value: 'may-june', label: 'May/June' },
    { value: 'oct-nov', label: 'Oct/Nov' },
    { value: 'feb-march', label: 'Feb/March' }
  ];
  // Dynamic options per session rules
  const basePapers = ['1', '2', '3', '4', '5'];
  const papers = selection.session === 'feb-march' ? ['1', '2', '4', '5'] : basePapers;
  const variants = selection.session === 'feb-march' ? ['2'] : ['1', '2', '3'];

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

  // Auto-progression logic with dynamic steps and subpart rules
  useEffect(() => {
    const allowsSubpart = ['2', '4', '5'].includes(selection.paperNumber);
    const steps: Step[] = ['year', 'session', 'paper', 'variant', 'question', ...(allowsSubpart ? ['subpart'] as Step[] : [])];
    const currentIndex = steps.indexOf(currentStep);

    const autoProgress = () => {
      if (currentIndex < steps.length - 1) {
        setCurrentStep(steps[currentIndex + 1]);
      } else if (currentStep === 'subpart' || (!allowsSubpart && currentStep === 'question')) {
        onComplete(selection);
      }
    };

    // Auto-progress after selection with shorter delay
    if (currentStep === 'year' && selection.year) {
      setTimeout(autoProgress, 600);
    } else if (currentStep === 'session' && selection.session) {
      setTimeout(autoProgress, 600);
    } else if (currentStep === 'paper' && selection.paperNumber) {
      setTimeout(autoProgress, 600);
    } else if (currentStep === 'variant' && selection.variant) {
      setTimeout(autoProgress, 600);
    } else if (currentStep === 'question' && selection.questionNumber) {
      setTimeout(autoProgress, 600);
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
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center gap-2">
          {steps.map((step, index) => {
            const Icon = stepIcons[step];
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            
            return (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isCompleted
                      ? 'bg-blue-500 text-white'
                      : isCurrent
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-6 h-px mx-1 transition-all duration-300 ${
                      isCompleted ? 'bg-blue-500' : 'bg-gray-200'
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
    <div className="max-w-3xl mx-auto animate-fade-in">
      {/* Minimal Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">
            {stepTitles[currentStep]}
          </h2>
          <p className="text-sm text-gray-500">{selection.session === 'feb-march' ? 'Feb/March: only Variant 2 and Papers 1,2,4,5' : ''}</p>
        </div>
      </div>

      {renderProgressBar()}

      {/* Compact Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm animate-scale-in">
        {currentStep === 'year' && (
          <div className="grid grid-cols-5 gap-3">
            {years.map((year, index) => (
              <button
                key={year}
                onClick={() => setSelection({ ...selection, year })}
                className={`p-4 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 animate-fade-in ${
                  selection.year === year
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {year}
              </button>
            ))}
          </div>
        )}

        {currentStep === 'session' && (
          <div className="grid grid-cols-3 gap-4">
            {sessions.map((session, index) => (
              <button
                key={session.value}
                onClick={() => setSelection({ ...selection, session: session.value })}
                className={`p-4 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 animate-fade-in ${
                  selection.session === session.value
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <BookOpen className="w-4 h-4 mx-auto mb-2" />
                {session.label}
              </button>
            ))}
          </div>
        )}

        {currentStep === 'paper' && (
          <div className="grid grid-cols-5 gap-3">
            {papers.map((paper, index) => (
              <button
                key={paper}
                onClick={() => setSelection({ ...selection, paperNumber: paper })}
                className={`p-4 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 animate-fade-in ${
                  selection.paperNumber === paper
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <FileText className="w-4 h-4 mx-auto mb-1" />
                Paper {paper}
              </button>
            ))}
          </div>
        )}

        {currentStep === 'variant' && (
          <div className="grid grid-cols-3 gap-4">
            {variants.map((variant, index) => (
              <button
                key={variant}
                onClick={() => setSelection({ ...selection, variant })}
                className={`p-4 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 animate-fade-in ${
                  selection.variant === variant
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <Hash className="w-4 h-4 mx-auto mb-2" />
                Variant {variant}
              </button>
            ))}
          </div>
        )}

        {currentStep === 'question' && (
          <div className="max-w-xs mx-auto">
            <div className="mb-4 text-center">
              <Hash className="w-5 h-5 mx-auto mb-1 text-blue-500" />
              <p className="text-sm text-gray-600">Question number</p>
            </div>
            <Input
              type="text"
              placeholder="e.g., 1, 2, 3..."
              value={selection.questionNumber}
              onChange={(e) => setSelection({ ...selection, questionNumber: e.target.value })}
              className="text-center text-lg py-3 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              autoFocus
            />
          </div>
        )}

        {currentStep === 'subpart' && (
          <div className="max-w-xs mx-auto">
            <div className="mb-4 text-center">
              <MoreHorizontal className="w-5 h-5 mx-auto mb-1 text-blue-500" />
              <p className="text-sm text-gray-600">Subpart (optional)</p>
            </div>
            <Input
              type="text"
              placeholder="e.g., a, b, c, i, ii..."
              value={selection.subpart}
              onChange={(e) => setSelection({ ...selection, subpart: e.target.value })}
              className="text-center text-lg py-3 rounded-lg border focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              autoFocus
            />
            <div className="flex gap-3 mt-6 justify-center">
              <Button
                onClick={handleSkip}
                variant="outline"
                className="flex items-center gap-2 text-sm"
                size="sm"
              >
                Skip
                <ArrowRight className="w-3 h-3" />
              </Button>
              <Button
                onClick={() => onComplete(selection)}
                className="flex items-center gap-2 text-sm"
                size="sm"
              >
                Complete
                <Check className="w-3 h-3" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PastPaperSelector;
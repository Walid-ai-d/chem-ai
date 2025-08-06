import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PastPaperSelectorProps {
  onComplete: (selection: {
    year: string;
    session: string;
    paperNumber: string;
    questionNumber: string;
    subpart?: string;
  }) => void;
  onBack: () => void;
}

type Step = 'year' | 'session' | 'paper' | 'question' | 'subpart';

const PastPaperSelector = ({ onComplete, onBack }: PastPaperSelectorProps) => {
  const [currentStep, setCurrentStep] = useState<Step>('year');
  const [selection, setSelection] = useState({
    year: '',
    session: '',
    paperNumber: '',
    questionNumber: '',
    subpart: ''
  });

  const years = ['2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];
  const sessions = [
    { value: 'may-june', label: 'May/June' },
    { value: 'oct-nov', label: 'Oct/Nov' },
    { value: 'feb-march', label: 'Feb/March' }
  ];

  const stepTitles = {
    year: 'Select Year',
    session: 'Select Session',
    paper: 'Enter Paper Number',
    question: 'Enter Question Number',
    subpart: 'Enter Subpart (Optional)'
  };

  const handleNext = () => {
    const steps: Step[] = ['year', 'session', 'paper', 'question', 'subpart'];
    const currentIndex = steps.indexOf(currentStep);
    
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1]);
    } else {
      onComplete(selection);
    }
  };

  const handleBack = () => {
    const steps: Step[] = ['year', 'session', 'paper', 'question', 'subpart'];
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

  const canProceed = () => {
    switch (currentStep) {
      case 'year': return !!selection.year;
      case 'session': return !!selection.session;
      case 'paper': return !!selection.paperNumber;
      case 'question': return !!selection.questionNumber;
      case 'subpart': return true; // Optional step
      default: return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Step Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-3xl font-bold text-gray-800">
            {stepTitles[currentStep]}
          </h2>
        </div>
        
        {/* Progress Indicator */}
        <div className="flex items-center gap-2">
          {['year', 'session', 'paper', 'question', 'subpart'].map((step, index) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                  step === currentStep
                    ? 'bg-gradient-to-r from-chemistry-red to-primary text-white'
                    : steps.indexOf(currentStep) > index
                    ? 'bg-chemistry-green text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {index + 1}
              </div>
              {index < 4 && (
                <div className={`w-8 h-1 mx-1 ${
                  steps.indexOf(currentStep) > index ? 'bg-chemistry-green' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 min-h-[400px]">
        {currentStep === 'year' && (
          <div className="selection-grid">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelection({ ...selection, year })}
                className={`selection-button ${
                  selection.year === year ? 'selected' : ''
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        )}

        {currentStep === 'session' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <button
                key={session.value}
                onClick={() => setSelection({ ...selection, session: session.value })}
                className={`selection-button ${
                  selection.session === session.value ? 'selected' : ''
                }`}
              >
                {session.label}
              </button>
            ))}
          </div>
        )}

        {currentStep === 'paper' && (
          <div>
            <p className="text-gray-600 mb-4">
              Valid options: 1, 21-23, 31-33, 41-43, 51-53
            </p>
            <Input
              type="text"
              placeholder="e.g., 21, 32, 43"
              value={selection.paperNumber}
              onChange={(e) => setSelection({ ...selection, paperNumber: e.target.value })}
              className="chemistry-input max-w-md"
            />
          </div>
        )}

        {currentStep === 'question' && (
          <div>
            <Input
              type="text"
              placeholder="e.g., 1, 2, 3"
              value={selection.questionNumber}
              onChange={(e) => setSelection({ ...selection, questionNumber: e.target.value })}
              className="chemistry-input max-w-md"
            />
          </div>
        )}

        {currentStep === 'subpart' && (
          <div>
            <Input
              type="text"
              placeholder="e.g., a, b, c, i, ii"
              value={selection.subpart}
              onChange={(e) => setSelection({ ...selection, subpart: e.target.value })}
              className="chemistry-input max-w-md"
            />
            <div className="flex gap-4 mt-6">
              <Button
                onClick={handleSkip}
                variant="outline"
                className="flex items-center gap-2"
              >
                Skip
              </Button>
              <Button
                onClick={handleNext}
                className="flex items-center gap-2"
                disabled={!canProceed()}
              >
                Complete
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            return;
          </div>
        )}

        {currentStep !== 'subpart' && (
          <div className="flex justify-end mt-8">
            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
              disabled={!canProceed()}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const steps: Step[] = ['year', 'session', 'paper', 'question', 'subpart'];

export default PastPaperSelector;
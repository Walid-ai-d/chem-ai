import { ReactNode } from 'react';
import { FlaskConical, User } from 'lucide-react';

interface ChatMessageProps {
  isBot?: boolean;
  children: ReactNode;
  timestamp?: string;
}

const ChatMessage = ({ isBot = true, children, timestamp }: ChatMessageProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-start gap-3">
        {isBot ? (
          <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-r from-chemistry-red to-primary">
            <FlaskConical className="w-5 h-5 text-white" />
          </div>
        ) : (
          <div className="w-10 h-10 bg-chemistry-blue rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-gray-800">
              {isBot ? 'ChemBot' : 'You'}
            </span>
            {timestamp && (
              <span className="text-xs text-gray-500">{timestamp}</span>
            )}
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
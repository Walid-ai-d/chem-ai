import { FlaskConical } from 'lucide-react';

const ChemBotHeader = () => {
  return (
    <div className="chat-header">
      <div className="flex items-center gap-4 mb-4">
        <div className="chat-bot-avatar">
          <FlaskConical className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-chemistry-red to-primary bg-clip-text text-transparent">
            ChemBot
          </h1>
          <p className="text-gray-600 text-lg">AI Tutor • Online</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span>Ready to help with chemistry problems</span>
      </div>
    </div>
  );
};

export default ChemBotHeader;
import { useState } from 'react';
import { ChevronLeft, Plus, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHistory {
  id: string;
  title: string;
  subtitle: string;
  timestamp: string;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
}

const Sidebar = ({ isOpen, onToggle, onNewChat }: SidebarProps) => {
  const [chatHistory] = useState<ChatHistory[]>([
    {
      id: '1',
      title: 'New Conversation',
      subtitle: 'Great! I\'ll help you solve past paper questi...',
      timestamp: '06/08/2025'
    },
    {
      id: '2',
      title: 'New Conversation',
      subtitle: 'Hi! I\'m ChemBot, your chemistry AI tutor. I...',
      timestamp: '06/08/2025'
    },
    {
      id: '3',
      title: 'New Conversation',
      subtitle: 'Great! I\'ll help you solve past paper questi...',
      timestamp: '06/08/2025'
    },
    {
      id: '4',
      title: 'solve oct/nov 2018 paper 21 q 2 a',
      subtitle: 'Great! I\'ll help you solve past paper questi...',
      timestamp: '06/08/2025'
    },
    {
      id: '5',
      title: 'solve oct/nov 2018 paper 21 q 2 a',
      subtitle: 'Great! I\'ll help you solve past paper questi...',
      timestamp: '06/08/2025'
    },
    {
      id: '6',
      title: 'New Conversation',
      subtitle: 'Great! I\'ll help you solve past paper questi...',
      timestamp: '06/08/2025'
    },
    {
      id: '7',
      title: 'New Conversation',
      subtitle: 'Hi! I\'m ChemBot, your chemistry AI tutor. I...',
      timestamp: '06/08/2025'
    }
  ]);

  if (!isOpen) {
    return (
      <div className="fixed left-4 top-4 z-50">
        <Button
          onClick={onToggle}
          variant="outline"
          size="icon"
          className="bg-white shadow-lg"
        >
          <FlaskConical className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-80 bg-secondary text-secondary-foreground shadow-2xl">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-chemistry-red to-primary rounded-md flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-white">ChemBot</span>
          </div>
          <Button
            onClick={onToggle}
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
        </div>
        
        <Button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border-white/20"
          variant="outline"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      {/* Chat History */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
            Recent Chats
          </h3>
          <div className="space-y-2">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors group"
              >
                <h4 className="text-white font-medium text-sm mb-1 truncate">
                  {chat.title}
                </h4>
                <p className="text-gray-400 text-xs truncate mb-1">
                  {chat.subtitle}
                </p>
                <span className="text-gray-500 text-xs">
                  General • {chat.timestamp}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
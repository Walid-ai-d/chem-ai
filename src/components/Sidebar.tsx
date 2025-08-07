import { useState } from 'react';
import { X, Plus, FlaskConical, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHistory {
  id: string;
  title: string;
  timestamp: string;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
}

const Sidebar = ({ isOpen, onToggle, onNewChat }: SidebarProps) => {
  const [chatHistory] = useState<ChatHistory[]>([
    { id: '1', title: 'Chemical Equilibrium Problem', timestamp: '2m ago' },
    { id: '2', title: 'Organic Reactions Help', timestamp: '1h ago' },
    { id: '3', title: 'Past Paper Oct/Nov 2018', timestamp: '3h ago' },
    { id: '4', title: 'Titration Calculations', timestamp: '1d ago' },
    { id: '5', title: 'Molecular Geometry', timestamp: '2d ago' },
  ]);

  if (!isOpen) {
    return (
      <div className="fixed left-4 top-4 z-50">
        <Button
          onClick={onToggle}
          variant="outline"
          size="icon"
          className="shadow-sm"
        >
          <MessageSquare className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onToggle}>
      <div 
        className="fixed left-4 top-1/2 -translate-y-1/2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-[600px]">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <FlaskConical className="w-4 h-4 text-white" />
                </div>
                <span className="font-semibold text-gray-900">ChemBot</span>
              </div>
              <Button
                onClick={onToggle}
                variant="ghost"
                size="icon"
                className="h-8 w-8 hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <Button
              onClick={onNewChat}
              className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-0 rounded-xl h-10"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-2">
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  className="w-full text-left p-3 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                >
                  <div className="font-medium text-gray-900 truncate mb-1 text-sm">
                    {chat.title}
                  </div>
                  <div className="text-gray-500 text-xs">
                    {chat.timestamp}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
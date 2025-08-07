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
    <div className="fixed inset-y-0 left-0 z-50 w-72 bg-background border-r border-border shadow-sm">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                <FlaskConical className="w-3 h-3 text-primary-foreground" />
              </div>
              <span className="font-medium text-foreground text-sm">ChemBot</span>
            </div>
            <Button
              onClick={onToggle}
              variant="ghost"
              size="icon"
              className="h-6 w-6"
            >
              <X className="w-3 h-3" />
            </Button>
          </div>
          
          <Button
            onClick={onNewChat}
            className="w-full h-8 text-xs"
            size="sm"
          >
            <Plus className="w-3 h-3 mr-1" />
            New Chat
          </Button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {chatHistory.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left p-2 rounded-md hover:bg-accent transition-colors group text-xs"
              >
                <div className="font-medium text-foreground truncate mb-1">
                  {chat.title}
                </div>
                <div className="text-muted-foreground">
                  {chat.timestamp}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
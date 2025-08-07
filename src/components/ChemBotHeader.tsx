import { FlaskConical, Sparkles, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChemBotHeaderProps {
  onMenuClick?: () => void;
}

const ChemBotHeader = ({ onMenuClick }: ChemBotHeaderProps) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-red-500 via-pink-500 to-purple-600">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {onMenuClick && (
            <Button
              onClick={onMenuClick}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 transition-all duration-300"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-xl">
                <FlaskConical className="w-6 h-6 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-spin" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                ChemBot
              </h1>
              <p className="text-white/80 text-sm font-medium">
                AI Chemistry Assistant
              </p>
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-2">
          <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-white/90 text-sm font-medium">Ready to help</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChemBotHeader;
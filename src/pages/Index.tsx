import { useState } from 'react';
import ChemBot from '@/components/ChemBot';
import Sidebar from '@/components/Sidebar';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNewChat = () => {
    // Reset the chat state
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNewChat={handleNewChat}
      />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-80' : 'ml-0'}`}>
        <ChemBot />
      </div>
    </div>
  );
};

export default Index;

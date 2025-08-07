import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChemBotHeader from './ChemBotHeader';
import WelcomeScreen from './WelcomeScreen';
import PastPaperSelector from './PastPaperSelector';
import ChatMessage from './ChatMessage';
import ChatDocumentParser from './ChatDocumentParser';
import ChatInput from './ChatInput';
type AppState = 'welcome' | 'selecting-paper' | 'chat';
interface ChatMessage {
  id: string;
  isBot: boolean;
  content: string;
  timestamp: string;
  imageUrl?: string;
}
const ChemBot = () => {
  const [appState, setAppState] = useState<AppState>('welcome');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const sampleChemistryContent = `
## Chemical Equilibrium Problem

**Question:** Calculate the equilibrium constant for the reaction:
$2NO_2(g) \\rightarrow N_2O_4(g)$ at 298K

**Solution:**

Given data:
- Initial concentration of $NO_2$: 0.0400 M
- Equilibrium concentration of $NO_2$: 0.0292 M
- Temperature: 298 K

Step 1: Calculate the change in concentration
$\\Delta [NO_2] = 0.0400 - 0.0292 = 0.0108$ M

Step 2: Use stoichiometry to find $[N_2O_4]$ at equilibrium
Since 2 moles of $NO_2$ form 1 mole of $N_2O_4$:
$[N_2O_4]_{eq} = \\frac{\\Delta [NO_2]}{2} = \\frac{0.0108}{2} = 0.0054$ M

Step 3: Calculate the equilibrium constant
$K_c = \\frac{[N_2O_4]}{[NO_2]^2}$

$K_c = \\frac{0.0054}{(0.0292)^2} = \\frac{0.0054}{0.000853} = 6.33$

**Answer:** The equilibrium constant $K_c = 6.33$ at 298K

Therefore, the reaction favors the formation of $N_2O_4$ at this temperature.
  `;
  const handleSolvePastPapers = () => {
    setAppState('selecting-paper');
  };
  const handleAskQuestions = () => {
    setAppState('chat');
    // Add initial bot message
    const botMessage: ChatMessage = {
      id: '1',
      isBot: true,
      content: 'Hi! I\'m ready to help you with chemistry questions. What would you like to know?',
      timestamp: '17:50'
    };
    setMessages([botMessage]);
  };
  const handleNewChat = () => {
    setAppState('welcome');
    setMessages([]);
  };
  const handlePaperSelectionComplete = (selection: any) => {
    setAppState('chat');

    // Create initial messages based on selection
    const userMessage: ChatMessage = {
      id: '1',
      isBot: false,
      content: `solve ${selection.session?.replace('-', '/')} ${selection.year} paper ${selection.paperNumber} variant ${selection.variant} q ${selection.questionNumber}${selection.subpart ? ' ' + selection.subpart : ''}`,
      timestamp: '17:51'
    };
    const botMessage: ChatMessage = {
      id: '2',
      isBot: true,
      content: `Great! I'll help you solve ${selection.session?.replace('-', '/')} ${selection.year} paper ${selection.paperNumber} variant ${selection.variant} question ${selection.questionNumber}${selection.subpart ? ' part ' + selection.subpart : ''}. Let me find the solution for you.`,
      timestamp: '17:50'
    };
    const solutionMessage: ChatMessage = {
      id: '3',
      isBot: true,
      content: sampleChemistryContent,
      timestamp: '17:52'
    };
    setMessages([botMessage, userMessage, solutionMessage]);
  };
  const handleBackFromSelector = () => {
    setAppState('welcome');
  };
  const handleSendMessage = (messageText: string, image?: File) => {
    if (!messageText.trim() && !image) return;
    
    let imageUrl: string | undefined;
    if (image) {
      imageUrl = URL.createObjectURL(image);
    }
    
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      isBot: false,
      content: messageText,
      imageUrl,
      timestamp: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        isBot: true,
        content: 'I understand your question about chemistry. Let me help you with that...',
        timestamp: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };
  return <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <ChemBotHeader />
          
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-4xl mx-auto flex flex-col">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4">
            {appState === 'welcome' && <WelcomeScreen onSolvePastPapers={handleSolvePastPapers} onAskQuestions={handleAskQuestions} onNewChat={handleNewChat} />}

            {appState === 'selecting-paper' && <PastPaperSelector onComplete={handlePaperSelectionComplete} onBack={handleBackFromSelector} />}

            {appState === 'chat' && <div className="space-y-4">
                {messages.map(message => <ChatMessage key={message.id} isBot={message.isBot} timestamp={message.timestamp} imageUrl={message.imageUrl}>
                    {message.isBot && message.content.includes('##') ? <ChatDocumentParser content={message.content} /> : <div className="text-foreground leading-relaxed">
                        {message.content}
                      </div>}
                  </ChatMessage>)}
                
                {messages.length === 0 && <div className="text-center py-12">
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      Ask me anything about chemistry!
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      I can help with reactions, calculations, concepts, and more.
                    </p>
                  </div>}
              </div>}
          </div>

          {/* Chat Input */}
          {appState === 'chat' && <ChatInput onSendMessage={handleSendMessage} />}
        </div>
      </div>
    </div>;
};
export default ChemBot;
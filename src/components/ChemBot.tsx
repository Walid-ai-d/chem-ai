import { useState } from 'react';
import ChemBotHeader from './ChemBotHeader';
import WelcomeScreen from './WelcomeScreen';
import PastPaperSelector from './PastPaperSelector';
import ChatMessage from './ChatMessage';
import ChatDocumentParser from './ChatDocumentParser';
import ChatInput from './ChatInput';

type AppState = 'welcome' | 'selecting-paper' | 'chat';

type Attachment = {
  id: string;
  type: 'image' | 'file';
  url: string;
  name: string;
};

interface ChatMessage {
  id: string;
  isBot: boolean;
  content: string;
  timestamp: string;
  attachments?: Attachment[];
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

  const handleSend = (text: string, attachments: Attachment[] = []) => {
    const ts = new Date();
    const timestamp = ts.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: ChatMessage = {
      id: `${ts.getTime()}`,
      isBot: false,
      content: text,
      timestamp,
      attachments,
    };
    setMessages((prev) => [...prev, userMessage]);
  };
  return (
    <div className="chat-container">
      <div className="max-w-6xl mx-auto p-6">
        {/* Fixed Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <ChemBotHeader />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="chat-message-container">
          <div className="chat-message-header">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-chemistry-red to-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">C</span>
              </div>
              <span className="font-semibold text-gray-700">Chemistry Assistant</span>
            </div>
          </div>
          
          <div className="p-8">
            {appState === 'welcome' && (
              <WelcomeScreen
                onSolvePastPapers={handleSolvePastPapers}
                onAskQuestions={handleAskQuestions}
              />
            )}

            {appState === 'selecting-paper' && (
              <PastPaperSelector
                onComplete={handlePaperSelectionComplete}
                onBack={handleBackFromSelector}
              />
            )}

              {appState === 'chat' && (
                <div className="max-w-4xl mx-auto">
                  {messages.map((message) => (
                    <ChatMessage
                      key={message.id}
                      isBot={message.isBot}
                      timestamp={message.timestamp}
                    >
                      {message.isBot && message.content.includes('##') ? (
                        <ChatDocumentParser content={message.content} />
                      ) : (
                        <div className="text-gray-700 leading-relaxed space-y-3">
                          {message.content && <p>{message.content}</p>}
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="flex flex-wrap gap-3">
                              {message.attachments.map((att) => (
                                <div key={att.id} className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm">
                                  {att.type === 'image' ? (
                                    // eslint-disable-next-line jsx-a11y/alt-text
                                    <img src={att.url} alt={att.name} className="h-40 w-40 object-cover rounded" loading="lazy" />
                                  ) : (
                                    <a href={att.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                                      {att.name}
                                    </a>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </ChatMessage>
                  ))}
                  {messages.length === 0 && (
                    <div className="text-center py-12">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Ask me anything about chemistry!
                      </h2>
                      <p className="text-gray-600">
                        I can help with reactions, calculations, concepts, and more.
                      </p>
                    </div>
                  )}

                  <div className="mt-6">
                    <ChatInput onSend={handleSend} />
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChemBot;
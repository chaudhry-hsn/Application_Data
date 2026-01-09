
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  AppView, 
  PMModule, 
  ChatMessage, 
  ProjectCharter, 
  Stakeholder, 
  ProjectState 
} from './types';
import { PMGeminiService } from './services/geminiService';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import CharterView from './components/CharterView';
import StakeholdersView from './components/StakeholdersView';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<AppView>(AppView.CHAT);
  const [activeModule, setActiveModule] = useState<PMModule>(PMModule.INITIATION);
  const [project, setProject] = useState<ProjectState>({
    currentCharter: null,
    stakeholders: [],
    messages: [
      {
        id: '1',
        role: 'model',
        content: "Greetings. I'm your Senior Project Management Advisor. Ready to initiate a new project or phase? Tell me about your business need or what you're looking to achieve.",
        timestamp: new Date()
      }
    ]
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const geminiRef = useRef<PMGeminiService | null>(null);

  useEffect(() => {
    geminiRef.current = new PMGeminiService();
  }, []);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !geminiRef.current) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setProject(prev => ({
      ...prev,
      messages: [...prev.messages, userMsg]
    }));
    
    setIsProcessing(true);

    try {
      const history = project.messages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }));

      const responseText = await geminiRef.current.chat(activeModule, history, text);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
        timestamp: new Date()
      };

      setProject(prev => ({
        ...prev,
        messages: [...prev.messages, botMsg]
      }));
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateCharter = async () => {
    if (!geminiRef.current) return;
    setIsProcessing(true);
    try {
      const chatHistory = project.messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
      const charter = await geminiRef.current.generateCharter(chatHistory);
      setProject(prev => ({ ...prev, currentCharter: charter }));
      setActiveView(AppView.CHARTER);
    } catch (error) {
      console.error("Charter generation error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerateStakeholders = async () => {
    if (!geminiRef.current) return;
    setIsProcessing(true);
    try {
      const chatHistory = project.messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
      const stakeholders = await geminiRef.current.generateStakeholders(chatHistory);
      setProject(prev => ({ ...prev, stakeholders }));
      setActiveView(AppView.STAKEHOLDERS);
    } catch (error) {
      console.error("Stakeholder generation error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        hasCharter={!!project.currentCharter}
        hasStakeholders={project.stakeholders.length > 0}
      />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {activeView === AppView.CHAT && (
          <ChatWindow 
            messages={project.messages} 
            onSend={handleSendMessage} 
            isProcessing={isProcessing}
            activeModule={activeModule}
            onGenerateCharter={handleGenerateCharter}
            onGenerateStakeholders={handleGenerateStakeholders}
          />
        )}
        
        {activeView === AppView.CHARTER && (
          <CharterView 
            charter={project.currentCharter} 
            onRegenerate={handleGenerateCharter}
            isProcessing={isProcessing}
          />
        )}
        
        {activeView === AppView.STAKEHOLDERS && (
          <StakeholdersView 
            stakeholders={project.stakeholders} 
            onRegenerate={handleGenerateStakeholders}
            isProcessing={isProcessing}
          />
        )}

        {isProcessing && activeView !== AppView.CHAT && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-blue-800 font-medium animate-pulse">Analyzing Project Context...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Bot, User, AlertCircle, Users } from 'lucide-react';
import { openAIService } from '@/lib/openai';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  error?: boolean;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatInterfaceProps {
  onShowLawyers?: () => void;
}

const EXAMPLE_QUESTIONS = [
  "สามารถขอหย่าร้างได้ในกรณีใดบ้าง?",
  "ขั้นตอนการทำพินัยกรรมเป็นอย่างไร?",
  "สิทธิ์ของลูกจ้างเมื่อถูกไล่ออกจากงาน",
  "การขอกู้เงินธนาคารต้องระวังอะไร?"
];

export const ChatInterface = ({ onShowLawyers }: ChatInterfaceProps = {}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'สวัสดีครับ ผมคือ Lawra ทนายความ AI ที่พร้อมให้คำปรึกษาทางกฎหมายแก่คุณ มีคำถามอะไรให้ผมช่วยเหลือไหมครับ?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Check if OpenAI is configured
    if (!openAIService.isConfigured()) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'ขออภัย ระบบ AI ยังไม่ได้รับการตั้งค่า กรุณาตั้งค่า OpenAI API key ในไฟล์ .env\n\nในขณะนี้แสดงเป็นตัวอย่างการตอบกลับ: "' + text + '" - นี่เป็นคำถามที่ดี ในระบบจริงจะมีการวิเคราะห์และให้คำแนะนำทางกฎหมายที่เหมาะสม',
        sender: 'ai',
        timestamp: new Date(),
        error: true
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
      return;
    }

    try {
      // Get AI response
      const aiResponseText = await openAIService.sendMessage(text.trim(), conversationHistory);
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      
      // Update conversation history
      setConversationHistory(prev => [
        ...prev,
        { role: 'user', content: text.trim() },
        { role: 'assistant', content: aiResponseText }
      ]);
      
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง',
        sender: 'ai',
        timestamp: new Date(),
        error: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
      console.error('Chat error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-end space-x-3 max-w-[75%] ${
              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
            }`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === 'user' 
                  ? 'bg-gradient-primary' 
                  : 'bg-secondary'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-4 h-4 text-primary-foreground" />
                ) : (
                  <Bot className="w-4 h-4 text-primary" />
                )}
              </div>

              {/* Message Bubble */}
              <div className={`relative px-4 py-3 rounded-2xl shadow-md ${
                message.sender === 'user' 
                  ? 'bg-gradient-primary text-primary-foreground rounded-br-md' 
                  : message.error
                  ? 'bg-destructive/10 border border-destructive/20 rounded-bl-md'
                  : 'bg-card border border-border rounded-bl-md'
              }`}>
                {message.error && (
                  <div className="flex items-start space-x-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span className="text-xs text-destructive font-medium">ข้อผิดพลาด</span>
                  </div>
                )}
                <p className={`text-sm leading-relaxed whitespace-pre-wrap ${
                  message.error ? 'text-destructive' : ''
                }`}>{message.text}</p>
                {/* Message tail */}
                <div className={`absolute bottom-0 w-3 h-3 ${
                  message.sender === 'user' 
                    ? 'right-0 bg-gradient-primary transform rotate-45 translate-x-1 translate-y-1' 
                    : message.error
                    ? 'left-0 bg-destructive/10 border-l border-b border-destructive/20 transform rotate-45 -translate-x-1 translate-y-1'
                    : 'left-0 bg-card border-l border-b border-border transform rotate-45 -translate-x-1 translate-y-1'
                }`}></div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end space-x-3 max-w-[75%]">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="relative px-4 py-3 bg-card border border-border rounded-2xl rounded-bl-md shadow-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <div className="absolute bottom-0 left-0 w-3 h-3 bg-card border-l border-b border-border transform rotate-45 -translate-x-1 translate-y-1"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Example Questions */}
      {messages.length === 1 && (
        <div className="p-4 border-t border-border">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">คำถามที่พบบ่อย:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {EXAMPLE_QUESTIONS.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-left h-auto p-3 justify-start"
                onClick={() => handleQuestionClick(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Lawyer Suggestion - Show when conversation has AI responses and user is not typing */}
      {messages.length > 1 && !isTyping && onShowLawyers && (
        <div className="px-4 pb-2">
          <Button
            onClick={onShowLawyers}
            variant="outline"
            size="sm"
            className="w-full bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 border-blue-200 text-blue-700 hover:text-blue-800 transition-all duration-300"
          >
            <Users className="w-4 h-4 mr-2" />
            ต้องการคำปรึกษาเพิ่มเติม? ค้นหาทนายมืออาชีพ
          </Button>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="พิมพ์คำถามของคุณที่นี่..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            className="flex-1"
          />
          <Button
            onClick={() => handleSendMessage(inputText)}
            disabled={!inputText.trim() || isTyping}
            variant="hero"
            size="icon"
            title={isTyping ? 'กำลังประมวลผล...' : 'ส่งข้อความ'}
          >
            <Send className={`w-4 h-4 ${isTyping ? 'animate-pulse' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};
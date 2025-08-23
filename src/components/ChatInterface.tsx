import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const EXAMPLE_QUESTIONS = [
  "สามารถขอหย่าร้างได้ในกรณีใดบ้าง?",
  "ขั้นตอนการทำพินัยกรรมเป็นอย่างไร?",
  "สิทธิ์ของลูกจ้างเมื่อถูกไล่ออกจากงาน",
  "การขอกู้เงินธนาคารต้องระวังอะไร?"
];

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'สวัสดีครับ ผมคือทนายความ AI ที่พร้อมให้คำปรึกษาทางกฎหมายแก่คุณ มีคำถามอะไรให้ผมช่วยเหลือไหมครับ?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `ขอบคุณสำหรับคำถาม "${text}" นี่เป็นตัวอย่างการตอบกลับจากทนาย AI ในระบบจริงจะมีการประมวลผลคำถามทางกฎหมายและให้คำแนะนำที่เหมาะสม กรุณาติดต่อทนายมืออาชีพสำหรับคำปรึกษาเฉพาะเจาะจง`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-[80%] p-4 shadow-card ${
              message.sender === 'user' 
                ? 'bg-gradient-primary text-primary-foreground' 
                : 'bg-card border-border'
            }`}>
              <div className="flex items-start space-x-2">
                {message.sender === 'ai' && (
                  <Bot className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                )}
                <p className="text-sm leading-relaxed">{message.text}</p>
                {message.sender === 'user' && (
                  <User className="w-5 h-5 text-primary-foreground mt-0.5 flex-shrink-0" />
                )}
              </div>
            </Card>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <Card className="max-w-[80%] p-4 bg-card border-border shadow-card">
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-primary" />
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </Card>
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
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
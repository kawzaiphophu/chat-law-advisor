import React, { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { ChatInterface } from '@/components/ChatInterface';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  const handleStartChat = () => {
    setShowChat(true);
  };

  const handleBackToHome = () => {
    setShowChat(false);
  };

  if (showChat) {
    return (
      <div className="min-h-screen bg-gradient-background">
        <div className="container mx-auto h-screen flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm">
            <Button 
              variant="ghost" 
              onClick={handleBackToHome}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับหน้าหลัก</span>
            </Button>
            <h1 className="text-xl font-semibold text-foreground">ปรึกษาทนาย AI</h1>
            <div className="w-20"></div>
          </div>

          {/* Chat Interface */}
          <Card className="flex-1 m-4 bg-card/80 backdrop-blur-sm border-border shadow-elegant">
            <ChatInterface />
          </Card>
        </div>
      </div>
    );
  }

  return <HeroSection onStartChat={handleStartChat} />;
};

export default Index;

import React, { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { ServicesSection } from '@/components/ServicesSection';
import { TopLawyersSection } from '@/components/TopLawyersSection';
import { ChatInterface } from '@/components/ChatInterface';
import { LawyerDashboard } from '@/components/LawyerDashboard';
import { CheckoutPage } from '@/components/CheckoutPage';
import { PaymentSuccess } from '@/components/PaymentSuccess';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MessageSquare, Users, CreditCard } from 'lucide-react';

type AppState = 'home' | 'chat' | 'lawyers' | 'checkout' | 'success';

interface Lawyer {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  pricePerHour: number;
  avatar: string;
  verified: boolean;
  responseTime: string;
}

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>('home');
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);

  const handleStartChat = () => {
    setCurrentState('chat');
  };

  const handleShowLawyers = () => {
    setCurrentState('lawyers');
  };

  const handleSelectLawyer = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setCurrentState('checkout');
  };

  const handleBackToHome = () => {
    setCurrentState('home');
    setSelectedLawyer(null);
  };

  const handleBackToLawyers = () => {
    setCurrentState('lawyers');
  };

  const handlePaymentSuccess = () => {
    setCurrentState('success');
  };

  // Navigation Header for non-home states
  const renderNavigationHeader = () => {
    if (currentState === 'home') return null;

    let title = '';
    let backAction = handleBackToHome;

    switch (currentState) {
      case 'chat':
        title = 'ปรึกษาทนาย AI';
        break;
      case 'lawyers':
        title = 'ค้นหาทนายมืออาชีพ';
        break;
      case 'checkout':
        title = 'จองการปรึกษา';
        backAction = handleBackToLawyers;
        break;
      case 'success':
        return null; // Success page handles its own navigation
    }

    return (
      <div className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={backAction}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับ</span>
            </Button>
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
            <div className="w-20"></div>
          </div>
        </div>
      </div>
    );
  };

  // Render current state
  const renderCurrentState = () => {
    switch (currentState) {
      case 'home':
        return (
          <div>
            <HeroSection onStartChat={handleStartChat} />
            <ServicesSection onStartChat={handleStartChat} onShowLawyers={handleShowLawyers} />
            <TopLawyersSection />
            {/* Trust Indicators */}
            <div className="border-t border-border bg-card/30 backdrop-blur-sm">
              <div className="container mx-auto px-4 py-8">
                <div className="text-center space-y-4">
                  <h2 className="text-2xl font-semibold text-card-foreground">
                    บริการครอบคลุมด้านกฎหมายหลากหลาย
                  </h2>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                    <span className="px-3 py-1 bg-secondary rounded-full">กฎหมายแพ่ง</span>
                    <span className="px-3 py-1 bg-secondary rounded-full">กฎหมายอาญา</span>
                    <span className="px-3 py-1 bg-secondary rounded-full">กฎหมายครอบครัว</span>
                    <span className="px-3 py-1 bg-secondary rounded-full">กฎหมายแรงงาน</span>
                    <span className="px-3 py-1 bg-secondary rounded-full">กฎหมายธุรกิจ</span>
                    <span className="px-3 py-1 bg-secondary rounded-full">และอื่นๆ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'chat':
        return (
          <div className="min-h-screen bg-gradient-background flex flex-col">
            {renderNavigationHeader()}
            <Card className="flex-1 m-4 bg-card/80 backdrop-blur-sm border-border shadow-elegant">
              <ChatInterface />
            </Card>
          </div>
        );

      case 'lawyers':
        return (
          <div className="min-h-screen bg-gradient-background">
            {renderNavigationHeader()}
            <LawyerDashboard onSelectLawyer={handleSelectLawyer} />
          </div>
        );

      case 'checkout':
        return selectedLawyer ? (
          <CheckoutPage 
            lawyer={selectedLawyer} 
            onBack={handleBackToLawyers}
            onPaymentSuccess={handlePaymentSuccess}
          />
        ) : null;

      case 'success':
        return (
          <PaymentSuccess onBackToHome={handleBackToHome} />
        );

      default:
        return null;
    }
  };

  return renderCurrentState();
};

export default Index;

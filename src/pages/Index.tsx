import React, { useState } from 'react';
import { HeroSection } from '@/components/HeroSection';
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
            {/* Service Navigation */}
            <div className="bg-card/30 backdrop-blur-sm border-t border-border">
              <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center text-foreground mb-8">
                  เลือกบริการที่ต้องการ
                </h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  <Card className="p-8 bg-card/80 backdrop-blur-sm border-border shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer group"
                        onClick={handleStartChat}>
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">ปรึกษาทนาย AI</h3>
                      <p className="text-muted-foreground">
                        รับคำปรึกษาเบื้องต้นจาก AI ทนาย ฟรี 24/7
                      </p>
                      <Button variant="outline" className="mt-4">
                        เริ่มแชท
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-8 bg-card/80 backdrop-blur-sm border-border shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer group"
                        onClick={handleShowLawyers}>
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                        <Users className="w-8 h-8 text-accent-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground">จองทนายมืออาชีพ</h3>
                      <p className="text-muted-foreground">
                        เลือกทนายที่เชี่ยวชาญเฉพาะด้าน จองนัดหมายได้ทันที
                      </p>
                      <Button variant="accent" className="mt-4">
                        ดูทนาย
                      </Button>
                    </div>
                  </Card>
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

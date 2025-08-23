import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Scale, Shield, Clock, MessageSquare } from 'lucide-react';
import lawyerHero from '@/assets/lawyer-hero.jpg';

interface HeroSectionProps {
  onStartChat: () => void;
}

export const HeroSection = ({ onStartChat }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen bg-gradient-background">
      {/* Hero Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                ปรึกษา
                <span className="bg-gradient-primary bg-clip-text text-transparent"> ทนาย AI </span>
                ได้ทุกเวลา
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                รับคำปรึกษาทางกฎหมายจากปัญญาประดิษฐ์ที่มีความรู้กว้างขวาง 
                พร้อมให้บริการ 24/7 เพื่อตอบคำถามและแนะนำแนวทางในเรื่องกฎหมาย
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
                <Scale className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold text-card-foreground">ความเชี่ยวชาญ</h3>
                <p className="text-sm text-muted-foreground">ความรู้กฎหมายครอบคลุม</p>
              </Card>
              
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
                <Clock className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold text-card-foreground">24/7</h3>
                <p className="text-sm text-muted-foreground">พร้อมให้บริการทุกเวลา</p>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
                <Shield className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold text-card-foreground">ความปลอดภัย</h3>
                <p className="text-sm text-muted-foreground">ข้อมูลเป็นความลับ</p>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur-sm border-border/50 shadow-card">
                <MessageSquare className="w-8 h-8 text-primary mb-2" />
                <h3 className="font-semibold text-card-foreground">สะดวกรวดเร็ว</h3>
                <p className="text-sm text-muted-foreground">ตอบคำถามได้ทันที</p>
              </Card>
            </div>

            {/* CTA */}
            <div className="space-y-4">
              <Button 
                onClick={onStartChat}
                variant="hero" 
                size="lg"
                className="w-full md:w-auto text-lg px-8 py-3"
              >
                เริ่มการปรึกษา
              </Button>
              <p className="text-sm text-muted-foreground">
                * ข้อมูลนี้เป็นเพียงคำแนะนำเบื้องต้น ควรปรึกษาทนายมืออาชีพสำหรับคดีที่สำคัญ
              </p>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={lawyerHero} 
                alt="ปรึกษาทนาย AI - บริการให้คำปรึกษาทางกฎหมายออนไลน์"
                className="w-full h-auto rounded-2xl shadow-elegant object-cover"
              />
            </div>
            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-secondary rounded-2xl opacity-20 z-0"></div>
          </div>
        </div>
      </div>

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
};
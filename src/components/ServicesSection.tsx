import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users } from 'lucide-react';

interface ServicesSectionProps {
  onStartChat: () => void;
  onShowLawyers: () => void;
}

export const ServicesSection = ({ onStartChat, onShowLawyers }: ServicesSectionProps) => {
  return (
    <div className="bg-card/30 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            บริการของ Lawra
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            เลือกบริการที่เหมาะสมกับความต้องการของคุณ ทั้งการปรึกษา AI ฟรี และการจองทนายมืออาชีพ
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="p-8 bg-card/80 backdrop-blur-sm border-border shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer group animate-fade-in"
                onClick={onStartChat}>
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

          <Card className="p-8 bg-card/80 backdrop-blur-sm border-border shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer group animate-fade-in"
                onClick={onShowLawyers}>
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
  );
};
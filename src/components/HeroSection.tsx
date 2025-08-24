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
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Scale className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-primary">Lawra</h2>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                ปรึกษาทนาย AI 
                <span className="bg-gradient-primary bg-clip-text text-transparent"> ที่ทันสมัย</span>
                ได้ทุกเวลา
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                <strong>Lawra</strong> คือแพลตฟอร์มปรึกษาทนาย AI ออนไลน์ที่ทันสมัย 
                ผสานเทคโนโลยี AI เข้ากับความรู้ทางกฎหมายที่ครอบคลุม 
                พร้อมให้บริการ 24/7 เพื่อช่วยคุณแก้ไขปัญหาทางกฎหมาย
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mt-6 p-4 bg-card/30 rounded-xl backdrop-blur-sm border border-border/50">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">10,000+</div>
                  <div className="text-sm text-muted-foreground">คำถามที่ตอบแล้ว</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">95%</div>
                  <div className="text-sm text-muted-foreground">ความพึงพอใจ</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">พร้อมให้บริการ</div>
                </div>
              </div>
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

            {/* Chat Search Input */}
            <div className="space-y-4">
              <div className="relative">
                <div className="flex items-center bg-card/80 backdrop-blur-sm border border-border/50 rounded-full px-6 py-4 shadow-elegant hover:shadow-card transition-all duration-300 cursor-pointer"
                     onClick={onStartChat}>
                  <MessageSquare className="w-5 h-5 text-primary mr-3" />
                  <input 
                    type="text" 
                    placeholder="พิมพ์คำถามกฎหมายของคุณที่นี่..."
                    className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none cursor-pointer"
                    readOnly
                  />
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>Enter</span>
                    <div className="w-6 h-6 bg-primary/20 rounded flex items-center justify-center">
                      <span className="text-xs">⏎</span>
                    </div>
                  </div>
                </div>
              </div>
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

      {/* Top Lawyers Section */}
      <div className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              ทนายยอดนิยม
            </h2>
            <p className="text-lg text-muted-foreground">
              ทนายที่ได้รับการยอมรับจากลูกค้ามากที่สุด
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Scale className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">ทนายสมชาย วิเชียร</h3>
                  <p className="text-sm text-muted-foreground">กฎหมายแพ่ง</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ประสบการณ์:</span>
                  <span className="text-foreground">15 ปี</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">คะแนน:</span>
                  <span className="text-foreground">⭐⭐⭐⭐⭐ (4.9)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ราคา:</span>
                  <span className="text-primary font-semibold">2,500 บาท/ชม.</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-secondary rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">ทนายสุดา กิตติกุล</h3>
                  <p className="text-sm text-muted-foreground">กฎหมายครอบครัว</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ประสบการณ์:</span>
                  <span className="text-foreground">12 ปี</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">คะแนน:</span>
                  <span className="text-foreground">⭐⭐⭐⭐⭐ (4.8)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ราคา:</span>
                  <span className="text-primary font-semibold">2,200 บาท/ชม.</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-card hover:shadow-elegant transition-all duration-300">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Scale className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground">ทนายประสิทธิ์ มณีรัตน์</h3>
                  <p className="text-sm text-muted-foreground">กฎหมายธุรกิจ</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ประสบการณ์:</span>
                  <span className="text-foreground">18 ปี</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">คะแนน:</span>
                  <span className="text-foreground">⭐⭐⭐⭐⭐ (4.9)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">ราคา:</span>
                  <span className="text-primary font-semibold">3,000 บาท/ชม.</span>
                </div>
              </div>
            </Card>
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
import React from 'react';
import { Card } from "@/components/ui/card";
import { Scale, Shield } from 'lucide-react';

export const TopLawyersSection = () => {
  return (
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
          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-card hover:shadow-elegant transition-all duration-300 hover-scale">
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

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-card hover:shadow-elegant transition-all duration-300 hover-scale">
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

          <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-card hover:shadow-elegant transition-all duration-300 hover-scale">
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
  );
};
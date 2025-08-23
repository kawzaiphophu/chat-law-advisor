import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Calendar, Clock, User, ArrowRight } from 'lucide-react';

interface PaymentSuccessProps {
  onBackToHome: () => void;
}

export const PaymentSuccess = ({ onBackToHome }: PaymentSuccessProps) => {
  return (
    <div className="min-h-screen bg-gradient-background flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full p-8 bg-card/90 backdrop-blur-sm border-border shadow-elegant text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-foreground mb-2">
          การชำระเงินสำเร็จ!
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          คุณได้จองการปรึกษากับทนายเรียบร้อยแล้ว
        </p>

        {/* Booking Details */}
        <div className="bg-secondary/30 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">รายละเอียดการจอง</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">ทนาย</p>
                <p className="font-medium">ทนายสมชาย วงษ์ใหญ่</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">วันที่</p>
                <p className="font-medium">25 ธันวาคม 2567</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">เวลา</p>
                <p className="font-medium">14:00 - 15:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-primary/5 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-foreground mb-3">ขั้นตอนถัดไป</h3>
          <div className="text-left space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">คุณจะได้รับอีเมลยืนยันภายใน 5 นาที</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">ทนายจะติดต่อคุณก่อนนัดหมาย 1 วัน</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-sm">เข้าร่วมการปรึกษาผ่าน Zoom ในวันและเวลาที่นัดหมาย</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button variant="hero" size="lg" className="w-full">
            <Calendar className="w-5 h-5 mr-2" />
            เพิ่มในปฏิทิน
          </Button>
          <Button variant="outline" size="lg" className="w-full" onClick={onBackToHome}>
            กลับหน้าหลัก
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* Support */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            หากมีคำถามเพิ่มเติม ติดต่อ <span className="text-primary underline cursor-pointer">ฝ่ายสนับสนุน</span> ได้ตลอด 24 ชั่วโมง
          </p>
        </div>
      </Card>
    </div>
  );
};
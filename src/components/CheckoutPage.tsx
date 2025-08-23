import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  CreditCard, 
  QrCode,
  Smartphone,
  Star,
  Shield,
  CheckCircle2
} from 'lucide-react';
import { format } from "date-fns";
import { th } from "date-fns/locale";

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

interface CheckoutPageProps {
  lawyer: Lawyer;
  onBack: () => void;
  onPaymentSuccess: () => void;
}

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
];

const PAYMENT_METHODS = [
  { id: 'card', name: 'บัตรเครดิต/เดบิต', icon: CreditCard, description: 'Visa, Mastercard, JCB' },
  { id: 'promptpay', name: 'PromptPay QR', icon: QrCode, description: 'สแกน QR Code เพื่อจ่าย' },
  { id: 'truemoney', name: 'TrueMoney Wallet', icon: Smartphone, description: 'จ่ายผ่าน TrueMoney' },
];

export const CheckoutPage = ({ lawyer, onBack, onPaymentSuccess }: CheckoutPageProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [consultationHours, setConsultationHours] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = lawyer.pricePerHour * consultationHours;
  const serviceFee = totalAmount * 0.05; // 5% service fee
  const finalAmount = totalAmount + serviceFee;

  const handlePayment = async () => {
    if (!selectedDate || !selectedTime) {
      alert('กรุณาเลือกวันและเวลานัดหมาย');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 3000);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto p-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>กลับ</span>
          </Button>
          <h1 className="text-3xl font-bold text-foreground">จองการปรึกษา</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lawyer Info */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-card">
              <h2 className="text-xl font-semibold text-foreground mb-4">ข้อมูลทนาย</h2>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-3xl">
                  {lawyer.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">{lawyer.name}</h3>
                    {lawyer.verified && (
                      <Badge variant="secondary" className="text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        ยืนยันตัวตน
                      </Badge>
                    )}
                  </div>
                  <p className="text-primary font-medium">{lawyer.specialty}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(lawyer.rating)}
                    </div>
                    <span className="text-sm font-medium">{lawyer.rating}</span>
                    <span className="text-sm text-muted-foreground">• {lawyer.experience} ปีประสบการณ์</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Date & Time Selection */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-card">
              <h2 className="text-xl font-semibold text-foreground mb-4">เลือกวันและเวลา</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Date Picker */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">วันที่</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP", { locale: th }) : "เลือกวันที่"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 bg-card border-border shadow-elegant z-50" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Time Slots */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">เวลา</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedTime(time)}
                        className="text-sm"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Consultation Duration */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-card">
              <h2 className="text-xl font-semibold text-foreground mb-4">ระยะเวลาการปรึกษา</h2>
              <RadioGroup value={consultationHours.toString()} onValueChange={(value) => setConsultationHours(parseInt(value))}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="1hour" />
                    <Label htmlFor="1hour" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span>1 ชั่วโมง</span>
                        <span className="font-semibold text-accent">{lawyer.pricePerHour.toLocaleString()} บาท</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="2hours" />
                    <Label htmlFor="2hours" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span>2 ชั่วโมง</span>
                        <span className="font-semibold text-accent">{(lawyer.pricePerHour * 2).toLocaleString()} บาท</span>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="3hours" />
                    <Label htmlFor="3hours" className="flex-1 cursor-pointer">
                      <div className="flex justify-between items-center">
                        <span>3 ชั่วโมง</span>
                        <span className="font-semibold text-accent">{(lawyer.pricePerHour * 3).toLocaleString()} บาท</span>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </Card>

            {/* Payment Method */}
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-card">
              <h2 className="text-xl font-semibold text-foreground mb-4">วิธีการชำระเงิน</h2>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((method) => (
                    <div key={method.id} className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:bg-secondary/50 transition-colors">
                      <RadioGroupItem value={method.id} id={method.id} />
                      <method.icon className="w-5 h-5 text-primary" />
                      <Label htmlFor={method.id} className="flex-1 cursor-pointer">
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-muted-foreground">{method.description}</div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-card sticky top-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">สรุปการจอง</h2>
              
              <div className="space-y-4">
                {/* Booking Details */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ทนาย:</span>
                    <span className="font-medium">{lawyer.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">วันที่:</span>
                    <span className="font-medium">
                      {selectedDate ? format(selectedDate, "d MMM yyyy", { locale: th }) : 'ยังไม่ได้เลือก'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">เวลา:</span>
                    <span className="font-medium">{selectedTime || 'ยังไม่ได้เลือก'}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ระยะเวลา:</span>
                    <span className="font-medium">{consultationHours} ชั่วโมง</span>
                  </div>
                </div>

                <Separator />

                {/* Price Breakdown */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>ค่าปรึกษา ({consultationHours} ชม.)</span>
                    <span>{totalAmount.toLocaleString()} บาท</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>ค่าบริการ (5%)</span>
                    <span>{serviceFee.toLocaleString()} บาท</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>รวมทั้งสิ้น</span>
                  <span className="text-accent">{finalAmount.toLocaleString()} บาท</span>
                </div>

                {/* Security Note */}
                <div className="bg-secondary/30 p-3 rounded-lg">
                  <div className="flex items-center space-x-2 text-sm">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">การชำระเงินปลอดภัย 100%</span>
                  </div>
                </div>

                {/* Payment Button */}
                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full text-lg py-3"
                  onClick={handlePayment}
                  disabled={!selectedDate || !selectedTime || isProcessing}
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                      <span>กำลังดำเนินการ...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>ชำระเงินและยืนยันนัด</span>
                    </div>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  คลิกชำระเงิน แสดงว่าคุณยอมรับ <br />
                  <span className="text-primary underline cursor-pointer">เงื่อนไขการใช้บริการ</span>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
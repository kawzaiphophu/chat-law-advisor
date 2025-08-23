import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Star, Clock, DollarSign, Award } from 'lucide-react';

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

const MOCK_LAWYERS: Lawyer[] = [
  {
    id: '1',
    name: 'ทนายสมชาย วงษ์ใหญ่',
    specialty: 'กฎหมายแพ่งและพาณิชย์',
    experience: 15,
    rating: 4.8,
    pricePerHour: 2500,
    avatar: '👨‍💼',
    verified: true,
    responseTime: '< 1 ชม.'
  },
  {
    id: '2',
    name: 'ทนายสมหญิง ใจดี',
    specialty: 'กฎหมายครอบครัว',
    experience: 12,
    rating: 4.9,
    pricePerHour: 2000,
    avatar: '👩‍💼',
    verified: true,
    responseTime: '< 30 นาที'
  },
  {
    id: '3',
    name: 'ทนายประยุทธ สู้คดี',
    specialty: 'กฎหมายอาญา',
    experience: 20,
    rating: 4.7,
    pricePerHour: 3000,
    avatar: '👨‍⚖️',
    verified: true,
    responseTime: '< 2 ชม.'
  },
  {
    id: '4',
    name: 'ทนายสุดา ปกป้อง',
    specialty: 'กฎหมายแรงงาน',
    experience: 8,
    rating: 4.6,
    pricePerHour: 1800,
    avatar: '👩‍⚖️',
    verified: true,
    responseTime: '< 1 ชม.'
  },
  {
    id: '5',
    name: 'ทนายวิชาญ ธุรกิจ',
    specialty: 'กฎหมายธุรกิจ',
    experience: 18,
    rating: 4.9,
    pricePerHour: 3500,
    avatar: '👨‍💼',
    verified: true,
    responseTime: '< 45 นาที'
  },
  {
    id: '6',
    name: 'ทนายรัชนี ช่วยเหลือ',
    specialty: 'กฎหมายทรัพย์สินทางปัญญา',
    experience: 10,
    rating: 4.5,
    pricePerHour: 2200,
    avatar: '👩‍💼',
    verified: false,
    responseTime: '< 3 ชม.'
  }
];

const LEGAL_CATEGORIES = [
  'ทั้งหมด',
  'กฎหมายแพ่งและพาณิชย์',
  'กฎหมายอาญา',
  'กฎหมายครอบครัว',
  'กฎหมายแรงงาน',
  'กฎหมายธุรกิจ',
  'กฎหมายทรัพย์สินทางปัญญา'
];

const BUDGET_RANGES = [
  'ทั้งหมด',
  'ต่ำกว่า 2,000 บาท/ชม.',
  '2,000 - 2,500 บาท/ชม.',
  '2,500 - 3,000 บาท/ชม.',
  'มากกว่า 3,000 บาท/ชม.'
];

interface LawyerDashboardProps {
  onSelectLawyer: (lawyer: Lawyer) => void;
}

export const LawyerDashboard = ({ onSelectLawyer }: LawyerDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');
  const [selectedBudget, setSelectedBudget] = useState('ทั้งหมด');
  const [filteredLawyers, setFilteredLawyers] = useState(MOCK_LAWYERS);

  const filterLawyers = () => {
    let filtered = MOCK_LAWYERS;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(lawyer => 
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'ทั้งหมด') {
      filtered = filtered.filter(lawyer => lawyer.specialty === selectedCategory);
    }

    // Filter by budget
    if (selectedBudget !== 'ทั้งหมด') {
      filtered = filtered.filter(lawyer => {
        switch (selectedBudget) {
          case 'ต่ำกว่า 2,000 บาท/ชม.':
            return lawyer.pricePerHour < 2000;
          case '2,000 - 2,500 บาท/ชม.':
            return lawyer.pricePerHour >= 2000 && lawyer.pricePerHour <= 2500;
          case '2,500 - 3,000 บาท/ชม.':
            return lawyer.pricePerHour > 2500 && lawyer.pricePerHour <= 3000;
          case 'มากกว่า 3,000 บาท/ชม.':
            return lawyer.pricePerHour > 3000;
          default:
            return true;
        }
      });
    }

    setFilteredLawyers(filtered);
  };

  React.useEffect(() => {
    filterLawyers();
  }, [searchTerm, selectedCategory, selectedBudget]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : index < rating 
            ? 'text-yellow-400 fill-current opacity-50' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">ค้นหาทนายมืออาชีพ</h1>
          <p className="text-muted-foreground">เลือกทนายที่เหมาะสมกับความต้องการของคุณ</p>
        </div>

        {/* Search and Filters */}
        <Card className="p-6 mb-8 bg-card/80 backdrop-blur-sm border-border shadow-card">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="ค้นหาทนาย หรือ ความเชี่ยวชาญ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">หมวดกฎหมาย</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกหมวดกฎหมาย" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border shadow-elegant z-50">
                    {LEGAL_CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">งบประมาณ</label>
                <Select value={selectedBudget} onValueChange={setSelectedBudget}>
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกช่วงราคา" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border shadow-elegant z-50">
                    {BUDGET_RANGES.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button variant="outline" className="w-full">
                  <Filter className="w-4 h-4 mr-2" />
                  ตัวกรองเพิ่มเติม
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            พบทนาย {filteredLawyers.length} คน
          </h2>
          <div className="text-sm text-muted-foreground">
            เรียงตาม: ความเหมาะสม
          </div>
        </div>

        {/* Lawyer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLawyers.map((lawyer) => (
            <Card key={lawyer.id} className="p-6 bg-card/80 backdrop-blur-sm border-border shadow-card hover:shadow-elegant transition-all duration-300 cursor-pointer"
                  onClick={() => onSelectLawyer(lawyer)}>
              {/* Lawyer Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-2xl">
                    {lawyer.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{lawyer.name}</h3>
                    <div className="flex items-center space-x-1 mt-1">
                      {lawyer.verified && (
                        <Badge variant="secondary" className="text-xs">
                          <Award className="w-3 h-3 mr-1" />
                          ยืนยันตัวตน
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Specialty */}
              <div className="mb-3">
                <p className="text-sm text-primary font-medium">{lawyer.specialty}</p>
                <p className="text-xs text-muted-foreground mt-1">ประสบการณ์ {lawyer.experience} ปี</p>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center space-x-1">
                  {renderStars(lawyer.rating)}
                </div>
                <span className="text-sm font-medium text-foreground">{lawyer.rating}</span>
                <span className="text-xs text-muted-foreground">(245 รีวิว)</span>
              </div>

              {/* Price and Response Time */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm">
                    <DollarSign className="w-4 h-4 text-accent" />
                    <span className="font-semibold text-accent">
                      {lawyer.pricePerHour.toLocaleString()} บาท/ชม.
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>ตอบกลับ {lawyer.responseTime}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Button variant="hero" size="sm" className="w-full">
                เลือกทนายคนนี้
              </Button>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredLawyers.length === 0 && (
          <Card className="p-12 text-center bg-card/50 backdrop-blur-sm border-border">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">ไม่พบทนายที่ตรงกับเงื่อนไข</h3>
            <p className="text-muted-foreground mb-4">ลองปรับเงื่อนไขการค้นหาใหม่</p>
            <Button variant="outline" onClick={() => {
              setSearchTerm('');
              setSelectedCategory('ทั้งหมด');
              setSelectedBudget('ทั้งหมด');
            }}>
              ล้างตัวกรอง
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};
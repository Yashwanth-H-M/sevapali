import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, CheckCircle, Users, Search, Filter, Heart, GraduationCap, Tractor, Home, Briefcase, Baby } from 'lucide-react';
import EligibilityChecker from '@/components/schemes/EligibilityChecker';

interface Scheme {
  id: number;
  name: string;
  description: string;
  eligibility: string;
  benefits: string;
  isNew: boolean;
  category: string;
  applyLink: string;
  icon: React.ReactNode;
}

const Schemes: React.FC = () => {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [eligibilityOpen, setEligibilityOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const categories = [
    { id: 'all', name: language === 'mr' ? 'सर्व' : 'All' },
    { id: 'health', name: language === 'mr' ? 'आरोग्य' : 'Health' },
    { id: 'education', name: language === 'mr' ? 'शिक्षण' : 'Education' },
    { id: 'agriculture', name: language === 'mr' ? 'कृषी' : 'Agriculture' },
    { id: 'housing', name: language === 'mr' ? 'गृहनिर्माण' : 'Housing' },
    { id: 'employment', name: language === 'mr' ? 'रोजगार' : 'Employment' },
    { id: 'women', name: language === 'mr' ? 'महिला' : 'Women & Child' },
  ];

  const schemes: Scheme[] = [
    {
      id: 1,
      name: language === 'mr' ? 'महात्मा फुले जन आरोग्य योजना' : 'Mahatma Phule Jan Arogya Yojana',
      description: language === 'mr' ? 'गरीब कुटुंबांसाठी मोफत आरोग्य विमा योजना. ९७१ प्रकारच्या आजारांवर मोफत उपचार.' : 'Free health insurance for poor families. Free treatment for 971 types of diseases.',
      eligibility: language === 'mr' ? 'वार्षिक उत्पन्न ₹१.५ लाखापेक्षा कमी, पिवळे/केशरी रेशन कार्ड धारक' : 'Annual income less than ₹1.5 lakh, Yellow/Orange ration card holders',
      benefits: '₹1.5 Lakh coverage per family per year',
      isNew: true,
      category: 'health',
      applyLink: 'https://www.jeevandayee.gov.in/',
      icon: <Heart className="h-5 w-5" />,
    },
    {
      id: 2,
      name: language === 'mr' ? 'लेक लाडकी योजना' : 'Lek Ladki Yojana',
      description: language === 'mr' ? 'मुलींच्या जन्मापासून ते १८ वर्षापर्यंत आर्थिक मदत. शिक्षणासाठी प्रोत्साहन.' : 'Financial assistance from birth to 18 years for girls. Encouragement for education.',
      eligibility: language === 'mr' ? 'महाराष्ट्रातील मुली, पिवळे/केशरी रेशन कार्ड कुटुंब' : 'Girls from Maharashtra, Yellow/Orange ration card families',
      benefits: '₹1,01,000 total (given in installments)',
      isNew: true,
      category: 'women',
      applyLink: 'https://womenchild.maharashtra.gov.in/',
      icon: <Baby className="h-5 w-5" />,
    },
    {
      id: 3,
      name: language === 'mr' ? 'पीएम किसान सन्मान निधी' : 'PM Kisan Samman Nidhi',
      description: language === 'mr' ? 'शेतकऱ्यांना वार्षिक ₹६,००० आर्थिक मदत तीन हप्त्यांमध्ये.' : 'Annual financial assistance of ₹6,000 to farmers in three installments.',
      eligibility: language === 'mr' ? 'नोंदणीकृत शेतकरी, जमीन धारक' : 'Registered farmers with land ownership',
      benefits: '₹6,000/year in 3 installments',
      isNew: false,
      category: 'agriculture',
      applyLink: 'https://pmkisan.gov.in/',
      icon: <Tractor className="h-5 w-5" />,
    },
    {
      id: 4,
      name: language === 'mr' ? 'प्रधानमंत्री आवास योजना (ग्रामीण)' : 'PM Awas Yojana (Rural)',
      description: language === 'mr' ? 'ग्रामीण भागातील गरीब कुटुंबांना पक्के घर बांधण्यासाठी आर्थिक मदत.' : 'Financial assistance for building pucca houses for poor families in rural areas.',
      eligibility: language === 'mr' ? 'बेघर कुटुंब, कच्चे घर असलेले, एससी/एसटी/ओबीसी कुटुंबांना प्राधान्य' : 'Homeless families, families with kutcha houses, priority to SC/ST/OBC families',
      benefits: '₹1,20,000 - ₹1,30,000 for house construction',
      isNew: false,
      category: 'housing',
      applyLink: 'https://pmayg.nic.in/',
      icon: <Home className="h-5 w-5" />,
    },
    {
      id: 5,
      name: language === 'mr' ? 'मुख्यमंत्री रोजगार निर्मिती कार्यक्रम' : 'CM Employment Generation Program',
      description: language === 'mr' ? 'तरुणांना स्वतःचा व्यवसाय सुरू करण्यासाठी कर्ज आणि अनुदान.' : 'Loans and subsidies for youth to start their own business.',
      eligibility: language === 'mr' ? 'वय १८-४५ वर्षे, शैक्षणिक पात्रता ८वी पास' : 'Age 18-45 years, educational qualification 8th pass',
      benefits: 'Loan up to ₹50 Lakh with 25-35% subsidy',
      isNew: true,
      category: 'employment',
      applyLink: 'https://maha-cmegp.gov.in/',
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      id: 6,
      name: language === 'mr' ? 'राजर्षी शाहू महाराज शिष्यवृत्ती' : 'Rajarshi Shahu Maharaj Scholarship',
      description: language === 'mr' ? 'ओबीसी विद्यार्थ्यांसाठी उच्च शिक्षणासाठी शिष्यवृत्ती.' : 'Scholarship for higher education for OBC students.',
      eligibility: language === 'mr' ? 'ओबीसी विद्यार्थी, वार्षिक उत्पन्न ₹८ लाखापेक्षा कमी' : 'OBC students, annual income less than ₹8 lakh',
      benefits: '100% tuition fee reimbursement',
      isNew: false,
      category: 'education',
      applyLink: 'https://mahadbt.maharashtra.gov.in/',
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      id: 7,
      name: language === 'mr' ? 'आयुष्मान भारत योजना' : 'Ayushman Bharat Yojana',
      description: language === 'mr' ? 'गरीब आणि कमकुवत कुटुंबांसाठी ₹५ लाखांचे मोफत आरोग्य विमा.' : 'Free health insurance of ₹5 lakh for poor and vulnerable families.',
      eligibility: language === 'mr' ? 'सामाजिक-आर्थिक जनगणना २०११ नुसार पात्र कुटुंब' : 'Families eligible as per SECC 2011 data',
      benefits: '₹5 Lakh health cover per family per year',
      isNew: false,
      category: 'health',
      applyLink: 'https://pmjay.gov.in/',
      icon: <Heart className="h-5 w-5" />,
    },
    {
      id: 8,
      name: language === 'mr' ? 'माझी कन्या भाग्यश्री योजना' : 'Majhi Kanya Bhagyashree Yojana',
      description: language === 'mr' ? 'मुलींच्या शिक्षण आणि विवाहासाठी आर्थिक मदत.' : 'Financial assistance for education and marriage of girls.',
      eligibility: language === 'mr' ? 'एक किंवा दोन मुली असलेले कुटुंब, वार्षिक उत्पन्न ₹७.५ लाखापेक्षा कमी' : 'Families with one or two girls, annual income less than ₹7.5 lakh',
      benefits: '₹50,000 at maturity',
      isNew: false,
      category: 'women',
      applyLink: 'https://womenchild.maharashtra.gov.in/',
      icon: <Baby className="h-5 w-5" />,
    },
    {
      id: 9,
      name: language === 'mr' ? 'शेतकरी अपघात विमा योजना' : 'Farmer Accident Insurance Scheme',
      description: language === 'mr' ? 'शेतकऱ्यांना अपघात विमा संरक्षण.' : 'Accident insurance coverage for farmers.',
      eligibility: language === 'mr' ? '१० ते ७५ वयोगटातील नोंदणीकृत शेतकरी' : 'Registered farmers aged 10-75 years',
      benefits: '₹2 Lakh accident cover',
      isNew: false,
      category: 'agriculture',
      applyLink: 'https://krishi.maharashtra.gov.in/',
      icon: <Tractor className="h-5 w-5" />,
    },
    {
      id: 10,
      name: language === 'mr' ? 'डॉ. पंजाबराव देशमुख वसतिगृह योजना' : 'Dr. Punjabrao Deshmukh Hostel Scheme',
      description: language === 'mr' ? 'ग्रामीण विद्यार्थ्यांसाठी मोफत वसतिगृह सुविधा.' : 'Free hostel facility for rural students.',
      eligibility: language === 'mr' ? 'ग्रामीण भागातील विद्यार्थी, उच्च शिक्षणासाठी' : 'Students from rural areas pursuing higher education',
      benefits: 'Free accommodation + maintenance allowance',
      isNew: true,
      category: 'education',
      applyLink: 'https://mahadbt.maharashtra.gov.in/',
      icon: <GraduationCap className="h-5 w-5" />,
    },
    {
      id: 11,
      name: language === 'mr' ? 'घरकुल योजना' : 'Gharkul Yojana',
      description: language === 'mr' ? 'ग्रामीण गरीबांसाठी घर बांधणी योजना.' : 'Housing construction scheme for rural poor.',
      eligibility: language === 'mr' ? 'बेघर कुटुंब, दारिद्र्य रेषेखालील कुटुंब' : 'Homeless families, Below Poverty Line families',
      benefits: '₹1,20,000 for house construction',
      isNew: false,
      category: 'housing',
      applyLink: 'https://rhreporting.nic.in/',
      icon: <Home className="h-5 w-5" />,
    },
    {
      id: 12,
      name: language === 'mr' ? 'महिला स्वयंरोजगार योजना' : 'Women Self-Employment Scheme',
      description: language === 'mr' ? 'महिलांना स्वयंरोजगारासाठी कर्ज आणि प्रशिक्षण.' : 'Loans and training for women for self-employment.',
      eligibility: language === 'mr' ? '१८-५५ वयोगटातील महिला, महाराष्ट्र रहिवासी' : 'Women aged 18-55 years, Maharashtra resident',
      benefits: 'Loan up to ₹3 Lakh with subsidy',
      isNew: true,
      category: 'women',
      applyLink: 'https://www.mahaswayamroj.gov.in/',
      icon: <Briefcase className="h-5 w-5" />,
    },
  ];

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCheckEligibility = (scheme: Scheme) => {
    setSelectedScheme(scheme);
    setEligibilityOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'mr' ? 'शासकीय योजना' : 'Government Schemes'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'mr' ? 'महाराष्ट्र शासनाच्या विविध योजनांची माहिती आणि ऑनलाइन अर्ज' : 'Information about various Maharashtra Government schemes and online application'}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={language === 'mr' ? 'योजना शोधा...' : 'Search schemes...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <Card key={scheme.id} variant="feature" className="hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {scheme.icon}
                    </div>
                    <Badge variant="secondary">
                      {categories.find(c => c.id === scheme.category)?.name}
                    </Badge>
                  </div>
                  {scheme.isNew && <Badge variant="accent">{language === 'mr' ? 'नवीन' : 'New'}</Badge>}
                </div>
                <CardTitle className="text-xl mt-3">{scheme.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{scheme.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                    <span><strong>{language === 'mr' ? 'पात्रता:' : 'Eligibility:'}</strong> {scheme.eligibility}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    <span><strong>{language === 'mr' ? 'लाभ:' : 'Benefits:'}</strong> {scheme.benefits}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="default" size="sm" className="flex-1" asChild>
                    <a href={scheme.applyLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      {language === 'mr' ? 'अर्ज करा' : 'Apply'}
                    </a>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleCheckEligibility(scheme)}
                  >
                    {language === 'mr' ? 'पात्रता तपासा' : 'Check Eligibility'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {language === 'mr' ? 'कोणतीही योजना सापडली नाही' : 'No schemes found'}
            </p>
          </div>
        )}
      </main>
      <Footer />

      <EligibilityChecker
        open={eligibilityOpen}
        onOpenChange={setEligibilityOpen}
        scheme={selectedScheme}
      />
    </div>
  );
};

export default Schemes;

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, FileText, CheckCircle, Calendar, Users } from 'lucide-react';

const Schemes: React.FC = () => {
  const { language } = useLanguage();

  const schemes = [
    {
      id: 1,
      name: language === 'mr' ? 'महात्मा फुले जन आरोग्य योजना' : 'Mahatma Phule Jan Arogya Yojana',
      description: language === 'mr' ? 'गरीब कुटुंबांसाठी मोफत आरोग्य विमा योजना' : 'Free health insurance for poor families',
      eligibility: language === 'mr' ? 'वार्षिक उत्पन्न ₹१.५ लाखापेक्षा कमी' : 'Annual income less than ₹1.5 lakh',
      benefits: '₹1.5 Lakh coverage',
      isNew: true,
      category: language === 'mr' ? 'आरोग्य' : 'Health',
    },
    {
      id: 2,
      name: language === 'mr' ? 'लेक लाडकी योजना' : 'Lek Ladki Yojana',
      description: language === 'mr' ? 'मुलींच्या शिक्षणासाठी आर्थिक मदत' : 'Financial assistance for girls education',
      eligibility: language === 'mr' ? 'महाराष्ट्रातील मुली' : 'Girls from Maharashtra',
      benefits: '₹1 Lakh at 18 years',
      isNew: true,
      category: language === 'mr' ? 'शिक्षण' : 'Education',
    },
    {
      id: 3,
      name: language === 'mr' ? 'शेतकरी सन्मान निधी' : 'Farmer Samman Nidhi',
      description: language === 'mr' ? 'शेतकऱ्यांना वार्षिक आर्थिक मदत' : 'Annual financial assistance to farmers',
      eligibility: language === 'mr' ? 'नोंदणीकृत शेतकरी' : 'Registered farmers',
      benefits: '₹6,000/year',
      isNew: false,
      category: language === 'mr' ? 'कृषी' : 'Agriculture',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-28 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'mr' ? 'शासकीय योजना' : 'Government Schemes'}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'mr' ? 'महाराष्ट्र शासनाच्या विविध योजनांची माहिती' : 'Information about various Maharashtra Government schemes'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme) => (
            <Card key={scheme.id} variant="feature" className="hover-lift">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <Badge variant="secondary">{scheme.category}</Badge>
                  {scheme.isNew && <Badge variant="accent">{language === 'mr' ? 'नवीन' : 'New'}</Badge>}
                </div>
                <CardTitle className="text-xl mt-3">{scheme.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{scheme.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-primary mt-0.5" />
                    <span><strong>{language === 'mr' ? 'पात्रता:' : 'Eligibility:'}</strong> {scheme.eligibility}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5" />
                    <span><strong>{language === 'mr' ? 'लाभ:' : 'Benefits:'}</strong> {scheme.benefits}</span>
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="default" size="sm" className="flex-1">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    {language === 'mr' ? 'अर्ज करा' : 'Apply'}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    {language === 'mr' ? 'पात्रता तपासा' : 'Check Eligibility'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Schemes;

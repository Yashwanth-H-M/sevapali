import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  Target, 
  Award, 
  Clock, 
  Building2, 
  Heart,
  CheckCircle,
  Zap
} from 'lucide-react';

const About: React.FC = () => {
  const { language } = useLanguage();

  const stats = [
    { 
      icon: Building2, 
      value: '500+', 
      label: language === 'mr' ? 'सरकारी कार्यालये' : 'Government Offices' 
    },
    { 
      icon: Users, 
      value: '1M+', 
      label: language === 'mr' ? 'नागरिक सेवित' : 'Citizens Served' 
    },
    { 
      icon: Clock, 
      value: '2M+', 
      label: language === 'mr' ? 'तास वाचले' : 'Hours Saved' 
    },
    { 
      icon: Award, 
      value: '98%', 
      label: language === 'mr' ? 'समाधान दर' : 'Satisfaction Rate' 
    },
  ];

  const values = [
    {
      icon: Target,
      title: language === 'mr' ? 'आमचे ध्येय' : 'Our Mission',
      description: language === 'mr' 
        ? 'महाराष्ट्रातील प्रत्येक नागरिकासाठी सरकारी सेवा सुलभ आणि कार्यक्षम बनवणे.'
        : 'To make government services accessible and efficient for every citizen of Maharashtra.',
    },
    {
      icon: Heart,
      title: language === 'mr' ? 'आमची दृष्टी' : 'Our Vision',
      description: language === 'mr'
        ? 'डिजिटल तंत्रज्ञानाद्वारे नागरिक-केंद्रित शासन निर्माण करणे.'
        : 'To create citizen-centric governance through digital technology.',
    },
    {
      icon: Zap,
      title: language === 'mr' ? 'आमची मूल्ये' : 'Our Values',
      description: language === 'mr'
        ? 'पारदर्शकता, कार्यक्षमता, नवकल्पना आणि नागरिक सेवा.'
        : 'Transparency, efficiency, innovation, and citizen service.',
    },
  ];

  const features = [
    language === 'mr' ? 'AI-संचालित प्रतीक्षा वेळ अंदाज' : 'AI-powered wait time prediction',
    language === 'mr' ? 'ऑनलाइन टोकन बुकिंग सिस्टम' : 'Online token booking system',
    language === 'mr' ? 'रिअल-टाइम रांग स्थिती' : 'Real-time queue status',
    language === 'mr' ? 'बहुभाषिक समर्थन' : 'Multi-language support',
    language === 'mr' ? 'व्हॉइस असिस्टंट' : 'Voice assistant',
    language === 'mr' ? 'योजना शोध आणि पात्रता तपासणी' : 'Scheme discovery and eligibility check',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Building2 className="h-4 w-4" />
                {language === 'mr' ? 'डिजिटल महाराष्ट्र उपक्रम' : 'Digital Maharashtra Initiative'}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {language === 'mr' ? 'सेवापाली बद्दल' : 'About SevaPali'}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {language === 'mr' 
                  ? 'सेवापाली हे महाराष्ट्र शासनाचे AI-संचालित डिजिटल टोकन आणि रांग व्यवस्थापन प्रणाली आहे. आम्ही नागरिकांना सरकारी कार्यालयांमध्ये लांब रांगांपासून मुक्त करण्यासाठी आणि त्यांचा वेळ वाचवण्यासाठी कटिबद्ध आहोत.'
                  : 'SevaPali is Maharashtra Government\'s AI-powered digital token and queue management system. We are committed to freeing citizens from long queues at government offices and saving their valuable time.'}
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index} variant="elevated" className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {language === 'mr' ? 'आम्ही कोण आहोत' : 'Who We Are'}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {language === 'mr' 
                  ? 'नागरिकांच्या सेवेसाठी समर्पित एक टीम'
                  : 'A team dedicated to serving the citizens'}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={index} variant="elevated" className="text-center">
                  <CardContent className="pt-8 pb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <value.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {language === 'mr' ? 'आमची वैशिष्ट्ये' : 'Our Features'}
                </h2>
                <p className="text-muted-foreground">
                  {language === 'mr' 
                    ? 'आधुनिक तंत्रज्ञानाने सुसज्ज'
                    : 'Powered by modern technology'}
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-4 rounded-lg bg-background border border-border"
                  >
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <Card variant="elevated" className="max-w-2xl mx-auto">
              <CardContent className="pt-8 pb-8 text-center">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  {language === 'mr' ? 'संपर्क साधा' : 'Get in Touch'}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {language === 'mr' 
                    ? 'प्रश्न, सूचना किंवा अभिप्रायासाठी आमच्याशी संपर्क साधा.'
                    : 'Contact us for questions, suggestions, or feedback.'}
                </p>
                <div className="space-y-2 text-muted-foreground">
                  <p>📧 support@sevapali.gov.in</p>
                  <p>📞 1800-XXX-XXXX (Toll Free)</p>
                  <p>🏛️ {language === 'mr' ? 'मंत्रालय, मुंबई' : 'Mantralaya, Mumbai'}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
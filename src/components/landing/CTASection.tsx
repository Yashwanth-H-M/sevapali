import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight, CheckCircle } from 'lucide-react';

const CTASection: React.FC = () => {
  const { language } = useLanguage();

  const benefits = language === 'mr' ? [
    'ऑनलाइन टोकन बुकिंग',
    'AI प्रतीक्षा वेळ अंदाज',
    'मराठी व्हॉइस असिस्टंट',
    'शासकीय योजना शोध',
  ] : [
    'Online token booking',
    'AI wait time prediction',
    'Marathi voice assistant',
    'Government scheme discovery',
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary via-primary/95 to-accent/80 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-hero-pattern opacity-20" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/30 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            {language === 'mr' 
              ? 'आजच सेवापाली सुरू करा' 
              : 'Start Using SevaPali Today'}
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            {language === 'mr'
              ? 'रांगांचा त्रास विसरा. घरबसल्या टोकन बुक करा आणि सरकारी सेवांचा आनंद घ्या.'
              : 'Forget the hassle of queues. Book tokens from home and enjoy government services with ease.'}
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <CheckCircle className="h-4 w-4 text-accent" />
                <span className="text-sm text-primary-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Link to="/login">
            <Button variant="accent" size="xl" className="group">
              {language === 'mr' ? 'आता सुरू करा' : 'Get Started Now'}
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

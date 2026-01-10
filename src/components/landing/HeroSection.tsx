import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Ticket, Clock, Users, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  const { t, language } = useLanguage();

  const stats = [
    { value: '500+', label: t.hero.stats.offices, icon: Users },
    { value: '2M+', label: t.hero.stats.citizens, icon: Ticket },
    { value: '10K+', label: t.hero.stats.timeSaved, icon: Clock },
    { value: '98%', label: t.hero.stats.satisfaction, icon: TrendingUp },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary-foreground/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />

      <div className="container relative z-10 px-4 pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge variant="glow" className="mb-6 px-4 py-1.5 text-sm">
            <Sparkles className="h-3.5 w-3.5 mr-1.5" />
            {t.hero.badge}
          </Badge>

          {/* Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4 tracking-tight">
            {t.hero.title}
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-foreground/90 font-medium mb-4">
            {t.hero.subtitle}
          </p>

          {/* Description */}
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto mb-8">
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link to="/login">
              <Button variant="accent" size="xl" className="w-full sm:w-auto group">
                <Ticket className="h-5 w-5" />
                {t.hero.bookToken}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/schemes">
              <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                {t.hero.exploreSchemes}
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-primary-foreground/10"
              >
                <stat.icon className="h-6 w-6 text-accent mx-auto mb-2" />
                <p className="text-2xl md:text-3xl font-bold text-primary-foreground">{stat.value}</p>
                <p className="text-xs md:text-sm text-primary-foreground/70">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

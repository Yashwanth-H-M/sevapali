import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Ticket, 
  Brain, 
  Mic, 
  FileText, 
  Radio, 
  Languages 
} from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Ticket,
      title: t.features.onlineToken.title,
      description: t.features.onlineToken.description,
      gradient: 'from-primary/10 to-primary/5',
      iconBg: 'bg-primary',
    },
    {
      icon: Brain,
      title: t.features.aiPrediction.title,
      description: t.features.aiPrediction.description,
      gradient: 'from-accent/10 to-accent/5',
      iconBg: 'bg-accent',
    },
    {
      icon: Mic,
      title: t.features.voiceAssistant.title,
      description: t.features.voiceAssistant.description,
      gradient: 'from-success/10 to-success/5',
      iconBg: 'bg-success',
    },
    {
      icon: FileText,
      title: t.features.schemes.title,
      description: t.features.schemes.description,
      gradient: 'from-warning/10 to-warning/5',
      iconBg: 'bg-warning',
    },
    {
      icon: Radio,
      title: t.features.liveQueue.title,
      description: t.features.liveQueue.description,
      gradient: 'from-primary/10 to-accent/5',
      iconBg: 'bg-primary',
    },
    {
      icon: Languages,
      title: t.features.multiLanguage.title,
      description: t.features.multiLanguage.description,
      gradient: 'from-accent/10 to-success/5',
      iconBg: 'bg-accent',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t.features.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.features.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              variant="feature"
              className={`bg-gradient-to-br ${feature.gradient} animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center mb-4 shadow-lg`}>
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

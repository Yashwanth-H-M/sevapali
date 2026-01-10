import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bot, Send, Mic, MicOff, Loader2, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const AIAssistant: React.FC = () => {
  const { language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: language === 'mr'
        ? 'नमस्कार! मी तुमचा AI सहाय्यक आहे. मी तुम्हाला सरकारी सेवा, योजना, आणि कार्यालयांबद्दल माहिती देऊ शकतो. कृपया तुमचा प्रश्न विचारा.'
        : 'Hello! I am your AI assistant. I can help you with information about government services, schemes, and offices. Please ask your question.',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const responses = language === 'mr' ? [
      'आपला प्रश्न समजला. RTO सेवांसाठी, तुम्हाला वाहन नोंदणी, परवाना नूतनीकरण, किंवा वाहन हस्तांतरण यासारख्या सेवा मिळतात. तुम्ही आमच्या "टोकन बुक करा" विभागातून सहज टोकन बुक करू शकता.',
      'शासकीय योजनांबद्दल, महाराष्ट्र सरकारच्या अनेक योजना आहेत जसे की महात्मा फुले जन आरोग्य योजना, लेक लाडकी योजना, आणि शेतकरी सन्मान निधी. "योजना" विभागात तपशील पहा.',
      'तुम्हाला अधिक माहिती हवी असल्यास, कृपया विशिष्ट प्रश्न विचारा. मी तुम्हाला आवश्यक कागदपत्रे, प्रक्रिया, आणि कार्यालयाची माहिती देऊ शकतो.',
    ] : [
      'I understand your query. For RTO services, you can get services like vehicle registration, license renewal, or vehicle transfer. You can easily book a token from our "Book Token" section.',
      'Regarding government schemes, Maharashtra Government offers many schemes like Mahatma Phule Jan Arogya Yojana, Lek Ladki Yojana, and Farmer Samman Nidhi. Check the "Schemes" section for details.',
      'If you need more information, please ask specific questions. I can provide you with required documents, procedures, and office information.',
    ];

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: responses[Math.floor(Math.random() * responses.length)],
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsLoading(false);
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here with Web Speech API
  };

  const quickQuestions = language === 'mr' ? [
    'RTO सेवांबद्दल सांगा',
    'माझ्या योजनेची पात्रता तपासा',
    'आवश्यक कागदपत्रे काय आहेत?',
    'जवळचे कार्यालय शोधा',
  ] : [
    'Tell me about RTO services',
    'Check my scheme eligibility',
    'What documents are required?',
    'Find nearest office',
  ];

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-4rem)] lg:h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-lg">
              <Bot className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                {language === 'mr' ? 'AI सहाय्यक' : 'AI Assistant'}
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-accent" />
                {language === 'mr' ? 'मराठीत बोला' : 'Speak in Marathi'}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[80%] md:max-w-[60%] p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-tr-sm'
                    : 'bg-muted text-foreground rounded-tl-sm'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className={`text-xs mt-2 ${message.role === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                  {message.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                <Bot className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-sm p-4">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length === 1 && (
          <div className="px-4 md:px-6 pb-2">
            <p className="text-sm text-muted-foreground mb-2">
              {language === 'mr' ? 'द्रुत प्रश्न:' : 'Quick questions:'}
            </p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setInputValue(question);
                  }}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 md:p-6 border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="flex gap-2">
            <Button
              variant={isListening ? 'destructive' : 'secondary'}
              size="icon"
              onClick={toggleVoice}
              className="flex-shrink-0"
            >
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Input
              placeholder={language === 'mr' ? 'तुमचा प्रश्न टाइप करा...' : 'Type your question...'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className="flex-shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {language === 'mr'
              ? 'AI सहाय्यक चुकू शकतो. महत्त्वाच्या माहितीची पडताळणी करा.'
              : 'AI assistant may make mistakes. Verify important information.'}
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIAssistant;

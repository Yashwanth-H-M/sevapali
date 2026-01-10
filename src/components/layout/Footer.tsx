import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const { language } = useLanguage();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <span className="font-bold text-lg">स</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">SevaPali</h3>
                <p className="text-xs text-primary-foreground/70">सेवापाली</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/80 mb-4">
              {language === 'mr' 
                ? 'महाराष्ट्र शासनाच्या कार्यालयांसाठी AI-संचालित डिजिटल टोकन आणि रांग व्यवस्थापन प्रणाली.'
                : 'AI-Powered Digital Token & Queue Management System for Maharashtra Government offices.'}
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{language === 'mr' ? 'द्रुत दुवे' : 'Quick Links'}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><Link to="/" className="hover:text-primary-foreground transition-colors">{language === 'mr' ? 'मुख्यपृष्ठ' : 'Home'}</Link></li>
              <li><Link to="/schemes" className="hover:text-primary-foreground transition-colors">{language === 'mr' ? 'शासकीय योजना' : 'Government Schemes'}</Link></li>
              <li><Link to="/login" className="hover:text-primary-foreground transition-colors">{language === 'mr' ? 'लॉगिन' : 'Login'}</Link></li>
              <li><Link to="/about" className="hover:text-primary-foreground transition-colors">{language === 'mr' ? 'आमच्याबद्दल' : 'About Us'}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">{language === 'mr' ? 'सेवा' : 'Services'}</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">{language === 'mr' ? 'आरटीओ सेवा' : 'RTO Services'}</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">{language === 'mr' ? 'तहसील कार्यालय' : 'Tahsil Office'}</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">{language === 'mr' ? 'जिल्हा रुग्णालय' : 'District Hospital'}</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">{language === 'mr' ? 'नगरपालिका' : 'Municipal Corporation'}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{language === 'mr' ? 'संपर्क' : 'Contact'}</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{language === 'mr' ? 'मंत्रालय, मुंबई - 400032' : 'Mantralaya, Mumbai - 400032'}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span>1800-123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span>support@sevapali.gov.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>© 2025 SevaPali - {language === 'mr' ? 'महाराष्ट्र शासन' : 'Government of Maharashtra'}. {language === 'mr' ? 'सर्व हक्क राखीव.' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface Scheme {
  id: number;
  name: string;
  description: string;
  eligibility: string;
  benefits: string;
  category: string;
}

interface EligibilityCheckerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  scheme: Scheme | null;
}

const EligibilityChecker: React.FC<EligibilityCheckerProps> = ({ open, onOpenChange, scheme }) => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ eligible: boolean; reason: string } | null>(null);
  const [formData, setFormData] = useState({
    age: '',
    annualIncome: '',
    occupation: '',
    gender: '',
    district: '',
    category: '',
  });

  const handleCheck = async () => {
    if (!scheme) return;
    
    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('check-eligibility', {
        body: {
          scheme: {
            name: scheme.name,
            eligibility: scheme.eligibility,
            benefits: scheme.benefits,
            category: scheme.category,
          },
          userDetails: formData,
          language,
        },
      });

      if (error) throw error;
      setResult(data);
    } catch (error) {
      console.error('Error checking eligibility:', error);
      setResult({
        eligible: false,
        reason: language === 'mr' 
          ? 'पात्रता तपासताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.'
          : 'Error checking eligibility. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      age: '',
      annualIncome: '',
      occupation: '',
      gender: '',
      district: '',
      category: '',
    });
    setResult(null);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      onOpenChange(open);
      if (!open) resetForm();
    }}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {language === 'mr' ? 'पात्रता तपासा' : 'Check Eligibility'}
          </DialogTitle>
          <DialogDescription>
            {scheme?.name}
          </DialogDescription>
        </DialogHeader>

        {!result ? (
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">{language === 'mr' ? 'वय' : 'Age'}</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder={language === 'mr' ? 'तुमचे वय' : 'Your age'}
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">{language === 'mr' ? 'लिंग' : 'Gender'}</Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder={language === 'mr' ? 'निवडा' : 'Select'} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{language === 'mr' ? 'पुरुष' : 'Male'}</SelectItem>
                    <SelectItem value="female">{language === 'mr' ? 'स्त्री' : 'Female'}</SelectItem>
                    <SelectItem value="other">{language === 'mr' ? 'इतर' : 'Other'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="income">{language === 'mr' ? 'वार्षिक उत्पन्न (₹)' : 'Annual Income (₹)'}</Label>
              <Input
                id="income"
                type="number"
                placeholder={language === 'mr' ? 'वार्षिक उत्पन्न' : 'Annual income'}
                value={formData.annualIncome}
                onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupation">{language === 'mr' ? 'व्यवसाय' : 'Occupation'}</Label>
              <Select value={formData.occupation} onValueChange={(value) => setFormData({ ...formData, occupation: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'mr' ? 'निवडा' : 'Select'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="farmer">{language === 'mr' ? 'शेतकरी' : 'Farmer'}</SelectItem>
                  <SelectItem value="student">{language === 'mr' ? 'विद्यार्थी' : 'Student'}</SelectItem>
                  <SelectItem value="employed">{language === 'mr' ? 'नोकरदार' : 'Employed'}</SelectItem>
                  <SelectItem value="self-employed">{language === 'mr' ? 'स्वयंरोजगार' : 'Self-Employed'}</SelectItem>
                  <SelectItem value="unemployed">{language === 'mr' ? 'बेरोजगार' : 'Unemployed'}</SelectItem>
                  <SelectItem value="homemaker">{language === 'mr' ? 'गृहिणी' : 'Homemaker'}</SelectItem>
                  <SelectItem value="retired">{language === 'mr' ? 'निवृत्त' : 'Retired'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">{language === 'mr' ? 'श्रेणी' : 'Category'}</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'mr' ? 'निवडा' : 'Select'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">{language === 'mr' ? 'सामान्य' : 'General'}</SelectItem>
                  <SelectItem value="obc">{language === 'mr' ? 'ओबीसी' : 'OBC'}</SelectItem>
                  <SelectItem value="sc">{language === 'mr' ? 'एससी' : 'SC'}</SelectItem>
                  <SelectItem value="st">{language === 'mr' ? 'एसटी' : 'ST'}</SelectItem>
                  <SelectItem value="nt">{language === 'mr' ? 'एनटी' : 'NT'}</SelectItem>
                  <SelectItem value="vjnt">{language === 'mr' ? 'व्हीजेएनटी' : 'VJNT'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="district">{language === 'mr' ? 'जिल्हा' : 'District'}</Label>
              <Select value={formData.district} onValueChange={(value) => setFormData({ ...formData, district: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'mr' ? 'निवडा' : 'Select'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mumbai">{language === 'mr' ? 'मुंबई' : 'Mumbai'}</SelectItem>
                  <SelectItem value="pune">{language === 'mr' ? 'पुणे' : 'Pune'}</SelectItem>
                  <SelectItem value="nagpur">{language === 'mr' ? 'नागपूर' : 'Nagpur'}</SelectItem>
                  <SelectItem value="nashik">{language === 'mr' ? 'नाशिक' : 'Nashik'}</SelectItem>
                  <SelectItem value="aurangabad">{language === 'mr' ? 'औरंगाबाद' : 'Aurangabad'}</SelectItem>
                  <SelectItem value="solapur">{language === 'mr' ? 'सोलापूर' : 'Solapur'}</SelectItem>
                  <SelectItem value="kolhapur">{language === 'mr' ? 'कोल्हापूर' : 'Kolhapur'}</SelectItem>
                  <SelectItem value="other">{language === 'mr' ? 'इतर' : 'Other'}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleCheck} disabled={loading} className="w-full">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {language === 'mr' ? 'तपासत आहे...' : 'Checking...'}
                </>
              ) : (
                language === 'mr' ? 'पात्रता तपासा' : 'Check Eligibility'
              )}
            </Button>
          </div>
        ) : (
          <div className="py-6 space-y-4">
            <div className={`flex items-center gap-3 p-4 rounded-lg ${
              result.eligible ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
            }`}>
              {result.eligible ? (
                <CheckCircle className="h-8 w-8 flex-shrink-0" />
              ) : (
                <XCircle className="h-8 w-8 flex-shrink-0" />
              )}
              <div>
                <h3 className="font-semibold text-lg">
                  {result.eligible 
                    ? (language === 'mr' ? 'तुम्ही पात्र आहात!' : 'You are eligible!')
                    : (language === 'mr' ? 'तुम्ही पात्र नाही' : 'You are not eligible')
                  }
                </h3>
              </div>
            </div>
            
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{result.reason}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={resetForm} className="flex-1">
                {language === 'mr' ? 'पुन्हा तपासा' : 'Check Again'}
              </Button>
              {result.eligible && scheme && (
                <Button asChild className="flex-1">
                  <a href={`https://aaplesarkar.mahaonline.gov.in/`} target="_blank" rel="noopener noreferrer">
                    {language === 'mr' ? 'अर्ज करा' : 'Apply Now'}
                  </a>
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EligibilityChecker;

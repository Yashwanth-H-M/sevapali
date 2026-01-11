import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { toast } from 'sonner';
import {
  MapPin,
  FileText,
  CalendarIcon,
  Clock,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Ticket,
  Brain,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useBookToken } from '@/hooks/useTokens';

const BookToken: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [selectedOffice, setSelectedOffice] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSlot, setSelectedSlot] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [tokenDetails, setTokenDetails] = useState<any>(null);

  const offices = [
    { id: 'rto-pune', name: language === 'mr' ? 'आरटीओ पुणे' : 'RTO Pune', address: 'Sangam Bridge, Pune' },
    { id: 'rto-mumbai', name: language === 'mr' ? 'आरटीओ मुंबई' : 'RTO Mumbai', address: 'Andheri East, Mumbai' },
    { id: 'tahsil-pune', name: language === 'mr' ? 'तहसील कार्यालय पुणे' : 'Tahsil Office Pune', address: 'Shivajinagar, Pune' },
    { id: 'hospital-pune', name: language === 'mr' ? 'ससून रुग्णालय' : 'Sassoon Hospital', address: 'Sassoon Road, Pune' },
    { id: 'municipal-pune', name: language === 'mr' ? 'पुणे महानगरपालिका' : 'Pune Municipal Corp', address: 'PMC Building, Pune' },
  ];

  const services: Record<string, { id: string; name: string; duration: number }[]> = {
    'rto-pune': [
      { id: 'vehicle-reg', name: language === 'mr' ? 'वाहन नोंदणी' : 'Vehicle Registration', duration: 30 },
      { id: 'license', name: language === 'mr' ? 'वाहन परवाना' : 'Driving License', duration: 20 },
      { id: 'transfer', name: language === 'mr' ? 'वाहन हस्तांतरण' : 'Vehicle Transfer', duration: 25 },
    ],
    'rto-mumbai': [
      { id: 'vehicle-reg', name: language === 'mr' ? 'वाहन नोंदणी' : 'Vehicle Registration', duration: 30 },
      { id: 'license', name: language === 'mr' ? 'वाहन परवाना' : 'Driving License', duration: 20 },
    ],
    'tahsil-pune': [
      { id: '7-12', name: language === 'mr' ? '७/१२ उतारा' : '7/12 Extract', duration: 15 },
      { id: 'income-cert', name: language === 'mr' ? 'उत्पन्न प्रमाणपत्र' : 'Income Certificate', duration: 20 },
      { id: 'domicile', name: language === 'mr' ? 'अधिवास प्रमाणपत्र' : 'Domicile Certificate', duration: 20 },
    ],
    'hospital-pune': [
      { id: 'opd', name: language === 'mr' ? 'बाह्यरुग्ण विभाग' : 'OPD Consultation', duration: 15 },
      { id: 'report', name: language === 'mr' ? 'अहवाल संकलन' : 'Report Collection', duration: 10 },
    ],
    'municipal-pune': [
      { id: 'birth-cert', name: language === 'mr' ? 'जन्म प्रमाणपत्र' : 'Birth Certificate', duration: 20 },
      { id: 'property-tax', name: language === 'mr' ? 'मालमत्ता कर' : 'Property Tax', duration: 15 },
    ],
  };

  const timeSlots = [
    { id: '09:00', label: '09:00 AM', available: true },
    { id: '09:30', label: '09:30 AM', available: true },
    { id: '10:00', label: '10:00 AM', available: false },
    { id: '10:30', label: '10:30 AM', available: true },
    { id: '11:00', label: '11:00 AM', available: true },
    { id: '11:30', label: '11:30 AM', available: true },
    { id: '14:00', label: '02:00 PM', available: true },
    { id: '14:30', label: '02:30 PM', available: false },
    { id: '15:00', label: '03:00 PM', available: true },
    { id: '15:30', label: '03:30 PM', available: true },
  ];

  const bookTokenMutation = useBookToken();

  const handleBook = async () => {
    setIsBooking(true);
    
    const office = offices.find(o => o.id === selectedOffice);
    const service = services[selectedOffice]?.find(s => s.id === selectedService);
    
    if (!office || !service || !selectedDate) {
      toast.error(language === 'mr' ? 'कृपया सर्व माहिती भरा' : 'Please fill all details');
      setIsBooking(false);
      return;
    }

    try {
      const token = await bookTokenMutation.mutateAsync({
        office_id: selectedOffice,
        office_name: office.name,
        service_id: selectedService,
        service_name: service.name,
        appointment_date: format(selectedDate, 'yyyy-MM-dd'),
        appointment_time: timeSlots.find(s => s.id === selectedSlot)?.label || selectedSlot,
      });

      setTokenDetails({
        tokenNumber: token.token_number,
        office: office.name,
        service: service.name,
        date: selectedDate ? format(selectedDate, 'dd MMM yyyy') : '',
        time: timeSlots.find(s => s.id === selectedSlot)?.label,
        estimatedWait: token.estimated_wait_minutes || Math.floor(15 + Math.random() * 30),
        position: token.position_in_queue || Math.floor(1 + Math.random() * 10),
      });
      
      setBookingComplete(true);
      toast.success(language === 'mr' ? 'टोकन यशस्वीरित्या बुक झाले!' : 'Token booked successfully!');
    } catch (error: any) {
      toast.error(error.message || (language === 'mr' ? 'त्रुटी आली' : 'Error booking token'));
    } finally {
      setIsBooking(false);
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return !!selectedOffice;
      case 2: return !!selectedService;
      case 3: return !!selectedDate;
      case 4: return !!selectedSlot;
      default: return false;
    }
  };

  if (bookingComplete && tokenDetails) {
    return (
      <DashboardLayout>
        <div className="p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
          <Card variant="elevated" className="max-w-md w-full animate-scale-in">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {language === 'mr' ? 'टोकन बुक झाले!' : 'Token Booked!'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {language === 'mr'
                  ? 'तुमचे टोकन यशस्वीरित्या बुक झाले आहे.'
                  : 'Your token has been successfully booked.'}
              </p>

              <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-primary-foreground mb-6">
                <p className="text-sm opacity-80 mb-1">{language === 'mr' ? 'टोकन क्रमांक' : 'Token Number'}</p>
                <p className="text-3xl font-bold font-mono">{tokenDetails.tokenNumber}</p>
              </div>

              <div className="space-y-3 text-left bg-muted/50 rounded-xl p-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === 'mr' ? 'कार्यालय' : 'Office'}</span>
                  <span className="font-medium text-foreground">{tokenDetails.office}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === 'mr' ? 'सेवा' : 'Service'}</span>
                  <span className="font-medium text-foreground">{tokenDetails.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === 'mr' ? 'तारीख' : 'Date'}</span>
                  <span className="font-medium text-foreground">{tokenDetails.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{language === 'mr' ? 'वेळ' : 'Time'}</span>
                  <span className="font-medium text-foreground">{tokenDetails.time}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Brain className="h-4 w-4" />
                    {language === 'mr' ? 'AI अंदाज' : 'AI Estimate'}
                  </span>
                  <span className="font-semibold text-accent">~{tokenDetails.estimatedWait} min</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button className="w-full" onClick={() => navigate('/citizen/my-tokens')}>
                  {language === 'mr' ? 'माझे टोकन पहा' : 'View My Tokens'}
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/citizen/dashboard')}>
                  {language === 'mr' ? 'डॅशबोर्डवर जा' : 'Go to Dashboard'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            {language === 'mr' ? 'टोकन बुक करा' : 'Book Token'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {language === 'mr'
              ? 'ऑनलाइन टोकन बुक करा आणि रांग टाळा'
              : 'Book your token online and skip the queue'}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8 max-w-2xl">
          {[1, 2, 3, 4].map((s) => (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all",
                  step === s ? "bg-primary text-primary-foreground shadow-lg" :
                  step > s ? "bg-success text-success-foreground" :
                  "bg-muted text-muted-foreground"
                )}>
                  {step > s ? <CheckCircle className="h-5 w-5" /> : s}
                </div>
                <span className={cn(
                  "text-xs mt-2 hidden sm:block",
                  step >= s ? "text-foreground" : "text-muted-foreground"
                )}>
                  {s === 1 && (language === 'mr' ? 'कार्यालय' : 'Office')}
                  {s === 2 && (language === 'mr' ? 'सेवा' : 'Service')}
                  {s === 3 && (language === 'mr' ? 'तारीख' : 'Date')}
                  {s === 4 && (language === 'mr' ? 'वेळ' : 'Time')}
                </span>
              </div>
              {s < 4 && (
                <div className={cn(
                  "flex-1 h-1 mx-2 rounded-full",
                  step > s ? "bg-success" : "bg-muted"
                )} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="max-w-2xl">
          {/* Step 1: Select Office */}
          {step === 1 && (
            <Card variant="elevated" className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {language === 'mr' ? 'कार्यालय निवडा' : 'Select Office'}
                </CardTitle>
                <CardDescription>
                  {language === 'mr'
                    ? 'ज्या कार्यालयात जायचे आहे ते निवडा'
                    : 'Choose the office you want to visit'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {offices.map((office) => (
                  <div
                    key={office.id}
                    onClick={() => setSelectedOffice(office.id)}
                    className={cn(
                      "p-4 rounded-xl border-2 cursor-pointer transition-all",
                      selectedOffice === office.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center",
                        selectedOffice === office.id ? "bg-primary text-primary-foreground" : "bg-muted"
                      )}>
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{office.name}</p>
                        <p className="text-sm text-muted-foreground">{office.address}</p>
                      </div>
                      {selectedOffice === office.id && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Step 2: Select Service */}
          {step === 2 && (
            <Card variant="elevated" className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {language === 'mr' ? 'सेवा निवडा' : 'Select Service'}
                </CardTitle>
                <CardDescription>
                  {language === 'mr'
                    ? 'आवश्यक सेवा निवडा'
                    : 'Choose the service you need'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {services[selectedOffice]?.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    className={cn(
                      "p-4 rounded-xl border-2 cursor-pointer transition-all",
                      selectedService === service.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-lg flex items-center justify-center",
                          selectedService === service.id ? "bg-primary text-primary-foreground" : "bg-muted"
                        )}>
                          <FileText className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{service.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ~{service.duration} {language === 'mr' ? 'मिनिटे' : 'min'}
                          </p>
                        </div>
                      </div>
                      {selectedService === service.id && (
                        <CheckCircle className="h-5 w-5 text-primary" />
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Select Date */}
          {step === 3 && (
            <Card variant="elevated" className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  {language === 'mr' ? 'तारीख निवडा' : 'Select Date'}
                </CardTitle>
                <CardDescription>
                  {language === 'mr'
                    ? 'भेटीची तारीख निवडा'
                    : 'Choose your preferred date'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-xl border mx-auto"
                />
              </CardContent>
            </Card>
          )}

          {/* Step 4: Select Time Slot */}
          {step === 4 && (
            <Card variant="elevated" className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  {language === 'mr' ? 'वेळ निवडा' : 'Select Time Slot'}
                </CardTitle>
                <CardDescription>
                  {language === 'mr'
                    ? 'उपलब्ध वेळ स्लॉट निवडा'
                    : 'Choose an available time slot'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && setSelectedSlot(slot.id)}
                      disabled={!slot.available}
                      className={cn(
                        "p-3 rounded-xl text-center transition-all",
                        selectedSlot === slot.id
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : slot.available
                          ? "bg-muted hover:bg-muted/80 text-foreground"
                          : "bg-muted/50 text-muted-foreground cursor-not-allowed line-through"
                      )}
                    >
                      <Clock className="h-4 w-4 mx-auto mb-1" />
                      <span className="text-sm font-medium">{slot.label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              {language === 'mr' ? 'मागे' : 'Back'}
            </Button>

            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
              >
                {language === 'mr' ? 'पुढे' : 'Next'}
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button
                variant="hero"
                onClick={handleBook}
                disabled={!canProceed() || isBooking}
              >
                {isBooking ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    {language === 'mr' ? 'बुक होत आहे...' : 'Booking...'}
                  </span>
                ) : (
                  <>
                    <Ticket className="h-4 w-4" />
                    {language === 'mr' ? 'टोकन बुक करा' : 'Book Token'}
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BookToken;

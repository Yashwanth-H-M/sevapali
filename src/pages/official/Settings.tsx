import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Clock,
  Volume2,
  Save
} from 'lucide-react';
import { toast } from 'sonner';

const Settings: React.FC = () => {
  const { language } = useLanguage();
  const { profile } = useAuth();

  const [settings, setSettings] = useState({
    // Profile
    fullName: profile?.full_name || '',
    phone: profile?.phone || '',
    
    // Notifications
    emailNotifications: true,
    smsNotifications: false,
    soundAlerts: true,
    
    // Queue Settings
    autoCallNext: false,
    callInterval: '30',
    maxQueueSize: '100',
    
    // Display
    showEstimatedWait: true,
    announceToken: true,
  });

  const handleChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    toast.success(language === 'mr' ? 'सेटिंग्ज जतन केल्या' : 'Settings saved successfully');
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
              <SettingsIcon className="h-7 w-7" />
              {language === 'mr' ? 'सेटिंग्ज' : 'Settings'}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'mr' ? 'तुमच्या खात्याची आणि सिस्टम प्राधान्ये व्यवस्थापित करा' : 'Manage your account and system preferences'}
            </p>
          </div>
          <Button variant="hero" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            {language === 'mr' ? 'जतन करा' : 'Save Changes'}
          </Button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Profile Settings */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {language === 'mr' ? 'प्रोफाइल' : 'Profile'}
              </CardTitle>
              <CardDescription>
                {language === 'mr' ? 'तुमची वैयक्तिक माहिती अपडेट करा' : 'Update your personal information'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">{language === 'mr' ? 'पूर्ण नाव' : 'Full Name'}</Label>
                <Input
                  id="fullName"
                  value={settings.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">{language === 'mr' ? 'फोन नंबर' : 'Phone Number'}</Label>
                <Input
                  id="phone"
                  value={settings.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                {language === 'mr' ? 'सूचना' : 'Notifications'}
              </CardTitle>
              <CardDescription>
                {language === 'mr' ? 'तुम्हाला कसे सूचित करायचे ते निवडा' : 'Choose how you want to be notified'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{language === 'mr' ? 'ईमेल सूचना' : 'Email Notifications'}</Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'mr' ? 'महत्त्वाच्या अपडेट्ससाठी ईमेल प्राप्त करा' : 'Receive emails for important updates'}
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleChange('emailNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>{language === 'mr' ? 'SMS सूचना' : 'SMS Notifications'}</Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'mr' ? 'तातडीच्या सूचनांसाठी SMS प्राप्त करा' : 'Receive SMS for urgent notifications'}
                  </p>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) => handleChange('smsNotifications', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>{language === 'mr' ? 'ध्वनी सूचना' : 'Sound Alerts'}</Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'mr' ? 'नवीन टोकनसाठी ध्वनी वाजवा' : 'Play sound for new tokens'}
                  </p>
                </div>
                <Switch
                  checked={settings.soundAlerts}
                  onCheckedChange={(checked) => handleChange('soundAlerts', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Queue Settings */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                {language === 'mr' ? 'रांग सेटिंग्ज' : 'Queue Settings'}
              </CardTitle>
              <CardDescription>
                {language === 'mr' ? 'रांग व्यवस्थापन प्राधान्ये कॉन्फिगर करा' : 'Configure queue management preferences'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{language === 'mr' ? 'स्वयंचलित पुढील कॉल' : 'Auto Call Next'}</Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'mr' ? 'पूर्ण झाल्यावर आपोआप पुढील टोकन कॉल करा' : 'Automatically call next token after completion'}
                  </p>
                </div>
                <Switch
                  checked={settings.autoCallNext}
                  onCheckedChange={(checked) => handleChange('autoCallNext', checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="callInterval">
                  {language === 'mr' ? 'कॉल अंतराल (सेकंद)' : 'Call Interval (seconds)'}
                </Label>
                <Input
                  id="callInterval"
                  type="number"
                  value={settings.callInterval}
                  onChange={(e) => handleChange('callInterval', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxQueueSize">
                  {language === 'mr' ? 'कमाल रांग आकार' : 'Maximum Queue Size'}
                </Label>
                <Input
                  id="maxQueueSize"
                  type="number"
                  value={settings.maxQueueSize}
                  onChange={(e) => handleChange('maxQueueSize', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Display Settings */}
          <Card variant="elevated">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                {language === 'mr' ? 'प्रदर्शन' : 'Display'}
              </CardTitle>
              <CardDescription>
                {language === 'mr' ? 'प्रदर्शन सेटिंग्ज कस्टमाइझ करा' : 'Customize display settings'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{language === 'mr' ? 'अंदाजित प्रतीक्षा दाखवा' : 'Show Estimated Wait'}</Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'mr' ? 'नागरिकांना अंदाजित प्रतीक्षा वेळ दाखवा' : 'Show estimated wait time to citizens'}
                  </p>
                </div>
                <Switch
                  checked={settings.showEstimatedWait}
                  onCheckedChange={(checked) => handleChange('showEstimatedWait', checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>{language === 'mr' ? 'टोकन घोषणा' : 'Announce Token'}</Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'mr' ? 'टोकन नंबर मोठ्याने घोषित करा' : 'Announce token numbers loudly'}
                  </p>
                </div>
                <Switch
                  checked={settings.announceToken}
                  onCheckedChange={(checked) => handleChange('announceToken', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
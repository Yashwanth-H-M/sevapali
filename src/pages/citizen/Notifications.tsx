import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { Bell, Check, Trash2, Clock, Ticket, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Notification {
  id: string;
  type: 'token' | 'alert' | 'success' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const Notifications: React.FC = () => {
  const { language } = useLanguage();
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'token',
      title: language === 'mr' ? 'टोकन तयार' : 'Token Ready',
      message: language === 'mr' ? 'तुमचा टोकन TK-2025-001234 आता सेवेसाठी तयार आहे. कृपया काउंटर 3 वर या.' : 'Your token TK-2025-001234 is now ready for service. Please proceed to Counter 3.',
      time: '5 min ago',
      read: false,
    },
    {
      id: '2',
      type: 'alert',
      title: language === 'mr' ? 'रांग अपडेट' : 'Queue Update',
      message: language === 'mr' ? 'आरटीओ पुणे येथे तुमची रांग स्थिती #4 वरून #2 वर गेली आहे.' : 'Your queue position at RTO Pune has moved from #4 to #2.',
      time: '15 min ago',
      read: false,
    },
    {
      id: '3',
      type: 'success',
      title: language === 'mr' ? 'सेवा पूर्ण' : 'Service Completed',
      message: language === 'mr' ? 'तुमची वाहन नोंदणी सेवा यशस्वीरित्या पूर्ण झाली.' : 'Your vehicle registration service has been completed successfully.',
      time: '1 hour ago',
      read: true,
    },
    {
      id: '4',
      type: 'info',
      title: language === 'mr' ? 'नवीन योजना' : 'New Scheme',
      message: language === 'mr' ? 'शेतकऱ्यांसाठी नवीन अनुदान योजना उपलब्ध आहे. अधिक माहितीसाठी पहा.' : 'A new subsidy scheme for farmers is now available. Check it out for more details.',
      time: '2 hours ago',
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'token': return Ticket;
      case 'alert': return Clock;
      case 'success': return CheckCircle;
      default: return AlertCircle;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'token': return 'bg-primary text-primary-foreground';
      case 'alert': return 'bg-warning text-warning-foreground';
      case 'success': return 'bg-success text-success-foreground';
      default: return 'bg-accent text-accent-foreground';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    toast.success(language === 'mr' ? 'वाचले म्हणून चिन्हांकित केले' : 'Marked as read');
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast.success(language === 'mr' ? 'सर्व वाचले म्हणून चिन्हांकित केले' : 'All marked as read');
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success(language === 'mr' ? 'सूचना हटवली' : 'Notification deleted');
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success(language === 'mr' ? 'सर्व सूचना हटवल्या' : 'All notifications cleared');
  };

  return (
    <DashboardLayout>
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
              <Bell className="h-7 w-7" />
              {language === 'mr' ? 'सूचना' : 'Notifications'}
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">{unreadCount}</Badge>
              )}
            </h1>
            <p className="text-muted-foreground mt-1">
              {language === 'mr' ? 'तुमच्या सर्व सूचना येथे पहा' : 'View all your notifications here'}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <Check className="h-4 w-4 mr-2" />
              {language === 'mr' ? 'सर्व वाचा' : 'Mark All Read'}
            </Button>
            <Button variant="outline" onClick={clearAll} disabled={notifications.length === 0}>
              <Trash2 className="h-4 w-4 mr-2" />
              {language === 'mr' ? 'सर्व हटवा' : 'Clear All'}
            </Button>
          </div>
        </div>

        <Card variant="elevated">
          <CardContent className="p-0">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {language === 'mr' ? 'कोणत्याही सूचना नाहीत' : 'No notifications'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.map((notification) => {
                  const Icon = getIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 flex items-start gap-4 hover:bg-muted/50 transition-colors ${!notification.read ? 'bg-primary/5' : ''}`}
                    >
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getIconColor(notification.type)}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-foreground flex items-center gap-2">
                              {notification.title}
                              {!notification.read && (
                                <Badge variant="default" className="text-xs">
                                  {language === 'mr' ? 'नवीन' : 'New'}
                                </Badge>
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
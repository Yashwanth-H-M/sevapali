export type Language = 'en' | 'mr';

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      services: 'Services',
      schemes: 'Government Schemes',
      about: 'About',
      login: 'Login',
      dashboard: 'Dashboard',
      logout: 'Logout',
    },
    // Hero Section
    hero: {
      badge: 'Digital Maharashtra Initiative',
      title: 'SevaPali',
      subtitle: 'AI-Powered Digital Token & Queue Management System',
      description: 'Skip the lines, save your time. Book tokens online, get AI-predicted wait times, and access government services effortlessly.',
      bookToken: 'Book Token Now',
      exploreSchemes: 'Explore Schemes',
      stats: {
        offices: 'Government Offices',
        citizens: 'Citizens Served',
        timeSaved: 'Hours Saved',
        satisfaction: 'Satisfaction Rate',
      },
    },
    // Features
    features: {
      title: 'Why Choose SevaPali?',
      subtitle: 'Modern solutions for traditional government services',
      onlineToken: {
        title: 'Online Token Booking',
        description: 'Book your token from anywhere, anytime. No more early morning queues.',
      },
      aiPrediction: {
        title: 'AI Wait Time Prediction',
        description: 'Know exactly when to arrive with our accurate AI-powered predictions.',
      },
      voiceAssistant: {
        title: 'Voice Assistant',
        description: 'Speak in Marathi or English. Our AI understands and helps you.',
      },
      schemes: {
        title: 'Scheme Discovery',
        description: 'Find government schemes you are eligible for with AI assistance.',
      },
      liveQueue: {
        title: 'Live Queue Status',
        description: 'Track your position in real-time from your phone.',
      },
      multiLanguage: {
        title: 'Multi-Language',
        description: 'Full support for Marathi, English, and more languages.',
      },
    },
    // Login
    login: {
      title: 'Welcome to SevaPali',
      subtitle: 'Select your role to continue',
      citizen: 'Citizen',
      citizenDesc: 'Book tokens, check queue status, explore schemes',
      official: 'Government Official',
      officialDesc: 'Manage queues, view analytics, serve citizens',
      email: 'Email Address',
      password: 'Password',
      signIn: 'Sign In',
      forgotPassword: 'Forgot Password?',
      noAccount: "Don't have an account?",
      register: 'Register',
    },
    // Dashboard
    dashboard: {
      welcome: 'Welcome back',
      activeTokens: 'Active Tokens',
      avgWaitTime: 'Avg. Wait Time',
      servedToday: 'Served Today',
      pendingQueue: 'Pending in Queue',
      bookNew: 'Book New Token',
      myTokens: 'My Tokens',
      recentActivity: 'Recent Activity',
      aiAssistant: 'AI Assistant',
    },
    // Token Booking
    booking: {
      title: 'Book Your Token',
      selectOffice: 'Select Office',
      selectService: 'Select Service',
      selectDate: 'Select Date',
      selectSlot: 'Select Time Slot',
      confirm: 'Confirm Booking',
      success: 'Token Booked Successfully!',
      tokenNumber: 'Your Token Number',
      estimatedTime: 'Estimated Wait Time',
    },
    // Schemes
    schemes: {
      title: 'Government Schemes',
      subtitle: 'Discover schemes designed for you',
      checkEligibility: 'Check Eligibility',
      apply: 'Apply Now',
      documents: 'Required Documents',
      benefits: 'Benefits',
      newScheme: 'New',
    },
    // Common
    common: {
      loading: 'Loading...',
      error: 'Something went wrong',
      retry: 'Retry',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      close: 'Close',
      search: 'Search',
      filter: 'Filter',
      minutes: 'minutes',
      hours: 'hours',
    },
  },
  mr: {
    // Navigation
    nav: {
      home: 'मुख्यपृष्ठ',
      services: 'सेवा',
      schemes: 'शासकीय योजना',
      about: 'आमच्याबद्दल',
      login: 'लॉगिन',
      dashboard: 'डॅशबोर्ड',
      logout: 'लॉगआउट',
    },
    // Hero Section
    hero: {
      badge: 'डिजिटल महाराष्ट्र उपक्रम',
      title: 'सेवापाली',
      subtitle: 'AI-संचालित डिजिटल टोकन आणि रांग व्यवस्थापन प्रणाली',
      description: 'रांगा टाळा, वेळ वाचवा. ऑनलाइन टोकन बुक करा, AI-अंदाजित प्रतीक्षा वेळ मिळवा आणि सरकारी सेवा सहज मिळवा.',
      bookToken: 'आता टोकन बुक करा',
      exploreSchemes: 'योजना पहा',
      stats: {
        offices: 'सरकारी कार्यालये',
        citizens: 'नागरिक सेवित',
        timeSaved: 'तास वाचले',
        satisfaction: 'समाधान दर',
      },
    },
    // Features
    features: {
      title: 'सेवापाली का निवडावे?',
      subtitle: 'पारंपारिक सरकारी सेवांसाठी आधुनिक उपाय',
      onlineToken: {
        title: 'ऑनलाइन टोकन बुकिंग',
        description: 'कुठूनही, कधीही आपले टोकन बुक करा. सकाळच्या रांगा नाहीत.',
      },
      aiPrediction: {
        title: 'AI प्रतीक्षा वेळ अंदाज',
        description: 'आमच्या अचूक AI-संचालित अंदाजांसह केव्हा यायचे ते जाणून घ्या.',
      },
      voiceAssistant: {
        title: 'व्हॉइस असिस्टंट',
        description: 'मराठी किंवा इंग्रजीत बोला. आमचे AI समजते आणि मदत करते.',
      },
      schemes: {
        title: 'योजना शोध',
        description: 'AI सहाय्याने तुम्ही पात्र असलेल्या सरकारी योजना शोधा.',
      },
      liveQueue: {
        title: 'लाइव्ह रांग स्थिती',
        description: 'तुमच्या फोनवरून रिअल-टाइममध्ये तुमची स्थिती ट्रॅक करा.',
      },
      multiLanguage: {
        title: 'बहु-भाषा',
        description: 'मराठी, इंग्रजी आणि अधिक भाषांसाठी पूर्ण समर्थन.',
      },
    },
    // Login
    login: {
      title: 'सेवापालीमध्ये आपले स्वागत आहे',
      subtitle: 'पुढे जाण्यासाठी तुमची भूमिका निवडा',
      citizen: 'नागरिक',
      citizenDesc: 'टोकन बुक करा, रांग स्थिती तपासा, योजना शोधा',
      official: 'सरकारी अधिकारी',
      officialDesc: 'रांगा व्यवस्थापित करा, विश्लेषण पहा, नागरिकांची सेवा करा',
      email: 'ईमेल पत्ता',
      password: 'पासवर्ड',
      signIn: 'साइन इन',
      forgotPassword: 'पासवर्ड विसरलात?',
      noAccount: 'खाते नाही?',
      register: 'नोंदणी करा',
    },
    // Dashboard
    dashboard: {
      welcome: 'पुन्हा स्वागत आहे',
      activeTokens: 'सक्रिय टोकन',
      avgWaitTime: 'सरासरी प्रतीक्षा वेळ',
      servedToday: 'आज सेवित',
      pendingQueue: 'रांगेत प्रतीक्षारत',
      bookNew: 'नवीन टोकन बुक करा',
      myTokens: 'माझे टोकन',
      recentActivity: 'अलीकडील क्रियाकलाप',
      aiAssistant: 'AI सहाय्यक',
    },
    // Token Booking
    booking: {
      title: 'तुमचे टोकन बुक करा',
      selectOffice: 'कार्यालय निवडा',
      selectService: 'सेवा निवडा',
      selectDate: 'तारीख निवडा',
      selectSlot: 'वेळ स्लॉट निवडा',
      confirm: 'बुकिंग पुष्टी करा',
      success: 'टोकन यशस्वीरित्या बुक झाले!',
      tokenNumber: 'तुमचा टोकन क्रमांक',
      estimatedTime: 'अंदाजित प्रतीक्षा वेळ',
    },
    // Schemes
    schemes: {
      title: 'शासकीय योजना',
      subtitle: 'तुमच्यासाठी तयार केलेल्या योजना शोधा',
      checkEligibility: 'पात्रता तपासा',
      apply: 'आता अर्ज करा',
      documents: 'आवश्यक कागदपत्रे',
      benefits: 'फायदे',
      newScheme: 'नवीन',
    },
    // Common
    common: {
      loading: 'लोड होत आहे...',
      error: 'काहीतरी चूक झाली',
      retry: 'पुन्हा प्रयत्न करा',
      cancel: 'रद्द करा',
      confirm: 'पुष्टी करा',
      save: 'जतन करा',
      close: 'बंद करा',
      search: 'शोधा',
      filter: 'फिल्टर',
      minutes: 'मिनिटे',
      hours: 'तास',
    },
  },
};

export const getTranslation = (lang: Language) => translations[lang];

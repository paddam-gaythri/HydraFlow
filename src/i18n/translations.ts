import { Language } from '../types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav
    appName: 'HydraIST',
    appTagline: 'Hydration Scheduler',
    dashboard: 'Dashboard',
    schedule: 'Schedule',
    history: 'History',
    settings: 'Settings',
    upgrade: 'Upgrade Pro',
    istNotice: 'India Standard Time (IST)',
    timezoneInfo: 'UTC+05:30 (Asia/Kolkata)',

    // Hero
    heroTitle: 'Hydrate Smarter. Live Better.',
    heroSubtitle: 'Your personalized hydration schedule, reminders, and daily progress — all in one place.',
    createScheduleBtn: 'Create My Schedule',
    viewDashboardBtn: 'View Dashboard',

    // Dashboard
    todaysHydration: "Today's Hydration",
    nextReminder: 'Next Reminder',
    nextDrink: 'Next Drink',
    countdownLabel: 'Time Remaining',
    todaysProgress: "Today's Progress",
    completedReminders: 'Completed Reminders',
    remainingReminders: 'Remaining Reminders',
    waterConsumed: 'Total Water Consumed',
    dailyGoal: 'Daily Goal',
    completionRate: 'Completion Rate',
    readyToDrinkBanner: 'It is time for your next drink!',
    markCompleteBtn: 'Mark as Completed',
    snoozeBtn: 'Snooze',
    allDoneToday: 'Great job! You have completed all scheduled hydration reminders for today!',
    upcomingLockedNotice: 'Upcoming reminder. Complete when time arrives.',

    // Timeline Status
    statusCompleted: 'Completed',
    statusReady: 'Ready to Drink',
    statusUpcoming: 'Upcoming',
    statusMissed: 'Missed',
    completeNowBtn: 'Complete Now',

    // Completion Warning Toast
    earlyCompletionWarningTitle: 'Cannot Complete Early',
    earlyCompletionWarningMsg: 'Your hydration reminder is scheduled for {time}. You can mark it complete when the scheduled time arrives.',

    // Reminder Modal
    reminderTitle: '💧 Hydration Time!',
    reminderBody: "It's time to drink water. Drink your scheduled amount and stay hydrated.",
    snooze5m: 'Snooze 5 Min',
    snooze10m: 'Snooze 10 Min',
    snooze15m: 'Snooze 15 Min',

    // Schedule Generator / Setup
    setupTitle: 'Configure Your Hydration Schedule',
    startTimeLabel: 'Start Time',
    endTimeLabel: 'End Time',
    intervalLabel: 'Reminder Interval',
    waterGoalLabel: 'Daily Water Goal (ml)',
    quickOptions: 'Quick Options',
    recalculateBtn: 'Create My Hydration Schedule',
    saveSettingsBtn: 'Save Settings',

    // Validation Errors
    errStartTimeRequired: 'Please select a start time.',
    errEndTimeRequired: 'Please select an end time.',
    errEndTimeBeforeStart: 'End time must be after start time.',
    errGoalInvalid: 'Please enter a valid hydration goal.',
    errIntervalInvalid: 'Please select a valid reminder interval.',

    // Notifications
    enableNotificationsBtn: 'Enable Notifications',
    notificationsEnabledMsg: 'Browser notifications are active.',
    notificationsDisabledMsg: 'Browser notifications are unavailable or blocked. Keep this page open to receive in-app reminders.',

    // History
    historyTitle: 'Hydration History',
    noHistoryYet: 'No hydration history recorded yet. Complete your daily goals to see your streak here.',
    consumedOfGoal: '{consumed} ml of {goal} ml',

    // Settings
    settingsTitle: 'App Preferences',
    hydrationSettingsGroup: 'Hydration Schedule Defaults',
    appearanceGroup: 'Appearance & Theme',
    languageGroup: 'Language',
    notificationsGroup: 'Notifications',
    timezoneGroup: 'Timezone Settings',
    timezoneReadOnlyNote: 'Timezone is locked to India Standard Time (IST, Asia/Kolkata) for accurate local reminders.',
    themeLight: 'Light Mode',
    themeDark: 'Dark Mode',
    themeSystem: 'System Preference',

    // Pricing / Upgrade
    pricingTitle: 'Upgrade Your Hydration Experience',
    pricingSubtitle: 'Choose the plan that best fits your health and wellness goals.',
    freePlanName: 'Free',
    freePlanPrice: '₹0',
    freePlanPeriod: 'forever',
    proPlanName: 'Pro',
    proPlanPrice: '₹99',
    proPlanPeriod: 'per month',
    annualPlanName: 'Annual',
    annualPlanPrice: '₹799',
    annualPlanPeriod: 'per year',
    mostPopularTag: '⭐ Most Popular',
    currentPlanBtn: 'Current Plan',
    upgradeToProBtn: 'Upgrade to Pro',
    upgradeToAnnualBtn: 'Upgrade to Annual',
    demoPaymentModalTitle: 'Payment Gateway Demo',
    demoPaymentModalBody: 'Payment integration is not configured in this demo version. You can explore all Pro features in client preview mode.',
    closeBtn: 'Close',

    // Features List
    featFree1: 'Daily hydration scheduling',
    featFree2: 'Flexible reminder intervals (10-60 mins)',
    featFree3: 'India Standard Time (IST) sync',
    featFree4: 'Light & Dark theme support',
    featFree5: '4 Indian languages (English, Hindi, Gujarati, Telugu)',
    featFree6: 'Local history storage',
    featPro1: 'Advanced hydration analytics & trends',
    featPro2: 'Multiple custom schedule profiles',
    featPro3: 'Custom sound chime presets',
    featPro4: 'Detailed monthly history exports',
    featPro5: 'Personalized wellness dashboard',
    featAnnual1: 'All Pro features included',
    featAnnual2: 'Save over 32% with annual billing',
    featAnnual3: 'Priority feature requests & support',

    // Empty States
    noScheduleTitle: 'No Schedule Created Yet',
    noScheduleSubtitle: 'Create your personalized hydration schedule and stay consistently hydrated throughout the day.',
    createFirstScheduleBtn: 'Create Schedule',

    // Onboarding
    onboardingStep1Title: 'Welcome to HydraIST 💧',
    onboardingStep1Sub: 'Let us set up your personalized daily water schedule according to India Standard Time.',
    getStartedBtn: 'Get Started',
    skipBtn: 'Skip Setup',

    // Medical Disclaimer
    medicalDisclaimer: 'Hydration needs vary by person. This schedule is a general planning tool and is not medical advice.',

    // Footer
    copyright: '© 2026 HydraIST. Built for optimal wellness in India Standard Time.',
  },

  hi: {
    // Nav
    appName: 'हाइड्राआईएसटी',
    appTagline: 'हाइड्रेशन शेड्यूलर',
    dashboard: 'डैशबोर्ड',
    schedule: 'शेड्यूल',
    history: 'इतिहास',
    settings: 'सेटिंग्स',
    upgrade: 'प्रो अपग्रेड',
    istNotice: 'भारतीय मानक समय (IST)',
    timezoneInfo: 'UTC+05:30 (एशिया/कोलकाता)',

    // Hero
    heroTitle: 'स्मार्ट हाइड्रेशन। बेहतर जीवन।',
    heroSubtitle: 'आपका व्यक्तिगत हाइड्रेशन शेड्यूल, रिमाइंडर और दैनिक प्रगति — सब एक ही जगह।',
    createScheduleBtn: 'मेरा शेड्यूल बनाएं',
    viewDashboardBtn: 'डैशबोर्ड देखें',

    // Dashboard
    todaysHydration: 'आज का हाइड्रेशन',
    nextReminder: 'अगला रिमाइंडर',
    nextDrink: 'अगला पेय',
    countdownLabel: 'शेष समय',
    todaysProgress: 'आज की प्रगति',
    completedReminders: 'पूरे किए गए रिमाइंडर',
    remainingReminders: 'शेष रिमाइंडर',
    waterConsumed: 'कुल पीया गया पानी',
    dailyGoal: 'दैनिक लक्ष्य',
    completionRate: 'पूरा होने की दर',
    readyToDrinkBanner: 'आपके अगले पानी पीने का समय हो गया है!',
    markCompleteBtn: 'पूर्ण के रूप में चिह्नित करें',
    snoozeBtn: 'स्नूज़ करें',
    allDoneToday: 'बहुत बढ़िया! आपने आज के सभी निर्धारित हाइड्रेशन रिमाइंडर पूरे कर लिए हैं!',
    upcomingLockedNotice: 'आगामी रिमाइंडर। समय आने पर पूरा करें।',

    // Timeline Status
    statusCompleted: 'पूरा हुआ',
    statusReady: 'पीने के लिए तैयार',
    statusUpcoming: 'आगामी',
    statusMissed: 'छूट गया',
    completeNowBtn: 'अभी पूरा करें',

    // Completion Warning Toast
    earlyCompletionWarningTitle: 'समय से पहले पूरा नहीं कर सकते',
    earlyCompletionWarningMsg: 'आपका हाइड्रेशन रिमाइंडर {time} के लिए निर्धारित है। समय आने पर आप इसे पूरा कर सकते हैं।',

    // Reminder Modal
    reminderTitle: '💧 पानी पीने का समय!',
    reminderBody: 'पानी पीने का समय हो गया है। अपनी निर्धारित मात्रा पिएं और हाइड्रेटेड रहें।',
    snooze5m: '5 मिनट स्नूज़',
    snooze10m: '10 मिनट स्नूज़',
    snooze15m: '15 मिनट स्नूज़',

    // Schedule Generator / Setup
    setupTitle: 'अपना हाइड्रेशन शेड्यूल कॉन्फ़िगर करें',
    startTimeLabel: 'शुरू होने का समय',
    endTimeLabel: 'समाप्त होने का समय',
    intervalLabel: 'रिमाइंडर अंतराल',
    waterGoalLabel: 'दैनिक जल लक्ष्य (मि.ली.)',
    quickOptions: 'त्वरित विकल्प',
    recalculateBtn: 'मेरा हाइड्रेशन शेड्यूल बनाएं',
    saveSettingsBtn: 'सेटिंग्स सहेजें',

    // Validation Errors
    errStartTimeRequired: 'कृपया प्रारंभ समय चुनें।',
    errEndTimeRequired: 'कृपया समाप्ति समय चुनें।',
    errEndTimeBeforeStart: 'समाप्ति समय प्रारंभ समय के बाद होना चाहिए।',
    errGoalInvalid: 'कृपया एक मान्य जल लक्ष्य दर्ज करें।',
    errIntervalInvalid: 'कृपया एक मान्य रिमाइंडर अंतराल चुनें।',

    // Notifications
    enableNotificationsBtn: 'सूचनाएं सक्षम करें',
    notificationsEnabledMsg: 'ब्राउज़र सूचनाएं सक्रिय हैं।',
    notificationsDisabledMsg: 'ब्राउज़र सूचनाएं उपलब्ध नहीं हैं। इन-ऐप रिमाइंडर प्राप्त करने के लिए इस पेज को खुला रखें।',

    // History
    historyTitle: 'हाइड्रेशन इतिहास',
    noHistoryYet: 'अभी तक कोई हाइड्रेशन इतिहास दर्ज नहीं किया गया है।',
    consumedOfGoal: '{consumed} मि.ली. / {goal} मि.ली.',

    // Settings
    settingsTitle: 'ऐप प्राथमिकताएं',
    hydrationSettingsGroup: 'हाइड्रेशन शेड्यूल सेटिंग्स',
    appearanceGroup: 'रंग और थीम',
    languageGroup: 'भाषा (Language)',
    notificationsGroup: 'सूचनाएं',
    timezoneGroup: 'समय क्षेत्र सेटिंग्स',
    timezoneReadOnlyNote: 'सटीक स्थानीय रिमाइंडरों के लिए समय क्षेत्र भारतीय मानक समय (IST) पर निर्धारित है।',
    themeLight: 'लाइट मोड',
    themeDark: 'डार्क मोड',
    themeSystem: 'सिस्टम प्राथमिकता',

    // Pricing / Upgrade
    pricingTitle: 'अपना हाइड्रेशन अनुभव अपग्रेड करें',
    pricingSubtitle: 'अपनी स्वास्थ्य आवश्यकताओं के अनुसार सही प्लान चुनें।',
    freePlanName: 'मुफ़्त',
    freePlanPrice: '₹0',
    freePlanPeriod: 'हमेशा के लिए',
    proPlanName: 'प्रो',
    proPlanPrice: '₹99',
    proPlanPeriod: 'प्रति माह',
    annualPlanName: 'वार्षिक',
    annualPlanPrice: '₹799',
    annualPlanPeriod: 'प्रति वर्ष',
    mostPopularTag: '⭐ सबसे लोकप्रिय',
    currentPlanBtn: 'वर्तमान प्लान',
    upgradeToProBtn: 'प्रो में अपग्रेड करें',
    upgradeToAnnualBtn: 'वार्षिक प्लान लें',
    demoPaymentModalTitle: 'भुगतान गेटवे डेमो',
    demoPaymentModalBody: 'इस डेमो संस्करण में भुगतान एकीकरण कॉन्फ़िगर नहीं किया गया है।',
    closeBtn: 'बंद करें',

    // Features List
    featFree1: 'दैनिक हाइड्रेशन शेड्यूलिंग',
    featFree2: 'लचीला रिमाइंडर अंतराल (10-60 मिनट)',
    featFree3: 'भारतीय मानक समय (IST) सिंक',
    featFree4: 'लाइट और डार्क थीम',
    featFree5: '4 भारतीय भाषाएं',
    featFree6: 'स्थानीय इतिहास संग्रहण',
    featPro1: 'उन्नत हाइड्रेशन विश्लेषण',
    featPro2: 'कस्टम शेड्यूल प्रोफाइल',
    featPro3: 'कस्टम टोन ध्वनि',
    featPro4: 'विस्तृत इतिहास रिपोर्ट',
    featPro5: 'व्यक्तिगत डैशबोर्ड',
    featAnnual1: 'सभी प्रो सुविधाएं शामिल',
    featAnnual2: 'वार्षिक बिलिंग पर 32% से अधिक की बचत',
    featAnnual3: 'प्राथमिकता सहायता',

    // Empty States
    noScheduleTitle: 'अभी तक कोई शेड्यूल नहीं बना है',
    noScheduleSubtitle: 'अपना व्यक्तिगत हाइड्रेशन शेड्यूल बनाएं और पूरे दिन हाइड्रेटेड रहें।',
    createFirstScheduleBtn: 'शेड्यूल बनाएं',

    // Onboarding
    onboardingStep1Title: 'हाइड्राआईएसटी में आपका स्वागत है 💧',
    onboardingStep1Sub: 'भारतीय मानक समय के अनुसार अपना व्यक्तिगत दैनिक जल शेड्यूल सेट करें।',
    getStartedBtn: 'शुरू करें',
    skipBtn: 'छोड़ें',

    // Medical Disclaimer
    medicalDisclaimer: 'हाइड्रेशन की जरूरतें हर व्यक्ति में भिन्न होती हैं। यह शेड्यूल सामान्य योजना उपकरण है और चिकित्सीय सलाह नहीं है।',

    // Footer
    copyright: '© 2026 हाइड्राआईएसटी। भारतीय मानक समय के लिए निर्मित।',
  },

  gu: {
    // Nav
    appName: 'હાઇડ્રાઆઇએસટી',
    appTagline: 'હાઇડ્રેશન શિડ્યુલર',
    dashboard: 'ડૅશબોર્ડ',
    schedule: 'શિડ્યુલ',
    history: 'ઇતિહાસ',
    settings: 'સેટિંગ્સ',
    upgrade: 'પ્રો અપગ્રેડ',
    istNotice: 'ભારતીય પ્રમાણભૂત સમય (IST)',
    timezoneInfo: 'UTC+05:30 (એશિયા/કોલકાતા)',

    // Hero
    heroTitle: 'સ્માર્ટ હાઇડ્રેશન. બહેતર જીવન.',
    heroSubtitle: 'તમારું વ્યક્તિગત હાઇડ્રેશન શિડ્યુલ, રિમાઇન્ડર્સ અને દૈનિક પ્રગતિ — બધું એક જ જગ્યાએ.',
    createScheduleBtn: 'મારું શિડ્યુલ બનાવો',
    viewDashboardBtn: 'ડૅશબોર્ડ જુઓ',

    // Dashboard
    todaysHydration: 'આજનું હાઇડ્રેશન',
    nextReminder: 'આગામી રિમાઇન્ડર',
    nextDrink: 'આગામી પાણી',
    countdownLabel: 'બાકી સમય',
    todaysProgress: 'આજની પ્રગતિ',
    completedReminders: 'પૂર્ણ થયેલ રિમાઇન્ડર્સ',
    remainingReminders: 'બાકી રિમાઇન્ડર્સ',
    waterConsumed: 'કુલ પીધેલું પાણી',
    dailyGoal: 'દૈનિક લક્ષ્ય',
    completionRate: 'પૂર્ણતા દર',
    readyToDrinkBanner: 'તમારા આગામી પાણી પીવાનો સમય થઈ ગયો છે!',
    markCompleteBtn: 'પૂર્ણ તરીકે માર્ક કરો',
    snoozeBtn: 'સ્નૂઝ કરો',
    allDoneToday: 'ખૂબ સરસ! તમે આજના તમામ રિમાઇન્ડર્સ પૂર્ણ કર્યા છે!',
    upcomingLockedNotice: 'આગામી રિમાઇન્ડર. સમય આવે ત્યારે પૂર્ણ કરો.',

    // Timeline Status
    statusCompleted: 'પૂર્ણ થયું',
    statusReady: 'પીવા માટે તૈયાર',
    statusUpcoming: 'આગામી',
    statusMissed: 'ચૂકી ગયા',
    completeNowBtn: 'હમણાં પૂર્ણ કરો',

    // Completion Warning Toast
    earlyCompletionWarningTitle: 'વહેલા પૂર્ણ કરી શકાતું નથી',
    earlyCompletionWarningMsg: 'તમારું રિમાઇન્ડર {time} વાગ્યા માટે છે. સમય આવે ત્યારે જ પૂર્ણ કરી શકાશે.',

    // Reminder Modal
    reminderTitle: '💧 પાણી પીવાનો સમય!',
    reminderBody: 'પાણી પીવાનો સમય થઈ ગયો છે. યોગ્ય માત્રામાં પાણી પીઓ અને હાઇડ્રેટેડ રહો.',
    snooze5m: '5 મિનિટ સ્નૂઝ',
    snooze10m: '10 મિનિટ સ્નૂઝ',
    snooze15m: '15 મિનિટ સ્નૂઝ',

    // Schedule Generator / Setup
    setupTitle: 'તમારું હાઇડ્રેશન શિડ્યુલ સેટ કરો',
    startTimeLabel: 'શરૂઆતનો સમય',
    endTimeLabel: 'અંતનો સમય',
    intervalLabel: 'રિમાઇન્ડર સમયગાળો',
    waterGoalLabel: 'દૈનિક પાણીનું લક્ષ્ય (ml)',
    quickOptions: 'ઝડપી વિકલ્પો',
    recalculateBtn: 'મારું શિડ્યુલ બનાવો',
    saveSettingsBtn: 'સેટિંગ્સ સાચવો',

    // Validation Errors
    errStartTimeRequired: 'કૃપા કરીને શરૂઆતનો સમય પસંદ કરો.',
    errEndTimeRequired: 'કૃપા કરીને અંતનો સમય પસંદ કરો.',
    errEndTimeBeforeStart: 'અંતનો સમય શરૂઆતના સમય પછીનો હોવો જોઈએ.',
    errGoalInvalid: 'કૃપા કરીને માન્ય લક્ષ્ય દાખલ કરો.',
    errIntervalInvalid: 'કૃપા કરીને માન્ય સમયગાળો પસંદ કરો.',

    // Notifications
    enableNotificationsBtn: 'નોટિફિકેશન ચાલુ કરો',
    notificationsEnabledMsg: 'બ્રાઉઝર નોટિફિકેશન ચાલુ છે.',
    notificationsDisabledMsg: 'બ્રાઉઝર નોટિફિકેશન ઉપલબ્ધ નથી. ઇન-એપ રિમાઇન્ડર માટે આ પેજ ખુલ્લું રાખો.',

    // History
    historyTitle: 'હાઇડ્રેશન ઇતિહાસ',
    noHistoryYet: 'હજુ સુધી કોઈ ઇતિહાસ નોંધાયેલ નથી.',
    consumedOfGoal: '{consumed} ml / {goal} ml',

    // Settings
    settingsTitle: 'એપ સેટિંગ્સ',
    hydrationSettingsGroup: 'હાઇડ્રેશન શિડ્યુલ સેટિંગ્સ',
    appearanceGroup: 'થીમ સેટિંગ્સ',
    languageGroup: 'ભાષા (Language)',
    notificationsGroup: 'નોટિફિકેશન',
    timezoneGroup: 'ટાઇમઝોન સેટિંગ્સ',
    timezoneReadOnlyNote: 'ભારતીય પ્રમાણભૂત સમય (IST) પર ટાઇમઝોન સેટ છે.',
    themeLight: 'લાઇટ મોડ',
    themeDark: 'ડાર્ક મોડ',
    themeSystem: 'સિસ્ટમ થીમ',

    // Pricing / Upgrade
    pricingTitle: 'તમારો પ્લાન અપગ્રેડ કરો',
    pricingSubtitle: 'તમારી જરૂરિયાત મુજબ શ્રેષ્ઠ પ્લાન પસંદ કરો.',
    freePlanName: 'મફત',
    freePlanPrice: '₹0',
    freePlanPeriod: 'કાયમ માટે',
    proPlanName: 'પ્રો',
    proPlanPrice: '₹99',
    proPlanPeriod: 'દર મહિને',
    annualPlanName: 'વાર્ષિક',
    annualPlanPrice: '₹799',
    annualPlanPeriod: 'દર વર્ષે',
    mostPopularTag: '⭐ સૌથી વધુ લોકપ્રિય',
    currentPlanBtn: 'વર્તમાન પ્લાન',
    upgradeToProBtn: 'પ્રો માં અપગ્રેડ કરો',
    upgradeToAnnualBtn: 'વાર્ષિક પ્લાન લો',
    demoPaymentModalTitle: 'પેમેન્ટ ગેટવે ડેમો',
    demoPaymentModalBody: 'આ ડેમો વર્ઝનમાં પેમેન્ટ સુવિધા ઉપલબ્ધ નથી.',
    closeBtn: 'બંધ કરો',

    // Features List
    featFree1: 'દૈનિક હાઇડ્રેશન શિડ્યુલિંગ',
    featFree2: '10-60 મિનિટ રિમાઇન્ડર્સ',
    featFree3: 'IST સમય સિંક',
    featFree4: 'લાઇટ અને ડાર્ક થીમ',
    featFree5: '4 ભારતીય ભાષાઓ',
    featFree6: 'લોકલ હિસ્ટ્રી સંગ્રહ',
    featPro1: 'અદ્યતન એનાલિટિક્સ',
    featPro2: 'કસ્ટમ પ્રોફાઇલ',
    featPro3: 'કસ્ટમ રિંગટોન',
    featPro4: 'વિગતવાર રિપોર્ટ',
    featPro5: 'પર્સનલ ડૅશબોર્ડ',
    featAnnual1: 'તમામ પ્રો ફીચર્સ સામેલ',
    featAnnual2: '32% થી વધુ બચત',
    featAnnual3: 'પ્રાધાન્ય સપોર્ટ',

    // Empty States
    noScheduleTitle: 'હજુ સુધી શિડ્યુલ બનાવ્યું નથી',
    noScheduleSubtitle: 'તમારું વ્યક્તિગત હાઇડ્રેશન શિડ્યુલ બનાવો અને આખો દિવસ હાઇડ્રેટેડ રહો.',
    createFirstScheduleBtn: 'શિડ્યુલ બનાવો',

    // Onboarding
    onboardingStep1Title: 'હાઇડ્રાઆઇએસટી માં સ્વાગત છે 💧',
    onboardingStep1Sub: 'ભારતીય પ્રમાણભૂત સમય મુજબ તમારું દૈનિક પાણી પીવાનું શિડ્યુલ ગોઠવો.',
    getStartedBtn: 'શરૂ કરો',
    skipBtn: 'છોડો',

    // Medical Disclaimer
    medicalDisclaimer: 'હાઇડ્રેશનની જરૂરિયાતો વ્યક્તિગત હોય છે. આ શિડ્યુલ સામાન્ય પ્લાનિંગ ટૂલ છે, કોઈ તબીબી સલાહ નથી.',

    // Footer
    copyright: '© 2026 હાઇડ્રાઆઇએસટી. ભારતીય સમય માટે બનાવવામાં આવ્યું છે.',
  },

  te: {
    // Nav
    appName: 'హైడ్రాఐఎస్‌టీ',
    appTagline: 'హైడ్రేషన్ షెడ్యూలర్',
    dashboard: 'డాష్‌బోర్డ్',
    schedule: 'షెడ్యూల్',
    history: 'చరిత్ర',
    settings: 'సెట్టింగ్‌లు',
    upgrade: 'ప్రో అప్‌గ్రేడ్',
    istNotice: 'భారత ప్రామాణిక సమయం (IST)',
    timezoneInfo: 'UTC+05:30 (ఆసియా/కోల్‌కతా)',

    // Hero
    heroTitle: 'స్మార్ట్ హైడ్రేషన్. మెరుగైన జీవితం.',
    heroSubtitle: 'మీ వ్యక్తిగత హైడ్రేషన్ షెడ్యూల్, రిమైండర్లు మరియు రోజువారీ పురోగతి — అన్నీ ఒకే చోట.',
    createScheduleBtn: 'నా షెడ్యూల్ సృష్టించండి',
    viewDashboardBtn: 'డాష్‌బోర్డ్ చూడండి',

    // Dashboard
    todaysHydration: 'ఈరోజు హైడ్రేషన్',
    nextReminder: 'తదుపరి రిమైండర్',
    nextDrink: 'తదుపరి మంచి నీరు',
    countdownLabel: 'మిగిలిన సమయం',
    todaysProgress: 'ఈరోజు పురోగతి',
    completedReminders: 'పూర్తయిన రిమైండర్లు',
    remainingReminders: 'మిగిలిన రిమైండర్లు',
    waterConsumed: 'మొత్తం తాగిన నీరు',
    dailyGoal: 'రోజువారీ లక్ష్యం',
    completionRate: 'పూర్తి శాతం',
    readyToDrinkBanner: 'మీ తదుపరి నీరు తాగే సమయం అయింది!',
    markCompleteBtn: 'పూర్తయినట్లు మార్క్ చేయండి',
    snoozeBtn: 'స్నూజ్ చేయండి',
    allDoneToday: 'శభాష్! మీరు ఈరోజు కోసం కేటాయించిన అన్ని రిమైండర్లను పూర్తి చేసారు!',
    upcomingLockedNotice: 'రాబోయే రిమైండర్. సమయం వచ్చినప్పుడు పూర్తి చేయండి.',

    // Timeline Status
    statusCompleted: 'పూర్తయింది',
    statusReady: 'తాగాడానికి సిద్ధం',
    statusUpcoming: 'రాబోయేది',
    statusMissed: 'మిస్ అయింది',
    completeNowBtn: 'ఇప్పుడే పూర్తి చేయండి',

    // Completion Warning Toast
    earlyCompletionWarningTitle: 'ముందే పూర్తి చేయలేరు',
    earlyCompletionWarningMsg: 'మీ రిమైండర్ {time} కి షెడ్యూల్ చేయబడింది. సమయం వచ్చినప్పుడు మాత్రమే పూర్తి చేయగలరు.',

    // Reminder Modal
    reminderTitle: '💧 నీరు తాగే సమయం!',
    reminderBody: 'నీరు తాగే సమయం అయింది. కేటాయించిన పరిమాణంలో నీరు తాగి ఆరోగ్యంగా ఉండండి.',
    snooze5m: '5 నిమిషాలు స్నూజ్',
    snooze10m: '10 నిమిషాలు స్నూజ్',
    snooze15m: '15 నిమిషాలు స్నూజ్',

    // Schedule Generator / Setup
    setupTitle: 'మీ హైడ్రేషన్ షెడ్యూల్‌ను సెట్ చేయండి',
    startTimeLabel: 'ప్రారంభ సమయం',
    endTimeLabel: 'ముగింపు సమయం',
    intervalLabel: 'రిమైండర్ వ్యవధి',
    waterGoalLabel: 'రోజువారీ నీటి లక్ష్యం (మి.లీ.)',
    quickOptions: 'త్వరిత ఎంపికలు',
    recalculateBtn: 'నా షెడ్యూల్‌ను సృష్టించండి',
    saveSettingsBtn: 'సెట్టింగ్‌లు సేవ్ చేయండి',

    // Validation Errors
    errStartTimeRequired: 'దయచేసి ప్రారంభ సమయాన్ని ఎంచుకోండి.',
    errEndTimeRequired: 'దయచేసి ముగింపు సమయాన్ని ఎంచుకోండి.',
    errEndTimeBeforeStart: 'ముగింపు సమయం ప్రారంభ సమయం తర్వాత ఉండాలి.',
    errGoalInvalid: 'దయచేసి సరైన లక్ష్యాన్ని నమోదు చేయండి.',
    errIntervalInvalid: 'దయచేసి సరైన వ్యవధిని ఎంచుకోండి.',

    // Notifications
    enableNotificationsBtn: 'నోటిఫికేషన్‌లను ప్రారంభించండి',
    notificationsEnabledMsg: 'బ్రౌజర్ నోటిఫికేషన్‌లు యాక్టివ్‌గా ఉన్నాయి.',
    notificationsDisabledMsg: 'బ్రౌజర్ నోటిఫికేషన్‌లు అందుబాటులో లేవు. యాప్‌లో రిమైండర్‌లను పొందడానికి ఈ పేజీని తెరిచి ఉంచండి.',

    // History
    historyTitle: 'హైడ్రేషన్ చరిత్ర',
    noHistoryYet: 'ఇంకా ఎలాంటి చరిత్ర నమోదవలేదు.',
    consumedOfGoal: '{consumed} మి.లీ. / {goal} మి.లీ.',

    // Settings
    settingsTitle: 'యాప్ ప్రాధాన్యతలు',
    hydrationSettingsGroup: 'హైడ్రేషన్ షెడ్యూల్ సెట్టింగ్‌లు',
    appearanceGroup: 'థీమ్ సెట్టింగ్‌లు',
    languageGroup: 'భాష (Language)',
    notificationsGroup: 'నోటిఫికేషన్‌లు',
    timezoneGroup: 'టైమ్‌జోన్ సెట్టింగ్‌లు',
    timezoneReadOnlyNote: 'భారత ప్రామాణిక సమయం (IST) లో టైమ్‌జోన్ లాక్ చేయబడింది.',
    themeLight: 'లైట్ మోడ్',
    themeDark: 'డార్క్ మోడ్',
    themeSystem: 'సిస్టమ్ ప్రాధాన్యత',

    // Pricing / Upgrade
    pricingTitle: 'మీ హైడ్రేషన్ అనుభవాన్ని అప్‌గ్రేడ్ చేయండి',
    pricingSubtitle: 'మీ ఆరోగ్య అవసరాలకు తగిన ప్లాన్‌ను ఎంచుకోండి.',
    freePlanName: 'ఉచితం',
    freePlanPrice: '₹0',
    freePlanPeriod: 'ఎల్లప్పటికీ',
    proPlanName: 'ప్రో',
    proPlanPrice: '₹99',
    proPlanPeriod: 'నెలకు',
    annualPlanName: 'వార్షిక',
    annualPlanPrice: '₹799',
    annualPlanPeriod: 'సంవత్సరానికి',
    mostPopularTag: '⭐ అత్యంత ప్రజాదరణ పొందినది',
    currentPlanBtn: 'ప్రస్తుత ప్లాన్',
    upgradeToProBtn: 'ప్రో కి అప్‌గ్రేడ్ అవ్వండి',
    upgradeToAnnualBtn: 'వార్షిక ప్లాన్ తీసుకోండి',
    demoPaymentModalTitle: 'పేమెంట్ గేట్‌వే డెమో',
    demoPaymentModalBody: 'ఈ డెమో వెర్షన్‌లో పేమెంట్ ఆప్షన్ అందుబాటులో లేదు.',
    closeBtn: 'మూసివేయండి',

    // Features List
    featFree1: 'రోజువారీ హైడ్రేషన్ షెడ్యూలింగ్',
    featFree2: '10-60 నిమిషాల రిమైండర్లు',
    featFree3: 'IST సమయం సింక్',
    featFree4: 'లైట్ మరియు డార్క్ థీమ్',
    featFree5: '4 భారతీయ భాషలు',
    featFree6: 'లోకల్ హిస్టరీ నిల్వ',
    featPro1: 'అడ్వాన్స్డ్ అనలిటిక్స్',
    featPro2: 'కస్టమ్ షెడ్యూల్ ప్రొఫైల్స్',
    featPro3: 'కస్టమ్ రింగ్‌టోన్‌లు',
    featPro4: 'వివరమైన రిపోర్టులు',
    featPro5: 'వ్యక్తిగత డాష్‌బోర్డ్',
    featAnnual1: 'అన్ని ప్రో ఫీచర్లు చేర్చబడ్డాయి',
    featAnnual2: '32% కంటే ఎక్కువ ఆదా',
    featAnnual3: 'ప్రాధాన్యత మద్దతు',

    // Empty States
    noScheduleTitle: 'ఇంకా షెడ్యూల్ సృష్టించబడలేదు',
    noScheduleSubtitle: 'మీ వ్యక్తిగత హైడ్రేషన్ షెడ్యూల్‌ను సృష్టించండి మరియు రోజంతా తగినంత నీరు తాగండి.',
    createFirstScheduleBtn: 'షెడ్యూల్ సృష్టించండి',

    // Onboarding
    onboardingStep1Title: 'హైడ్రాఐఎస్‌టీ కి స్వాగతం 💧',
    onboardingStep1Sub: 'భారత ప్రామాణిక సమయం ప్రకారం మీ నీరు తాగే రోజువారీ షెడ్యూల్‌ను అమర్చుకోండి.',
    getStartedBtn: 'ప్రారంభించండి',
    skipBtn: 'దాటవేయి',

    // Medical Disclaimer
    medicalDisclaimer: 'హైడ్రేషన్ అవసరాలు వ్యక్తిని బట్టి మారతాయి. ఈ షెడ్యూల్ ప్రణాళిక సాధనం మాత్రమే, వైద్య సలహా కాదు.',

    // Footer
    copyright: '© 2026 హైడ్రాఐఎస్‌టీ. భారత సమయం కోసం రూపొందించబడింది.',
  },
};

export function getTranslation(lang: Language, key: string, params?: Record<string, string>): string {
  const dict = translations[lang] || translations.en;
  let text = dict[key] || translations.en[key] || key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    });
  }
  return text;
}

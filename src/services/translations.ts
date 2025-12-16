export type Language = 'hindi' | 'english';

export const translations = {
  english: {
    // Welcome Page
    welcome: 'Welcome',
    healthKiosk: 'AI Health Access Kiosk',
    selectLanguage: 'Select Language',
    startConsultation: 'Start Consultation',
    
    // Symptom Page
    enterSymptoms: 'Enter Your Symptoms',
    tellUsMore: 'Tell us about how you are feeling',
    mainSymptom: 'Main Symptom',
    selectSymptom: 'Select your main symptom',
    fever: 'Fever',
    chestPain: 'Chest Pain',
    jointPain: 'Joint Pain',
    stomachPain: 'Stomach Pain',
    duration: 'Duration',
    selectDuration: 'How long have you had this symptom?',
    days12: '1-2 days',
    days37: '3-7 days',
    days7plus: 'More than 7 days',
    severity: 'Severity',
    selectSeverity: 'How severe is your symptom?',
    mild: 'Mild',
    moderate: 'Moderate',
    severe: 'Severe',
    submit: 'Submit',
    analyzing: 'Analyzing...',
    
    // Guidance Page
    healthGuidance: 'Health Guidance',
    analysisResult: 'Based on your symptoms',
    possibleCondition: 'Possible Condition',
    recommendedSpecialty: 'Recommended Specialty',
    importantNotice: 'Important Notice',
    disclaimer: 'This is not a medical diagnosis. Please consult a qualified doctor for proper evaluation and treatment.',
    findFacility: 'Find Nearby Facility',
    
    // Facility Page
    nearbyFacilities: 'Nearby Facilities',
    selectFacility: 'Select a healthcare facility',
    distance: 'Distance',
    specialties: 'Specialties',
    selectThisFacility: 'Select This Facility',
    
    // Appointment Page
    bookAppointment: 'Book Appointment',
    selectDateTime: 'Select your preferred date and time',
    selectDate: 'Select Date',
    selectTime: 'Select Time',
    confirmBooking: 'Confirm Booking',
    booking: 'Booking...',
    
    // Confirmation Page
    appointmentConfirmed: 'Appointment Confirmed!',
    yourReferenceId: 'Your Reference ID',
    appointmentDetails: 'Appointment Details',
    facility: 'Facility',
    date: 'Date',
    time: 'Time',
    specialty: 'Specialty',
    instructions: 'Instructions for Hospital Visit',
    instruction1: 'Arrive 15 minutes before your appointment time',
    instruction2: 'Bring your Reference ID and any ID proof',
    instruction3: 'Carry any previous medical records if available',
    instruction4: 'Wear a mask and follow COVID-19 guidelines',
    printReceipt: 'Print Receipt',
    startNew: 'Start New Consultation',
    
    // Common
    back: 'Back',
    loading: 'Loading...',
    error: 'An error occurred. Please try again.',
  },
  hindi: {
    // Welcome Page
    welcome: 'स्वागत है',
    healthKiosk: 'AI स्वास्थ्य सहायता कियोस्क',
    selectLanguage: 'भाषा चुनें',
    startConsultation: 'परामर्श शुरू करें',
    
    // Symptom Page
    enterSymptoms: 'अपने लक्षण दर्ज करें',
    tellUsMore: 'हमें बताएं आप कैसा महसूस कर रहे हैं',
    mainSymptom: 'मुख्य लक्षण',
    selectSymptom: 'अपना मुख्य लक्षण चुनें',
    fever: 'बुखार',
    chestPain: 'सीने में दर्द',
    jointPain: 'जोड़ों का दर्द',
    stomachPain: 'पेट दर्द',
    duration: 'अवधि',
    selectDuration: 'यह लक्षण कितने दिनों से है?',
    days12: '1-2 दिन',
    days37: '3-7 दिन',
    days7plus: '7 दिन से अधिक',
    severity: 'गंभीरता',
    selectSeverity: 'लक्षण कितना गंभीर है?',
    mild: 'हल्का',
    moderate: 'मध्यम',
    severe: 'गंभीर',
    submit: 'जमा करें',
    analyzing: 'विश्लेषण हो रहा है...',
    
    // Guidance Page
    healthGuidance: 'स्वास्थ्य मार्गदर्शन',
    analysisResult: 'आपके लक्षणों के आधार पर',
    possibleCondition: 'संभावित स्थिति',
    recommendedSpecialty: 'सुझाई गई विशेषज्ञता',
    importantNotice: 'महत्वपूर्ण सूचना',
    disclaimer: 'यह चिकित्सा निदान नहीं है। उचित मूल्यांकन और उपचार के लिए कृपया योग्य चिकित्सक से परामर्श करें।',
    findFacility: 'नजदीकी सुविधा खोजें',
    
    // Facility Page
    nearbyFacilities: 'नजदीकी सुविधाएं',
    selectFacility: 'एक स्वास्थ्य सुविधा चुनें',
    distance: 'दूरी',
    specialties: 'विशेषज्ञताएं',
    selectThisFacility: 'यह सुविधा चुनें',
    
    // Appointment Page
    bookAppointment: 'अपॉइंटमेंट बुक करें',
    selectDateTime: 'अपनी पसंदीदा तारीख और समय चुनें',
    selectDate: 'तारीख चुनें',
    selectTime: 'समय चुनें',
    confirmBooking: 'बुकिंग की पुष्टि करें',
    booking: 'बुक हो रहा है...',
    
    // Confirmation Page
    appointmentConfirmed: 'अपॉइंटमेंट की पुष्टि!',
    yourReferenceId: 'आपकी संदर्भ आईडी',
    appointmentDetails: 'अपॉइंटमेंट विवरण',
    facility: 'सुविधा',
    date: 'तारीख',
    time: 'समय',
    specialty: 'विशेषज्ञता',
    instructions: 'अस्पताल जाने के निर्देश',
    instruction1: 'अपॉइंटमेंट से 15 मिनट पहले पहुंचें',
    instruction2: 'संदर्भ आईडी और कोई भी पहचान प्रमाण लाएं',
    instruction3: 'यदि उपलब्ध हो तो पिछले मेडिकल रिकॉर्ड लाएं',
    instruction4: 'मास्क पहनें और COVID-19 दिशानिर्देशों का पालन करें',
    printReceipt: 'रसीद प्रिंट करें',
    startNew: 'नया परामर्श शुरू करें',
    
    // Common
    back: 'वापस',
    loading: 'लोड हो रहा है...',
    error: 'एक त्रुटि हुई। कृपया पुनः प्रयास करें।',
  }
};

export const useTranslation = (language: Language) => {
  return translations[language];
};

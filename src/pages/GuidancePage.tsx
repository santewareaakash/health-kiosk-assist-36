import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, User, Calendar, Users, Stethoscope, AlertTriangle, Building2, RefreshCw } from 'lucide-react';
import { useApp } from '@/context/AppContext';

// Bihar Top 10 Common Diseases mapping
const DISEASE_MAPPING: Record<string, { conditions: string[]; department: string }> = {
  fever: {
    conditions: ['Acute Viral Fever / तीव्र वायरल बुखार', 'Malaria / मलेरिया', 'Dengue Fever / डेंगू बुखार', 'Typhoid / टाइफाइड'],
    department: 'General Medicine / सामान्य चिकित्सा'
  },
  chills: {
    conditions: ['Malaria / मलेरिया', 'Acute Viral Fever / तीव्र वायरल बुखार'],
    department: 'General Medicine / सामान्य चिकित्सा'
  },
  cough: {
    conditions: ['Respiratory Infections / श्वसन संक्रमण', 'Tuberculosis (TB) / तपेदिक (टीबी)', 'Asthma / दमा'],
    department: 'Pulmonology / फेफड़ों का विभाग'
  },
  breathlessness: {
    conditions: ['Asthma / दमा', 'Bronchitis / ब्रोंकाइटिस', 'Respiratory Infections / श्वसन संक्रमण'],
    department: 'Pulmonology / फेफड़ों का विभाग'
  },
  diarrhea: {
    conditions: ['Acute Diarrheal Disease / तीव्र दस्त रोग', 'Typhoid / टाइफाइड'],
    department: 'General Medicine / सामान्य चिकित्सा'
  },
  vomiting: {
    conditions: ['Acute Diarrheal Disease / तीव्र दस्त रोग', 'Typhoid / टाइफाइड'],
    department: 'General Medicine / सामान्य चिकित्सा'
  },
  weakness: {
    conditions: ['Anemia / एनीमिया', 'Malnutrition / कुपोषण', 'Acute Viral Fever / तीव्र वायरल बुखार'],
    department: 'General Medicine / सामान्य चिकित्सा'
  },
  headache: {
    conditions: ['Acute Viral Fever / तीव्र वायरल बुखार', 'Dengue Fever / डेंगू बुखार', 'Typhoid / टाइफाइड'],
    department: 'General Medicine / सामान्य चिकित्सा'
  },
  joint_pain: {
    conditions: ['Arthritis / गठिया', 'Dengue Fever / डेंगू बुखार', 'Joint Disorders / जोड़ विकार'],
    department: 'Orthopedics / हड्डी रोग विभाग'
  },
  weight_loss: {
    conditions: ['Tuberculosis (TB) / तपेदिक (टीबी)', 'Malnutrition / कुपोषण'],
    department: 'General Medicine / सामान्य चिकित्सा'
  },
  abdominal_pain: {
    conditions: ['Acute Diarrheal Disease / तीव्र दस्त रोग', 'Typhoid / टाइफाइड'],
    department: 'General Medicine / सामान्य चिकित्सा'
  },
  skin_rashes: {
    conditions: ['Dengue Fever / डेंगू बुखार', 'Acute Viral Fever / तीव्र वायरल बुखार'],
    department: 'General Medicine / सामान्य चिकित्सा'
  },
};

const SYMPTOMS_MAP: Record<string, { hindi: string; english: string }> = {
  fever: { hindi: 'बुखार', english: 'Fever' },
  chills: { hindi: 'ठंड लगना', english: 'Chills' },
  cough: { hindi: 'खांसी', english: 'Cough' },
  breathlessness: { hindi: 'सांस फूलना', english: 'Breathlessness' },
  diarrhea: { hindi: 'दस्त', english: 'Diarrhea' },
  vomiting: { hindi: 'उल्टी', english: 'Vomiting' },
  weakness: { hindi: 'कमजोरी', english: 'Weakness' },
  headache: { hindi: 'सिरदर्द', english: 'Headache' },
  joint_pain: { hindi: 'जोड़ों का दर्द', english: 'Joint Pain' },
  weight_loss: { hindi: 'वजन कम होना', english: 'Weight Loss' },
  abdominal_pain: { hindi: 'पेट दर्द', english: 'Abdominal Pain' },
  skin_rashes: { hindi: 'त्वचा पर दाने', english: 'Skin Rashes' },
};

const GuidancePage: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useApp();
  
  const [symptomsData, setSymptomsData] = useState<{
    symptoms: string[];
    duration: string;
    severity: string;
  } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('kiosk_symptoms');
    if (stored) {
      setSymptomsData(JSON.parse(stored));
    }
  }, []);

  // Calculate possible conditions based on selected symptoms
  const getPossibleConditions = () => {
    if (!symptomsData?.symptoms) return [];
    
    const allConditions: string[] = [];
    symptomsData.symptoms.forEach(symptom => {
      const mapping = DISEASE_MAPPING[symptom];
      if (mapping) {
        mapping.conditions.forEach(condition => {
          if (!allConditions.includes(condition)) {
            allConditions.push(condition);
          }
        });
      }
    });
    return allConditions.slice(0, 5); // Top 5 conditions
  };

  // Get recommended department
  const getRecommendedDepartment = () => {
    if (!symptomsData?.symptoms?.length) return 'General Medicine / सामान्य चिकित्सा';
    
    const firstSymptom = symptomsData.symptoms[0];
    return DISEASE_MAPPING[firstSymptom]?.department || 'General Medicine / सामान्य चिकित्सा';
  };

  const possibleConditions = getPossibleConditions();
  const recommendedDepartment = getRecommendedDepartment();

  const handleFindFacility = () => {
    navigate('/facilities');
  };

  const handleStartNew = () => {
    localStorage.removeItem('kiosk_symptoms');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background pt-16 pb-8">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/symptoms')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>वापस / Back</span>
        </button>

        <div className="animate-fade-in space-y-6">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="kiosk-title">
              AI स्वास्थ्य मार्गदर्शन
            </h2>
            <p className="text-muted-foreground text-lg">
              AI Health Guidance
            </p>
          </div>

          {/* Patient Summary */}
          <div className="kiosk-card">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              रोगी सारांश / Patient Summary
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <User className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                <p className="text-sm text-muted-foreground">नाम</p>
                <p className="font-medium">{(session as any)?.patientName || 'N/A'}</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Calendar className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                <p className="text-sm text-muted-foreground">उम्र</p>
                <p className="font-medium">{(session as any)?.patientAge || 'N/A'} वर्ष</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Users className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                <p className="text-sm text-muted-foreground">लिंग</p>
                <p className="font-medium capitalize">{(session as any)?.patientGender || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Selected Symptoms */}
          <div className="kiosk-card">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-primary" />
              चयनित लक्षण / Selected Symptoms
            </h3>
            <div className="flex flex-wrap gap-2">
              {symptomsData?.symptoms.map(symptom => (
                <span 
                  key={symptom}
                  className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                >
                  {SYMPTOMS_MAP[symptom]?.hindi} / {SYMPTOMS_MAP[symptom]?.english}
                </span>
              ))}
            </div>
          </div>

          {/* Possible Conditions */}
          <div className="kiosk-card border-2 border-accent/30">
            <h3 className="font-semibold text-foreground mb-4">
              संभावित स्थितियां / Possible Conditions
            </h3>
            <p className="text-sm text-muted-foreground mb-4 italic">
              (लक्षणों के आधार पर - निदान नहीं / Based on symptoms - not a diagnosis)
            </p>
            <ul className="space-y-2">
              {possibleConditions.map((condition, index) => (
                <li key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <span className="w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-foreground">{condition}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Department */}
          <div className="kiosk-card bg-primary/5 border-2 border-primary/20">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              सुझाया गया विभाग / Recommended Department
            </h3>
            <p className="text-xl font-bold text-primary">{recommendedDepartment}</p>
          </div>

          {/* Disclaimer Box - FIXED */}
          <div className="disclaimer-box">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-foreground mb-2">
                  महत्वपूर्ण सूचना / Important Notice
                </h4>
                <p className="text-foreground leading-relaxed">
                  यह चिकित्सा निदान नहीं है। कृपया सरकारी स्वास्थ्य केंद्र पर योग्य चिकित्सक से परामर्श करें।
                </p>
                <p className="text-foreground text-sm mt-2">
                  This is not a medical diagnosis. Please consult a qualified doctor at a government health facility.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleFindFacility}
              className="kiosk-button-primary w-full"
            >
              <Building2 className="w-5 h-5 mr-2" />
              नजदीकी सुविधा खोजें / Find Nearby Facility
            </Button>
            
            <Button
              onClick={handleStartNew}
              variant="outline"
              className="kiosk-button-secondary w-full"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              नया परामर्श शुरू करें / Start New Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidancePage;
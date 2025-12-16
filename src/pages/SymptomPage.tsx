import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ChevronDown,
  Loader2,
  Stethoscope,
  Clock,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';

const SymptomPage: React.FC = () => {
  const navigate = useNavigate();
  const { setTriage, language } = useApp();

  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [duration, setDuration] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [symptomDropdownOpen, setSymptomDropdownOpen] = useState(false);
  const [durationDropdownOpen, setDurationDropdownOpen] = useState(false);

  const t = {
    hindi: {
      title: 'अपने लक्षण चुनें',
      subtitle: 'Select Your Symptoms',
      symptomLabel: 'मुख्य लक्षण चुनें',
      symptomPlaceholder: 'लक्षण चुनें...',
      durationLabel: 'यह समस्या कितने दिनों से है?',
      durationPlaceholder: 'अवधि चुनें...',
      continue: 'आगे बढ़ें',
      analyzing: 'विश्लेषण हो रहा है...',
      back: 'वापस',
    },
    english: {
      title: 'Select Your Symptoms',
      subtitle: 'अपने लक्षण चुनें',
      symptomLabel: 'Select your primary symptom',
      symptomPlaceholder: 'Choose symptom...',
      durationLabel: 'How long have you had this problem?',
      durationPlaceholder: 'Choose duration...',
      continue: 'Continue',
      analyzing: 'Analyzing...',
      back: 'Back',
    },
  };

  const text = t[language];

  /**
   * Covers top 20 common diseases in Bihar:
   * Fever-related (Malaria, Dengue, Typhoid)
   * TB, Pneumonia
   * Cardiac Arrest / Heart Disease
   * Stroke
   * Diarrhea & dehydration
   * Asthma / COPD
   * Diabetes
   * Jaundice / Hepatitis
   * Heat stroke
   * Anemia
   * Epilepsy
   */
  const SYMPTOMS = [
    { id: 'fever', hindi: 'बुखार', english: 'Fever' },
    { id: 'high_fever', hindi: 'तेज बुखार', english: 'High Fever' },
    { id: 'chills', hindi: 'ठंड लगना', english: 'Chills' },

    { id: 'cough', hindi: 'खांसी', english: 'Cough' },
    {
      id: 'chronic_cough',
      hindi: 'लगातार खांसी',
      english: 'Chronic Cough (TB)',
    },
    { id: 'blood_cough', hindi: 'खांसी में खून', english: 'Coughing Blood' },

    { id: 'breathlessness', hindi: 'सांस फूलना', english: 'Breathlessness' },
    { id: 'chest_pain', hindi: 'सीने में दर्द', english: 'Chest Pain' },
    { id: 'palpitations', hindi: 'दिल तेज धड़कना', english: 'Rapid Heartbeat' },

    {
      id: 'sudden_weakness',
      hindi: 'अचानक कमजोरी',
      english: 'Sudden Weakness (Stroke)',
    },
    {
      id: 'paralysis',
      hindi: 'शरीर के एक हिस्से में लकवा',
      english: 'Paralysis',
    },
    {
      id: 'slurred_speech',
      hindi: 'बोलने में परेशानी',
      english: 'Slurred Speech',
    },

    { id: 'headache', hindi: 'सिरदर्द', english: 'Headache' },
    { id: 'severe_headache', hindi: 'तेज सिरदर्द', english: 'Severe Headache' },
    { id: 'dizziness', hindi: 'चक्कर आना', english: 'Dizziness' },

    { id: 'vomiting', hindi: 'उल्टी', english: 'Vomiting' },
    { id: 'diarrhea', hindi: 'दस्त', english: 'Diarrhea' },
    { id: 'abdominal_pain', hindi: 'पेट दर्द', english: 'Abdominal Pain' },

    {
      id: 'loss_of_appetite',
      hindi: 'भूख न लगना',
      english: 'Loss of Appetite',
    },
    { id: 'weight_loss', hindi: 'वजन कम होना', english: 'Weight Loss' },

    {
      id: 'yellow_eyes',
      hindi: 'आंखों में पीलापन',
      english: 'Yellow Eyes (Jaundice)',
    },
    { id: 'dark_urine', hindi: 'गहरा पेशाब', english: 'Dark Urine' },

    { id: 'body_ache', hindi: 'शरीर दर्द', english: 'Body Ache' },
    { id: 'joint_pain', hindi: 'जोड़ों का दर्द', english: 'Joint Pain' },

    { id: 'heat_exhaustion', hindi: 'लू लगना', english: 'Heat Stroke' },
    {
      id: 'excessive_sweating',
      hindi: 'अधिक पसीना',
      english: 'Excessive Sweating',
    },

    { id: 'seizures', hindi: 'दौरे पड़ना', english: 'Seizures (Epilepsy)' },

    { id: 'fatigue', hindi: 'अत्यधिक थकान', english: 'Extreme Fatigue' },
    { id: 'pale_skin', hindi: 'पीला चेहरा', english: 'Pale Skin (Anemia)' },

    {
      id: 'frequent_urination',
      hindi: 'बार-बार पेशाब',
      english: 'Frequent Urination (Diabetes)',
    },
    {
      id: 'excessive_thirst',
      hindi: 'अधिक प्यास लगना',
      english: 'Excessive Thirst',
    },
  ];

  const DURATIONS = [
    { id: '1-2', hindi: '1-2 दिन', english: '1-2 days' },
    { id: '3-5', hindi: '3-5 दिन', english: '3-5 days' },
    { id: '6-10', hindi: '6-10 दिन', english: '6-10 days' },
    { id: '10+', hindi: '10 दिन से अधिक', english: 'More than 10 days' },
  ];

  const getSymptomLabel = (id: string) => {
    const symptom = SYMPTOMS.find((s) => s.id === id);
    if (!symptom) return '';
    return language === 'hindi'
      ? `${symptom.hindi} (${symptom.english})`
      : `${symptom.english} (${symptom.hindi})`;
  };

  const getDurationLabel = (id: string) => {
    const dur = DURATIONS.find((d) => d.id === id);
    if (!dur) return '';
    return language === 'hindi' ? dur.hindi : dur.english;
  };

  const isFormValid = selectedSymptom && duration;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsAnalyzing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const triageData = {
      symptoms: [selectedSymptom],
      duration,
      severity: 'moderate',
    };

    localStorage.setItem('kiosk_symptoms', JSON.stringify(triageData));
    setTriage(triageData);
    setIsAnalyzing(false);
    navigate('/guidance');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Header />

      <div className="pt-24 pb-8 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/patient-details')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            {text.back}
          </button>

          <div className="kiosk-card animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-1">{text.title}</h2>
              <p className="text-muted-foreground text-lg">{text.subtitle}</p>
            </div>

            {/* Symptom Dropdown */}
            <div className="mb-8">
              <label className="kiosk-label flex items-center gap-2 mb-3">
                <Stethoscope className="w-5 h-5 text-primary" />
                {text.symptomLabel}
              </label>

              <div className="relative">
                <button
                  onClick={() => {
                    setSymptomDropdownOpen(!symptomDropdownOpen);
                    setDurationDropdownOpen(false);
                  }}
                  className="kiosk-dropdown-trigger"
                >
                  {selectedSymptom
                    ? getSymptomLabel(selectedSymptom)
                    : text.symptomPlaceholder}
                  <ChevronDown
                    className={cn(
                      'w-5 h-5',
                      symptomDropdownOpen && 'rotate-180'
                    )}
                  />
                </button>

                {symptomDropdownOpen && (
                  <div className="kiosk-dropdown-menu max-h-72 overflow-y-auto">
                    {SYMPTOMS.map((symptom) => (
                      <button
                        key={symptom.id}
                        onClick={() => {
                          setSelectedSymptom(symptom.id);
                          setSymptomDropdownOpen(false);
                        }}
                        className="kiosk-dropdown-item"
                      >
                        <span className="font-medium">
                          {language === 'hindi'
                            ? symptom.hindi
                            : symptom.english}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {language === 'hindi'
                            ? symptom.english
                            : symptom.hindi}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Duration */}
            <div className="mb-10">
              <label className="kiosk-label flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-primary" />
                {text.durationLabel}
              </label>

              <div className="relative">
                <button
                  onClick={() => {
                    setDurationDropdownOpen(!durationDropdownOpen);
                    setSymptomDropdownOpen(false);
                  }}
                  className="kiosk-dropdown-trigger"
                >
                  {duration
                    ? getDurationLabel(duration)
                    : text.durationPlaceholder}
                  <ChevronDown
                    className={cn(
                      'w-5 h-5',
                      durationDropdownOpen && 'rotate-180'
                    )}
                  />
                </button>

                {durationDropdownOpen && (
                  <div className="kiosk-dropdown-menu">
                    {DURATIONS.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          setDuration(d.id);
                          setDurationDropdownOpen(false);
                        }}
                        className="kiosk-dropdown-item"
                      >
                        {language === 'hindi' ? d.hindi : d.english}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!isFormValid || isAnalyzing}
              className="w-full h-16 text-xl kiosk-button-gradient"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  {text.analyzing}
                </>
              ) : (
                text.continue
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymptomPage;

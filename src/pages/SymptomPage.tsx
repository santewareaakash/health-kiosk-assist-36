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
import data from '@/lib/data.json';

const SymptomPage: React.FC = () => {
  const navigate = useNavigate();
  const { setTriage, language } = useApp();

  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [duration, setDuration] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [symptomDropdownOpen, setSymptomDropdownOpen] = useState(false);
  const [durationDropdownOpen, setDurationDropdownOpen] = useState(false);

  // 🔹 Derived from data.json (UI unchanged)
  const SYMPTOMS = Object.entries(data.symptoms).map(([id, value]) => ({
    id,
    hindi: value.hindi,
    english: value.english,
  }));

  const DURATIONS = data.durations;

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
      symptoms: [selectedSymptom], // ✅ IDs stay consistent
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

            {/* Duration Dropdown */}
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

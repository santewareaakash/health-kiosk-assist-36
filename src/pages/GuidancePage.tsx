import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  User,
  Calendar,
  Users,
  Stethoscope,
  AlertTriangle,
  Building2,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import data from '@/lib/data.json';

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

  const getPossibleConditions = () => {
    if (!symptomsData?.symptoms) return [];

    const conditions = new Set<string>();

    symptomsData.symptoms.forEach((id) => {
      const symptom = data.symptoms[id];
      symptom?.conditions.forEach((c) => conditions.add(c));
    });

    return Array.from(conditions).slice(0, 5);
  };

  const getRecommendedDepartment = () => {
    const id = symptomsData?.symptoms?.[0];
    return (
      data.symptoms[id]?.department || 'General Medicine / सामान्य चिकित्सा'
    );
  };

  const possibleConditions = getPossibleConditions();
  const recommendedDepartment = getRecommendedDepartment();

  const handleFindFacility = () => navigate('/facilities');

  const handleStartNew = () => {
    localStorage.removeItem('kiosk_symptoms');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background pt-16 pb-8">
      <Header />

      <div className="max-w-3xl mx-auto px-4 py-8">
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
            <h2 className="kiosk-title">AI स्वास्थ्य मार्गदर्शन</h2>
            <p className="text-muted-foreground text-lg">AI Health Guidance</p>
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
                <p className="font-medium">
                  {(session as any)?.patientName || 'N/A'}
                </p>
              </div>

              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Calendar className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                <p className="text-sm text-muted-foreground">उम्र</p>
                <p className="font-medium">
                  {(session as any)?.patientAge || 'N/A'} वर्ष
                </p>
              </div>

              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <Users className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
                <p className="text-sm text-muted-foreground">लिंग</p>
                <p className="font-medium capitalize">
                  {(session as any)?.patientGender || 'N/A'}
                </p>
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
              {symptomsData?.symptoms.map((id) => (
                <span
                  key={id}
                  className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium"
                >
                  {data.symptoms[id]?.hindi} / {data.symptoms[id]?.english}
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
              (लक्षणों के आधार पर - निदान नहीं / Based on symptoms - not a
              diagnosis)
            </p>

            <ul className="space-y-2">
              {possibleConditions.map((condition, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                >
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
            <p className="text-xl font-bold text-primary">
              {recommendedDepartment}
            </p>
          </div>

          {/* Disclaimer */}
          <div className="disclaimer-box">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-foreground mb-2">
                  महत्वपूर्ण सूचना / Important Notice
                </h4>
                <p className="text-foreground leading-relaxed">
                  यह चिकित्सा निदान नहीं है। कृपया सरकारी स्वास्थ्य केंद्र पर
                  योग्य चिकित्सक से परामर्श करें।
                </p>
                <p className="text-foreground text-sm mt-2">
                  This is not a medical diagnosis. Please consult a qualified
                  doctor at a government health facility.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
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

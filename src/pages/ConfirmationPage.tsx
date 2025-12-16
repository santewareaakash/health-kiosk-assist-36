import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Building2, Calendar, Clock, FileText, RefreshCw, Printer } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const ConfirmationPage: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useApp();
  const [appointment, setAppointment] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('kiosk_appointment');
    if (stored) {
      setAppointment(JSON.parse(stored));
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleStartNew = () => {
    // Clear all kiosk data
    localStorage.removeItem('kiosk_symptoms');
    localStorage.removeItem('kiosk_selected_facility');
    localStorage.removeItem('kiosk_appointment');
    navigate('/');
  };

  if (!appointment) {
    return (
      <div className="min-h-screen bg-background pt-16">
        <Header />
        <div className="kiosk-container">
          <div className="kiosk-card text-center">
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-16 pb-8">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="animate-fade-in">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-success" />
            </div>
            <h2 className="kiosk-title text-success">
              अपॉइंटमेंट की पुष्टि!
            </h2>
            <p className="text-muted-foreground text-lg">
              Appointment Confirmed!
            </p>
          </div>

          {/* Reference ID */}
          <div className="success-box mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              आपकी संदर्भ आईडी / Your Reference ID
            </p>
            <p className="text-3xl font-bold text-success tracking-wider">
              {appointment.referenceId}
            </p>
          </div>

          {/* Appointment Details */}
          <div className="kiosk-card mb-6">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" />
              अपॉइंटमेंट विवरण / Appointment Details
            </h3>
            
            <div className="space-y-4">
              {/* Patient */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">रोगी / Patient</span>
                <span className="font-medium text-foreground">
                  {(session as any)?.patientName || 'N/A'}
                </span>
              </div>

              {/* Facility */}
              <div className="flex items-start justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="w-4 h-4" />
                  <span>सुविधा / Facility</span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-foreground">{appointment.facility?.name}</p>
                  <p className="text-sm text-muted-foreground">{appointment.facility?.nameEn}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>तारीख / Date</span>
                </div>
                <span className="font-medium text-foreground">{appointment.date}</span>
              </div>

              {/* Time */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>समय / Time</span>
                </div>
                <span className="font-medium text-foreground">{appointment.time}</span>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="kiosk-card mb-6">
            <h3 className="font-semibold text-foreground mb-4">
              अस्पताल जाने के निर्देश / Instructions for Hospital Visit
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                <div>
                  <p className="text-foreground">अपॉइंटमेंट से 15 मिनट पहले पहुंचें</p>
                  <p className="text-sm text-muted-foreground">Arrive 15 minutes before your appointment time</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                <div>
                  <p className="text-foreground">संदर्भ आईडी और कोई भी पहचान प्रमाण लाएं</p>
                  <p className="text-sm text-muted-foreground">Bring your Reference ID and any ID proof</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                <div>
                  <p className="text-foreground">यदि उपलब्ध हो तो पिछले मेडिकल रिकॉर्ड लाएं</p>
                  <p className="text-sm text-muted-foreground">Carry any previous medical records if available</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                <div>
                  <p className="text-foreground">OPD काउंटर पर रजिस्ट्रेशन कराएं</p>
                  <p className="text-sm text-muted-foreground">Register at the OPD counter on arrival</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handlePrint}
              className="kiosk-button-secondary w-full"
            >
              <Printer className="w-5 h-5 mr-2" />
              रसीद प्रिंट करें / Print Receipt
            </Button>
            
            <Button
              onClick={handleStartNew}
              className="kiosk-button-primary w-full"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              नया परामर्श शुरू करें / Start New Consultation
            </Button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              बिहार सरकार स्वास्थ्य विभाग
              <br />
              <span className="text-xs">Government of Bihar Health Department</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
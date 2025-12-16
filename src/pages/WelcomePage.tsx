import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Stethoscope, Shield, Clock, Building2 } from 'lucide-react';

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      
      <div className="kiosk-container">
        <div className="kiosk-card animate-fade-in text-center">
          {/* Main Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Stethoscope className="w-10 h-10 text-primary" />
          </div>

          {/* Welcome Title */}
          <h1 className="kiosk-title text-center">
            स्वागत है
          </h1>
          <p className="text-2xl text-muted-foreground mb-2">Welcome</p>
          
          <h2 className="text-xl font-semibold text-primary mb-6">
            AI स्वास्थ्य सहायता कियोस्क
            <br />
            <span className="text-base text-muted-foreground">AI Health Access Kiosk - Bihar</span>
          </h2>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="p-4 bg-muted/50 rounded-xl">
              <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">सुरक्षित</p>
              <p className="text-xs text-muted-foreground">Secure</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-xl">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">त्वरित</p>
              <p className="text-xs text-muted-foreground">Quick</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-xl">
              <Stethoscope className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">AI मार्गदर्शन</p>
              <p className="text-xs text-muted-foreground">AI Guidance</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-xl">
              <Building2 className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-sm font-medium text-foreground">सुविधा खोजें</p>
              <p className="text-xs text-muted-foreground">Find Facility</p>
            </div>
          </div>

          {/* Demo Notice */}
          <div className="info-box mb-6">
            <p className="text-sm text-foreground">
              यह एक फ्रंटएंड डेमो है। सभी चिकित्सा डेटा केवल सूचनात्मक है।
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              This is a frontend demo. All medical data is informational only.
            </p>
          </div>

          {/* Start Button */}
          <Button
            onClick={() => navigate('/login')}
            className="kiosk-button-primary w-full"
          >
            शुरू करें / Start
          </Button>

          {/* Government Footer */}
          <div className="mt-6 pt-6 border-t border-border">
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

export default WelcomePage;
import React from 'react';
import { useApp } from '@/context/AppContext';
import { useTranslation } from '@/services/translations';
import { ArrowLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface KioskLayoutProps {
  children: React.ReactNode;
  showBack?: boolean;
  backTo?: string;
}

export const KioskLayout: React.FC<KioskLayoutProps> = ({ 
  children, 
  showBack = false,
  backTo 
}) => {
  const { language } = useApp();
  const t = useTranslation(language);
  const navigate = useNavigate();

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 sticky top-0 z-50">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          {showBack ? (
            <button 
              onClick={handleBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">{t.back}</span>
            </button>
          ) : (
            <div className="w-20" />
          )}
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">
              {language === 'hindi' ? 'स्वास्थ्य कियोस्क' : 'Health Kiosk'}
            </span>
          </div>
          
          <div className="w-20 text-right">
            <span className="text-xs text-muted-foreground uppercase tracking-wide">
              {language === 'hindi' ? 'हिंदी' : 'EN'}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="kiosk-container py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur border-t border-border py-2 px-4">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            {language === 'hindi' 
              ? 'सरकारी स्वास्थ्य पहल • सुरक्षित और निजी'
              : 'Government Health Initiative • Secure & Private'}
          </p>
        </div>
      </footer>
    </div>
  );
};

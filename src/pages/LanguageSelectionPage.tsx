import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Globe } from 'lucide-react';

const LanguageSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const { setLanguage } = useApp();

  const handleLanguageSelect = (lang: 'hindi' | 'english') => {
    setLanguage(lang);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex flex-col">
      {/* Simple Header */}
      <header className="bg-card border-b border-border shadow-sm py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/santewarelogo.jpg"
              alt="Santeware Logo"
              className="h-[40px] w-auto object-contain"
            />
          </div>
          <div className="text-right">
            <h1 className="text-lg font-bold text-primary">
              AI Health Access Kiosk
            </h1>
            <p className="text-sm text-muted-foreground">Bihar | बिहार</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-card rounded-3xl shadow-2xl p-10 w-full max-w-xl border border-border animate-fade-in">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
              <Globe className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              भाषा चुनें
            </h2>
            <p className="text-xl text-muted-foreground">
              Select Your Language
            </p>
          </div>

          {/* Language Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => handleLanguageSelect('hindi')}
              className="w-full py-6 px-8 rounded-2xl bg-gradient-to-r from-accent to-accent/80 text-accent-foreground font-bold text-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-4"
            >
              <span className="text-3xl">🇮🇳</span>
              <span>हिंदी</span>
              <span className="text-lg opacity-80">(Hindi)</span>
            </button>

            <button
              onClick={() => handleLanguageSelect('english')}
              className="w-full py-6 px-8 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-4"
            >
              <span className="text-3xl">🇬🇧</span>
              <span>English</span>
              <span className="text-lg opacity-80">(अंग्रेजी)</span>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-10 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground">बिहार सरकार स्वास्थ्य विभाग</p>
            <p className="text-sm text-muted-foreground">
              Government of Bihar Health Department
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectionPage;

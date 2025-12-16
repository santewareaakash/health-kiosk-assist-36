import React from 'react';
import { useApp } from '@/context/AppContext';

const Header: React.FC = () => {
  const { language } = useApp();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Placeholder */}
        <div className="flex items-center">
          <img
            src="/santewarelogo.jpg"
            alt="Santeware Logo"
            className="h-[40px] w-auto object-contain"
          />
        </div>

        {/* App Title */}
        <div className="text-right">
          <h1 className="text-lg md:text-xl font-bold text-primary">
            {language === 'hindi'
              ? 'AI स्वास्थ्य सहायता कियोस्क'
              : 'AI Health Access Kiosk'}
          </h1>
          <p className="text-sm text-muted-foreground">Bihar | बिहार</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

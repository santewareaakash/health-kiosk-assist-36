import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '@/services/translations';
import { Session, TriageResult, Facility, Appointment, getCurrentSession, getCurrentTriage, getCurrentAppointment, clearSession } from '@/services/api';

interface AppState {
  language: Language;
  session: Session | null;
  triage: TriageResult | null;
  selectedFacility: Facility | null;
  appointment: Appointment | null;
}

interface AppContextType extends AppState {
  setLanguage: (lang: Language) => void;
  setSession: (session: Session | null) => void;
  setTriage: (triage: TriageResult | null) => void;
  setSelectedFacility: (facility: Facility | null) => void;
  setAppointment: (appointment: Appointment | null) => void;
  resetApp: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    language: 'hindi',
    session: null,
    triage: null,
    selectedFacility: null,
    appointment: null,
  });

  useEffect(() => {
    // Restore state from localStorage on mount
    const savedSession = getCurrentSession();
    const savedTriage = getCurrentTriage();
    const savedAppointment = getCurrentAppointment();
    
    if (savedSession) {
      setState(prev => ({
        ...prev,
        session: savedSession,
        language: savedSession.language,
        triage: savedTriage,
        appointment: savedAppointment,
      }));
    }
  }, []);

  const setLanguage = (language: Language) => {
    setState(prev => ({ ...prev, language }));
  };

  const setSession = (session: Session | null) => {
    setState(prev => ({ ...prev, session }));
  };

  const setTriage = (triage: TriageResult | null) => {
    setState(prev => ({ ...prev, triage }));
  };

  const setSelectedFacility = (selectedFacility: Facility | null) => {
    setState(prev => ({ ...prev, selectedFacility }));
  };

  const setAppointment = (appointment: Appointment | null) => {
    setState(prev => ({ ...prev, appointment }));
  };

  const resetApp = () => {
    clearSession();
    setState({
      language: 'hindi',
      session: null,
      triage: null,
      selectedFacility: null,
      appointment: null,
    });
  };

  return (
    <AppContext.Provider value={{
      ...state,
      setLanguage,
      setSession,
      setTriage,
      setSelectedFacility,
      setAppointment,
      resetApp,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

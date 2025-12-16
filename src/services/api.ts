// Mock API Service with localStorage persistence

export interface Session {
  id: string;
  language: 'hindi' | 'english';
  createdAt: string;
}

export interface Symptom {
  sessionId: string;
  mainSymptom: string;
  duration: string;
  severity: string;
}

export interface TriageResult {
  possibleCondition: string;
  recommendedSpecialty: string;
  disclaimer: string;
}

export interface Facility {
  id: string;
  name: string;
  address: string;
  specialties: string[];
  distance: string;
  type: string;
}

export interface Appointment {
  id: string;
  sessionId: string;
  facilityId: string;
  facilityName: string;
  date: string;
  time: string;
  referenceId: string;
  specialty: string;
}

// Seed data for facilities
const FACILITIES: Facility[] = [
  {
    id: 'fac-001',
    name: 'Government District Hospital',
    address: 'Civil Lines, Main Road, District HQ',
    specialties: ['General Medicine', 'Cardiology', 'Orthopedics', 'Gastroenterology'],
    distance: '2.5 km',
    type: 'Government Hospital'
  },
  {
    id: 'fac-002',
    name: 'Primary Health Centre (PHC)',
    address: 'Block Road, Sector 5',
    specialties: ['General Medicine', 'Pediatrics'],
    distance: '1.2 km',
    type: 'Primary Health Centre'
  },
  {
    id: 'fac-003',
    name: 'Community Health Centre',
    address: 'NH-45, Near Bus Stand',
    specialties: ['General Medicine', 'Orthopedics', 'Cardiology', 'Gastroenterology'],
    distance: '4.0 km',
    type: 'Community Health Centre'
  }
];

// Triage logic - rule-based AI
const TRIAGE_RULES: Record<string, { condition: string; specialty: string }> = {
  'fever': {
    condition: 'Possible viral or bacterial infection',
    specialty: 'General Medicine'
  },
  'chest_pain': {
    condition: 'Possible cardiac or respiratory condition',
    specialty: 'Cardiology'
  },
  'joint_pain': {
    condition: 'Possible musculoskeletal condition',
    specialty: 'Orthopedics'
  },
  'stomach_pain': {
    condition: 'Possible gastrointestinal condition',
    specialty: 'Gastroenterology'
  }
};

// Helper to generate IDs
const generateId = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// LocalStorage helpers
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// API Functions

export const startSession = async (language: 'hindi' | 'english'): Promise<Session> => {
  await delay(300);
  
  const session: Session = {
    id: generateId('sess'),
    language,
    createdAt: new Date().toISOString()
  };
  
  const sessions = getFromStorage<Session[]>('kiosk_sessions', []);
  sessions.push(session);
  saveToStorage('kiosk_sessions', sessions);
  saveToStorage('kiosk_current_session', session);
  
  return session;
};

export const submitSymptoms = async (symptomData: Omit<Symptom, 'sessionId'>): Promise<Symptom> => {
  await delay(400);
  
  const currentSession = getFromStorage<Session | null>('kiosk_current_session', null);
  if (!currentSession) throw new Error('No active session');
  
  const symptom: Symptom = {
    ...symptomData,
    sessionId: currentSession.id
  };
  
  const symptoms = getFromStorage<Symptom[]>('kiosk_symptoms', []);
  symptoms.push(symptom);
  saveToStorage('kiosk_symptoms', symptoms);
  saveToStorage('kiosk_current_symptom', symptom);
  
  return symptom;
};

export const getTriage = async (mainSymptom: string): Promise<TriageResult> => {
  await delay(500);
  
  const rule = TRIAGE_RULES[mainSymptom] || TRIAGE_RULES['fever'];
  
  const result: TriageResult = {
    possibleCondition: rule.condition,
    recommendedSpecialty: rule.specialty,
    disclaimer: 'This is not a medical diagnosis. Please consult a qualified doctor for proper evaluation and treatment.'
  };
  
  saveToStorage('kiosk_current_triage', result);
  
  return result;
};

export const getFacilities = async (specialty?: string): Promise<Facility[]> => {
  await delay(300);
  
  if (specialty) {
    return FACILITIES.filter(f => f.specialties.includes(specialty));
  }
  
  return FACILITIES;
};

export const bookAppointment = async (data: {
  facilityId: string;
  date: string;
  time: string;
}): Promise<Appointment> => {
  await delay(600);
  
  const currentSession = getFromStorage<Session | null>('kiosk_current_session', null);
  const currentTriage = getFromStorage<TriageResult | null>('kiosk_current_triage', null);
  
  if (!currentSession) throw new Error('No active session');
  
  const facility = FACILITIES.find(f => f.id === data.facilityId);
  if (!facility) throw new Error('Facility not found');
  
  const appointment: Appointment = {
    id: generateId('apt'),
    sessionId: currentSession.id,
    facilityId: data.facilityId,
    facilityName: facility.name,
    date: data.date,
    time: data.time,
    referenceId: `HK-${Date.now().toString(36).toUpperCase()}`,
    specialty: currentTriage?.recommendedSpecialty || 'General Medicine'
  };
  
  const appointments = getFromStorage<Appointment[]>('kiosk_appointments', []);
  appointments.push(appointment);
  saveToStorage('kiosk_appointments', appointments);
  saveToStorage('kiosk_current_appointment', appointment);
  
  return appointment;
};

export const getCurrentSession = (): Session | null => {
  return getFromStorage<Session | null>('kiosk_current_session', null);
};

export const getCurrentTriage = (): TriageResult | null => {
  return getFromStorage<TriageResult | null>('kiosk_current_triage', null);
};

export const getCurrentAppointment = (): Appointment | null => {
  return getFromStorage<Appointment | null>('kiosk_current_appointment', null);
};

export const clearSession = () => {
  localStorage.removeItem('kiosk_current_session');
  localStorage.removeItem('kiosk_current_symptom');
  localStorage.removeItem('kiosk_current_triage');
  localStorage.removeItem('kiosk_current_appointment');
};

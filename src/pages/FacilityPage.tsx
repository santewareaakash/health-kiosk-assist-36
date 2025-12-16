import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Building2, Stethoscope, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';

// Bihar Government Health Facilities
const FACILITIES = [
  {
    id: 'fac-001',
    name: 'पटना मेडिकल कॉलेज अस्पताल',
    nameEn: 'Patna Medical College Hospital (PMCH)',
    address: 'अशोक राजपथ, पटना',
    addressEn: 'Ashok Rajpath, Patna',
    specialties: ['General Medicine', 'Pediatrics', 'Pulmonology', 'Orthopedics', 'Gynecology'],
    distance: '2.5 km',
    type: 'Government Medical College',
    typeHindi: 'सरकारी मेडिकल कॉलेज'
  },
  {
    id: 'fac-002',
    name: 'जिला अस्पताल',
    nameEn: 'District Hospital',
    address: 'सिविल लाइन्स, जिला मुख्यालय',
    addressEn: 'Civil Lines, District HQ',
    specialties: ['General Medicine', 'Pediatrics', 'Orthopedics'],
    distance: '1.2 km',
    type: 'District Hospital',
    typeHindi: 'जिला अस्पताल'
  },
  {
    id: 'fac-003',
    name: 'प्राथमिक स्वास्थ्य केंद्र (PHC)',
    nameEn: 'Primary Health Centre (PHC)',
    address: 'ब्लॉक रोड, सेक्टर 5',
    addressEn: 'Block Road, Sector 5',
    specialties: ['General Medicine', 'Pediatrics'],
    distance: '0.8 km',
    type: 'Primary Health Centre',
    typeHindi: 'प्राथमिक स्वास्थ्य केंद्र'
  },
  {
    id: 'fac-004',
    name: 'सामुदायिक स्वास्थ्य केंद्र (CHC)',
    nameEn: 'Community Health Centre (CHC)',
    address: 'NH-45, बस स्टैंड के पास',
    addressEn: 'NH-45, Near Bus Stand',
    specialties: ['General Medicine', 'Orthopedics', 'Pulmonology'],
    distance: '4.0 km',
    type: 'Community Health Centre',
    typeHindi: 'सामुदायिक स्वास्थ्य केंद्र'
  }
];

const FacilityPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);

  const handleSelectFacility = (facilityId: string) => {
    setSelectedFacility(facilityId);
  };

  const handleContinue = () => {
    if (selectedFacility) {
      const facility = FACILITIES.find(f => f.id === selectedFacility);
      localStorage.setItem('kiosk_selected_facility', JSON.stringify(facility));
      navigate('/appointment');
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16 pb-8">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/guidance')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>वापस / Back</span>
        </button>

        <div className="animate-fade-in">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="kiosk-title">
              नजदीकी सुविधाएं
            </h2>
            <p className="text-muted-foreground text-lg">
              Nearby Health Facilities
            </p>
          </div>

          {/* Facilities List */}
          <div className="space-y-4 mb-6">
            {FACILITIES.map((facility) => (
              <button
                key={facility.id}
                onClick={() => handleSelectFacility(facility.id)}
                className={cn(
                  "w-full p-5 rounded-xl border-2 text-left transition-all duration-200",
                  selectedFacility === facility.id
                    ? "border-primary bg-primary/5 shadow-lg"
                    : "border-border bg-card hover:border-primary/50"
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      selectedFacility === facility.id ? "bg-primary/20" : "bg-muted"
                    )}>
                      <Building2 className={cn(
                        "w-6 h-6",
                        selectedFacility === facility.id ? "text-primary" : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{facility.name}</h3>
                      <p className="text-sm text-muted-foreground">{facility.nameEn}</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-primary font-medium">
                    <Navigation className="w-4 h-4" />
                    {facility.distance}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{facility.address} | {facility.addressEn}</span>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded">
                    {facility.typeHindi}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <Stethoscope className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex flex-wrap gap-1">
                    {facility.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={!selectedFacility}
            className="kiosk-button-primary w-full"
          >
            आगे बढ़ें / Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FacilityPage;
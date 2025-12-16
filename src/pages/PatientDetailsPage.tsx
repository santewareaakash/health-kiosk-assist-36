import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Calendar, Users, CreditCard, ArrowLeft, Shield } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const PatientDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { setSession } = useApp();
  
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    aadhaar: '',
    consent: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = formData.fullName && formData.age && formData.gender && formData.consent;

  const handleSubmit = () => {
    if (isFormValid) {
      // Store patient data in session
      setSession({
        id: `sess-${Date.now()}`,
        language: 'hindi',
        createdAt: new Date().toISOString(),
        patientName: formData.fullName,
        patientAge: formData.age,
        patientGender: formData.gender,
      } as any);
      navigate('/symptoms');
    }
  };

  return (
    <div className="min-h-screen bg-background pt-16">
      <Header />
      
      <div className="kiosk-container">
        <div className="kiosk-card animate-fade-in max-w-xl">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>वापस / Back</span>
          </button>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="kiosk-title">
              रोगी विवरण
            </h2>
            <p className="text-muted-foreground">
              Patient Details
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="kiosk-label">
                <User className="inline w-4 h-4 mr-2" />
                पूरा नाम / Full Name *
              </label>
              <Input
                type="text"
                placeholder="अपना पूरा नाम दर्ज करें"
                value={formData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
                className="kiosk-input"
              />
            </div>

            {/* Age */}
            <div>
              <label className="kiosk-label">
                <Calendar className="inline w-4 h-4 mr-2" />
                उम्र / Age *
              </label>
              <Input
                type="number"
                placeholder="उम्र (वर्षों में)"
                value={formData.age}
                onChange={(e) => handleChange('age', e.target.value)}
                className="kiosk-input"
                min={0}
                max={120}
              />
            </div>

            {/* Gender */}
            <div>
              <label className="kiosk-label">
                <Users className="inline w-4 h-4 mr-2" />
                लिंग / Gender *
              </label>
              <Select onValueChange={(value) => handleChange('gender', value)}>
                <SelectTrigger className="kiosk-select">
                  <SelectValue placeholder="लिंग चुनें / Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">पुरुष / Male</SelectItem>
                  <SelectItem value="female">महिला / Female</SelectItem>
                  <SelectItem value="other">अन्य / Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Aadhaar (Optional) */}
            <div>
              <label className="kiosk-label">
                <CreditCard className="inline w-4 h-4 mr-2" />
                आधार नंबर / Aadhaar Number (वैकल्पिक / Optional)
              </label>
              <Input
                type="text"
                placeholder="12 अंकों का आधार नंबर"
                value={formData.aadhaar}
                onChange={(e) => handleChange('aadhaar', e.target.value.replace(/\D/g, '').slice(0, 12))}
                className="kiosk-input"
                maxLength={12}
              />
            </div>

            {/* Consent Checkbox */}
            <div className="bg-muted/50 rounded-xl p-4 border border-border">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="consent"
                  checked={formData.consent}
                  onCheckedChange={(checked) => handleChange('consent', checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="consent" className="text-sm cursor-pointer">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">सहमति / Consent *</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    मैं स्वास्थ्य मार्गदर्शन के लिए अपनी जानकारी साझा करने की सहमति देता/देती हूं। 
                    आधार वैकल्पिक है और केवल डेमो उद्देश्यों के लिए उपयोग किया जाएगा।
                  </p>
                  <p className="text-muted-foreground text-xs mt-2">
                    I consent to sharing my details for healthcare guidance. 
                    Aadhaar is optional and used only for demo purposes.
                  </p>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className="kiosk-button-primary w-full mt-6"
          >
            आगे बढ़ें / Continue
          </Button>

          {/* Required Fields Note */}
          <p className="text-center text-xs text-muted-foreground mt-4">
            * आवश्यक फ़ील्ड / Required fields
          </p>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsPage;
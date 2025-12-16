import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Phone, KeyRound, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const t = {
    hindi: {
      title: 'लॉगिन करें',
      subtitle: 'Login / Continue',
      mobileLabel: 'मोबाइल नंबर',
      mobilePlaceholder: '10 अंकों का मोबाइल नंबर दर्ज करें',
      sendOtp: 'OTP भेजें',
      otpLabel: 'OTP दर्ज करें',
      otpPlaceholder: '6 अंकों का OTP',
      continue: 'आगे बढ़ें',
      footer1: 'बिहार सरकार स्वास्थ्य विभाग',
      footer2: 'Government of Bihar Health Department',
    },
    english: {
      title: 'Login',
      subtitle: 'लॉगिन करें',
      mobileLabel: 'Mobile Number',
      mobilePlaceholder: 'Enter 10-digit mobile number',
      sendOtp: 'Send OTP',
      otpLabel: 'Enter OTP',
      otpPlaceholder: '6-digit OTP',
      continue: 'Continue',
      footer1: 'Government of Bihar Health Department',
      footer2: 'बिहार सरकार स्वास्थ्य विभाग',
    },
  };

  const text = t[language];

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      setOtpSent(true);
    }
  };

  const handleLogin = () => {
    if (mobile && otp.length === 6) {
      navigate('/patient-details');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <Header />

      <div className="pt-24 pb-8 px-4 min-h-screen flex items-center justify-center">
        <div className="kiosk-card animate-fade-in max-w-md w-full">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-1">
              {text.title}
            </h2>
            <p className="text-muted-foreground text-lg">{text.subtitle}</p>
          </div>

          {/* Mobile Number Input */}
          <div className="space-y-5">
            <div>
              <label className="kiosk-label text-base">
                {text.mobileLabel}
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                <Input
                  type="tel"
                  placeholder={text.mobilePlaceholder}
                  value={mobile}
                  onChange={(e) =>
                    setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))
                  }
                  className="h-14 pl-12 text-lg rounded-xl border-2 border-input focus:border-primary"
                  maxLength={10}
                />
              </div>
            </div>

            {!otpSent ? (
              <Button
                onClick={handleSendOtp}
                disabled={mobile.length !== 10}
                className="w-full h-14 text-lg rounded-xl bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                {text.sendOtp}
              </Button>
            ) : (
              <div className="space-y-5 animate-fade-in">
                <div>
                  <label className="kiosk-label text-base">
                    {text.otpLabel}
                  </label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
                    <Input
                      type="text"
                      placeholder={text.otpPlaceholder}
                      value={otp}
                      onChange={(e) =>
                        setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
                      }
                      className="h-14 pl-12 text-lg rounded-xl border-2 border-input focus:border-primary tracking-widest font-mono"
                      maxLength={6}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleLogin}
            disabled={!mobile || otp.length !== 6}
            className="w-full h-16 text-xl rounded-xl mt-8 kiosk-button-gradient font-semibold"
          >
            {text.continue}
            <ArrowRight className="w-6 h-6 ml-2" />
          </Button>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-center text-sm text-muted-foreground">
              {text.footer1}
            </p>
            <p className="text-center text-xs text-muted-foreground mt-1">
              {text.footer2}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;

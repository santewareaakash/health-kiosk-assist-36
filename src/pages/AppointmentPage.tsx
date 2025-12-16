import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  ArrowLeft,
  Building2,
  Calendar as CalendarIcon,
  Clock,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, addDays } from 'date-fns';

const TIME_SLOTS = [
  '09:00 AM',
  '09:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '02:00 PM',
  '02:30 PM',
  '03:00 PM',
  '03:30 PM',
  '04:00 PM',
];

const AppointmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [facility, setFacility] = useState<any>(null);
  const [isBooking, setIsBooking] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('kiosk_selected_facility');
    if (stored) {
      setFacility(JSON.parse(stored));
    }
  }, []);

  const isFormValid = selectedDate && selectedTime;

  const handleBookAppointment = async () => {
    if (!isFormValid) return;

    setIsBooking(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const appointment = {
      id: `APT-${Date.now()}`,
      referenceId: `HK-${Date.now().toString(36).toUpperCase()}`,
      facility,
      date: format(selectedDate!, 'dd MMMM yyyy'),
      time: selectedTime,
      bookedAt: new Date().toISOString(),
    };

    localStorage.setItem('kiosk_appointment', JSON.stringify(appointment));
    setIsBooking(false);
    navigate('/confirmation');
  };

  const disabledDays = {
    before: new Date(),
    after: addDays(new Date(), 30),
  };

  return (
    <div className="min-h-screen bg-background pt-16 pb-8">
      <Header />

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/facilities')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          वापस / Back
        </button>

        <div className="animate-fade-in">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="kiosk-title">अपॉइंटमेंट बुक करें</h2>
            <p className="text-muted-foreground text-lg">Book Appointment</p>
          </div>

          {/* Facility */}
          {facility && (
            <div className="kiosk-card mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{facility.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {facility.nameEn}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Date */}
          <div className="kiosk-card mb-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-primary" />
              तारीख चुनें / Select Date
            </h3>

            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={disabledDays}
                className="rounded-xl border"
                modifiersClassNames={{
                  selected:
                    'bg-primary text-primary-foreground hover:bg-primary focus:bg-primary',
                  today: 'bg-transparent text-foreground',
                }}
                classNames={{
                  day_selected:
                    'bg-primary text-primary-foreground hover:bg-primary focus:bg-primary',
                  day_today: 'bg-transparent',
                  day: 'h-10 w-10 p-0 font-normal aria-selected:opacity-100',
                  cell: 'h-10 w-10 p-0 relative',
                  button: 'h-10 w-10 rounded-full',
                }}
              />
            </div>
          </div>

          {/* Time */}
          <div className="kiosk-card mb-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              समय चुनें / Select Time
            </h3>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {TIME_SLOTS.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={cn(
                    'p-3 rounded-xl border-2 text-sm font-medium transition-all',
                    selectedTime === time
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border hover:border-primary/50'
                  )}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Summary */}
          {isFormValid && (
            <div className="info-box mb-6">
              <p>
                📅 {format(selectedDate!, 'dd MMMM yyyy')} | ⏰ {selectedTime}
              </p>
            </div>
          )}

          {/* Book */}
          <Button
            onClick={handleBookAppointment}
            disabled={!isFormValid || isBooking}
            className="kiosk-button-primary w-full"
          >
            {isBooking ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                बुक हो रहा है...
              </>
            ) : (
              'अपॉइंटमेंट की पुष्टि करें / Confirm Appointment'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;

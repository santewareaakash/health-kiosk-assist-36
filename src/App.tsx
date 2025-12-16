import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import LanguageSelectionPage from "./pages/LanguageSelectionPage";
import LoginScreen from "./pages/LoginScreen";
import PatientDetailsPage from "./pages/PatientDetailsPage";
import SymptomPage from "./pages/SymptomPage";
import GuidancePage from "./pages/GuidancePage";
import FacilityPage from "./pages/FacilityPage";
import AppointmentPage from "./pages/AppointmentPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LanguageSelectionPage />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/patient-details" element={<PatientDetailsPage />} />
            <Route path="/symptoms" element={<SymptomPage />} />
            <Route path="/guidance" element={<GuidancePage />} />
            <Route path="/facilities" element={<FacilityPage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;

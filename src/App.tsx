import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import XeroxHub from "./pages/XeroxHub";
import BusTracker from "./pages/BusTracker";
import Complaints from "./pages/Complaints";
import FacultyNotes from "./pages/FacultyNotes";
import TeamMatchmaker from "./pages/TeamMatchmaker";
import GreenSkills from "./pages/GreenSkills";
import GreenCareers from "./pages/GreenCareers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/xerox" element={<XeroxHub />} />
            <Route path="/bus-tracker" element={<BusTracker />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/notes" element={<FacultyNotes />} />
            <Route path="/team-matchmaker" element={<TeamMatchmaker />} />
            <Route path="/green-skills" element={<GreenSkills />} />
            <Route path="/green-careers" element={<GreenCareers />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

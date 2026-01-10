import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OfficialLogin from "./pages/OfficialLogin";
import OfficialRegister from "./pages/OfficialRegister";
import Schemes from "./pages/Schemes";
import About from "./pages/About";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import BookToken from "./pages/citizen/BookToken";
import MyTokens from "./pages/citizen/MyTokens";
import AIAssistant from "./pages/citizen/AIAssistant";
import Notifications from "./pages/citizen/Notifications";
import OfficialDashboard from "./pages/official/OfficialDashboard";
import QueueManagement from "./pages/official/QueueManagement";
import Analytics from "./pages/official/Analytics";
import Settings from "./pages/official/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/official/login" element={<OfficialLogin />} />
              <Route path="/official/register" element={<OfficialRegister />} />
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/about" element={<About />} />
              <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
              <Route path="/citizen/book-token" element={<BookToken />} />
              <Route path="/citizen/my-tokens" element={<MyTokens />} />
              <Route path="/citizen/assistant" element={<AIAssistant />} />
              <Route path="/citizen/notifications" element={<Notifications />} />
              <Route path="/official/dashboard" element={<OfficialDashboard />} />
              <Route path="/official/queue" element={<QueueManagement />} />
              <Route path="/official/analytics" element={<Analytics />} />
              <Route path="/official/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

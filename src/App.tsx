import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Schemes from "./pages/Schemes";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import BookToken from "./pages/citizen/BookToken";
import MyTokens from "./pages/citizen/MyTokens";
import AIAssistant from "./pages/citizen/AIAssistant";
import OfficialDashboard from "./pages/official/OfficialDashboard";
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
              <Route path="/schemes" element={<Schemes />} />
              <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
              <Route path="/citizen/book-token" element={<BookToken />} />
              <Route path="/citizen/my-tokens" element={<MyTokens />} />
              <Route path="/citizen/assistant" element={<AIAssistant />} />
              <Route path="/official/dashboard" element={<OfficialDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;

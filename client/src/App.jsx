import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, RequireAuth } from "@/context/AuthContext";
import Index from "./pages/Index";
import Vulnerabilities from "./pages/Vulnerabilities";
import VulnerabilityDetail from "./pages/VulnerabilityDetail";
import Learn from "./pages/Learn";
import BeginnerPath from "./pages/BeginnerPath";
import BeginnerLesson from "./pages/BeginnerLesson";
import CodeReviewPath from "./pages/CodeReviewPath";
import CodeReviewLesson from "./pages/CodeReviewLesson";
import NotFound from "./pages/NotFound";
import Reviews from "./pages/Reviews";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/vulnerabilities" element={<Vulnerabilities />} />
            <Route path="/vulnerability/:id" element={<VulnerabilityDetail />} />
            <Route path="/learn" element={<RequireAuth><Learn /></RequireAuth>} />
            <Route path="/learn/beginner" element={<RequireAuth><BeginnerPath /></RequireAuth>} />
            <Route path="/learn/beginner/:lessonId" element={<RequireAuth><BeginnerLesson /></RequireAuth>} />
            <Route path="/learn/code-review" element={<RequireAuth><CodeReviewPath /></RequireAuth>} />
            <Route path="/learn/code-review/:lessonId" element={<RequireAuth><CodeReviewLesson /></RequireAuth>} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

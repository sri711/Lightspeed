
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RecipeGenerator from "./pages/RecipeGenerator";
import ProfileCommunity from "./pages/ProfileCommunity";
import PantryTracker from "./pages/PantryTracker";
import MobileLayout from "./components/layout/MobileLayout";
import NotFound from "./pages/NotFound";
import HomePage from "./pages/HomePage";
import TraditionalMedicines from "./pages/TraditionalMedicines";
import FoodRating from "./pages/FoodRating";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={
            <MobileLayout>
              <HomePage />
            </MobileLayout>
          } />
          <Route path="/" element={
            <MobileLayout>
              <RecipeGenerator />
            </MobileLayout>
          } />
          <Route path="/profile" element={
            <MobileLayout>
              <ProfileCommunity />
            </MobileLayout>
          } />
          <Route path="/pantry" element={
            <MobileLayout>
              <PantryTracker />
            </MobileLayout>
          } />
          <Route path="/traditional-medicines" element={
            <MobileLayout>
              <TraditionalMedicines />
            </MobileLayout>
          } />
          <Route path="/food-rating" element={
            <MobileLayout>
              <FoodRating />
            </MobileLayout>
          } />
          <Route path="/index" element={<Navigate to="/home" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";

// Customer Pages
import CustomerDashboard from "./pages/customer/Dashboard";
import VendorDetail from "./pages/customer/VendorDetail";
import CustomerProfile from "./pages/customer/Profile";
import CustomerBookings from "./pages/customer/Bookings";

// Vendor Pages
import VendorDashboard from "./pages/vendor/Dashboard";
import VendorProfile from "./pages/vendor/Profile";
import VendorTimeSlots from "./pages/vendor/TimeSlots";
import VendorBookings from "./pages/vendor/Bookings";

// Context Providers
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            
            {/* Customer routes */}
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/vendor/:vendorId"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <VendorDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/profile"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <CustomerProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/bookings"
              element={
                <ProtectedRoute roles={["customer"]}>
                  <CustomerBookings />
                </ProtectedRoute>
              }
            />
            
            {/* Vendor routes */}
            <Route
              path="/vendor/dashboard"
              element={
                <ProtectedRoute roles={["vendor"]}>
                  <VendorDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendor/profile"
              element={
                <ProtectedRoute roles={["vendor"]}>
                  <VendorProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendor/slots"
              element={
                <ProtectedRoute roles={["vendor"]}>
                  <VendorTimeSlots />
                </ProtectedRoute>
              }
            />
            <Route
              path="/vendor/bookings"
              element={
                <ProtectedRoute roles={["vendor"]}>
                  <VendorBookings />
                </ProtectedRoute>
              }
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

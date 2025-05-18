
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const isCustomerDashboard = location.pathname === "/customer/dashboard";
  
  return (
    <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto shadow-lg overflow-hidden">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <main className="flex-grow overflow-y-auto pb-safe">{children}</main>
      
      {/* Show footer only on certain pages */}
      {!isCustomerDashboard && <Footer />}
    </div>
  );
};

export default Layout;

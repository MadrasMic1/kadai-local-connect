
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
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">{children}</main>
      
      {/* Show footer only on certain pages */}
      {!isCustomerDashboard && <Footer />}
    </div>
  );
};

export default Layout;

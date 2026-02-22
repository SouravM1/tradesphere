import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../landing_page/Navbar";
import Footer from "../landing_page/Footer";

function AppLayout({ children }) {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <>
      <Navbar />
      {children}
      {!isDashboard && <Footer />}
    </>
  );
}

export default AppLayout;

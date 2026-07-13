"use client";
import React, { useState, useEffect } from "react";
import Style from "../Style/DashboardHome.module.scss";
import DashboardSidebar from "./DashboardSidebar.jsx";
import DashboardHeader from "./DeshboardHeader.jsx";

const DashboardHome = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={Style.dashboardLayout}>
      <div className={Style.dashboardLayoutLeft}>
        <DashboardSidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          isMobile={isMobile}
        />
      </div>

      <div className={Style.rightContent}>
        <DashboardHeader toggleSidebar={toggleSidebar} />
        <div className={Style.pageContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

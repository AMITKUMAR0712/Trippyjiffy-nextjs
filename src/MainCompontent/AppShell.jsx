"use client";
import React, { useEffect } from "react";
import Header from "../HomeCompontent/Header";
import Footer from "../HomeCompontent/Footer";
import WhatsappButton from "../HomeCompontent/WhatsappButton";
import ScrollToTop from "../HomeCompontent/ScrollToTop";
import HeaderTop from "../HomeCompontent/HeaderTop";
import MobileBottomNav from "../HomeCompontent/MobileBottomNav";
import axios from "axios";

import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "../HomeCompontent/LanguageContext";
import { Toaster } from "sonner";

const AppShell = ({ children }) => {
  const baseURL = process.env.NODE_ENV === "production"
    ? ""
    : (process.env.NEXT_PUBLIC_API_BASE_URL || "https://trippyjiffy.com").replace(/\/$/, "");

  useEffect(() => {
    let cancelled = false;
    const fetchTheme = async () => {
      try {
        const settingsUrl = process.env.NODE_ENV === "production"
          ? "/api/settings/get"
          : `${baseURL}/api/settings/get`;
        const res = await axios.get(settingsUrl);
        if (cancelled) return;
        applyTheme(res.data);
      } catch (err) {
        console.error("Error fetching theme:", err);
      }
    };

    const runWhenIdle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 1200));
    const idleId = runWhenIdle(fetchTheme);

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }
    };
  }, [baseURL]);

  const applyTheme = (settings) => {
    if (!settings) return;
    const root = document.documentElement;
    root.style.setProperty("--primary-color", settings.primaryColor);
    root.style.setProperty("--secondary-color", settings.secondaryColor);
    root.style.setProperty("--navbar-color", settings.navbarColor);
    root.style.setProperty("--footer-color", settings.footerColor);
    root.style.setProperty("--card-radius", `${settings.borderRadius}px` || "20px");

    // Font family is fixed to the site's classic serif system (Playfair Display
    // headings + Georgia body) and intentionally does not follow the admin
    // theme picker's dynamic font setting here.

    // Handle dark theme body class
    if (settings.darkTheme) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  };

  return (
    <HelmetProvider>
      <LanguageProvider>
        <ScrollToTop />
        {/* Hide header top bar on mobile */}
        <HeaderTop />
        <Header />
        {children}
        <Footer />
        <WhatsappButton />
        {/* Mobile-only bottom nav */}
        <MobileBottomNav />
        <Toaster position="top-right" richColors expand={true} />
      </LanguageProvider>
    </HelmetProvider>
  );
};

export default AppShell;

"use client";
import React from "react";
import ScrollToTop from "../HomeCompontent/ScrollToTop";

const Adminlayout = ({ children }) => {
  return (
    <div>
      <ScrollToTop />
      {children}
    </div>
  );
};

export default Adminlayout;

"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Style from "../Style/DeshboardHeader.module.scss";
import { jwtDecode } from "jwt-decode";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://trippyjiffy.com";

const DeshboardHeader = () => {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAdminName(decoded.name);
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  const handleLogout = async () => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      try {
        await fetch(`${baseURL}/admin/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.error("Logout request failed", err);
      }
    }

    localStorage.removeItem("adminToken");
    router.push("/admin");
  };

  return (
    <div className={Style.DeshboardHeader}>
      <div className={Style.wrapper}>
        <div className={Style.DeshboardHeaderFlex}>
          <div className={Style.DeshboardHeaderLeft}>
            <h2>Welcome, {adminName || "Admin"}</h2>
          </div>
          <div className={Style.DeshboardHeaderRight}>
            <button className={Style.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeshboardHeader;

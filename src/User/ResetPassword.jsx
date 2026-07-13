"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Style from "../Style/ResetPassword.module.scss";
import { FiLock, FiRefreshCw } from "react-icons/fi";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://trippyjiffy.com";
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${baseURL}/api/users/reset-password`, {
        token,
        newPassword,
      });
      alert(res.data.message);
      setNewPassword("");
      router.push("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={Style.ResetPassword}>
      <h2>🔐 Reset Your Password</h2>
      <form onSubmit={handleSubmit}>
        <div className={Style.inputWrapper}>
          <FiLock className={Style.icon} />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          <FiRefreshCw style={{ marginRight: "8px" }} />
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

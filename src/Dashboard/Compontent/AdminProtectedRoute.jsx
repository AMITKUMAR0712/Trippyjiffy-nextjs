"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AdminProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("adminData"));
    if (!adminData) {
      router.replace("/admin");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null;

  return children;
};

export default AdminProtectedRoute;

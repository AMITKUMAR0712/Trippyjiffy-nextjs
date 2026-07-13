"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ScrollToTop from "../HomeCompontent/ScrollToTop";

const UserProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) return null;

  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

export default UserProtectedRoute;

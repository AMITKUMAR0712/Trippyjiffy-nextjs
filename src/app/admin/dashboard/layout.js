import AdminProtectedRoute from "@/Dashboard/Compontent/AdminProtectedRoute";
import DashboardHome from "@/Dashboard/Compontent/DashboardHome";

export default function AdminDashboardLayout({ children }) {
  return (
    <AdminProtectedRoute>
      <DashboardHome>{children}</DashboardHome>
    </AdminProtectedRoute>
  );
}

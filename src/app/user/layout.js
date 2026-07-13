import UserProtectedRoute from "@/User/UserProtectedRoute";
import UserdHome from "@/User/Dashboard/UserHome";

export default function UserRootLayout({ children }) {
  return (
    <UserProtectedRoute>
      <UserdHome>{children}</UserdHome>
    </UserProtectedRoute>
  );
}

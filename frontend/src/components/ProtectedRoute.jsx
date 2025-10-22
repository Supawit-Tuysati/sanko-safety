import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token"); // สมมติว่าเก็บ token ไว้
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

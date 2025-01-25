import useAuthstore from "@/zustand/useAuthStore";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthstore();
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export const AuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useAuthstore();
  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return children;
};

export const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthstore();
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  if (user.role !== "instructor") {
    return <Navigate to={"/"} />;
  }
  return children;
};

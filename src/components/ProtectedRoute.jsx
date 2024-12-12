import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) {
    return <Navigate to="/you-shall-not-pass" />;
  }
  return <div>{children}</div>;
};

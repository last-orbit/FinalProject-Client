import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  // console.log(isLoading);
  if (isLoading) {
    return <p>...is loading</p>;
  }
  if (!isLoggedIn) {
    return <Navigate to="/you-shall-not-pass" />;
  }
  return <div>{children}</div>;
};

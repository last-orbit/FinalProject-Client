import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/apiUrl.config";

const AuthContext = createContext();

const AuthContextWrapper = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const nav = useNavigate();

  //Functions
  function storeToken(token) {
    localStorage.setItem("authToken", token);
  }
  async function authenticateUser() {
    const theToken = localStorage.getItem("authToken");
    if (theToken) {
      try {
        const { data } = await axios.get(`${API_URL}/auth/verify`, {
          // This will be changed later  from our .env
          headers: { authorization: `Bearer ${theToken}` },
        });
        // console.log("successful authentication", data);
        setIsLoading(false);
        setIsLoggedIn(true);
        setUser(data.currentUser);
      } catch (error) {
        console.log("error in authentication", error);
        setIsLoading(false);
        setIsLoggedIn(false);
        setUser(null);
      }
    } else {
      //No token in local storage
      console.log("no token in local storage");
      setIsLoading(false);
      setIsLoggedIn(false);
      setUser(null);
    }
  }
  function handleLogout() {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
    nav("/");
  }

  function updateUser(updatedUser) {
    setUser(updatedUser);
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        authenticateUser,
        storeToken,
        handleLogout,
        isLoading,
        updateUser,
      }}
    >
      {/* add isLoading to value if we ever use a loader */}
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };

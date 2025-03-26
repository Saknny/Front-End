import { createContext, useState, useEffect } from "react";
import React from "react";
import Loading from "../../Components/Loading/Loading";

export const LoginContext = createContext();

export const LoginAdmin = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  return (
    <LoginContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </LoginContext.Provider>
  );
};

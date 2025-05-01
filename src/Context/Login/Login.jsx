import React, { createContext, useState, useEffect } from "react";
import Loading from "../../Components/Loading/Loading";

export const LoginContext = createContext();

export const LoginAdmin = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(
    localStorage.getItem("role") || "STUDENT"
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") || "wh"
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "AR" : "EN"));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => (prev === "dr" ? "wh" : "dr"));
  };

  if (isAuthenticated === null) {
    return <Loading />;
  }

  return (
    <LoginContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        language,
        toggleLanguage,
        darkMode,
        toggleDarkMode,
        userRole,
        setUserRole,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

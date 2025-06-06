import React, { createContext, useState, useEffect } from "react";
import Loading from "../../Components/Loading/Loading";

export const LoginContext = createContext();

export const LoginAdmin = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || "");
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") || "wh"
  );
  const [changingLanguage, setChangingLanguage] = useState(false);
  const [currentLang, setCurrentLang] = useState(language);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.dir = language === "AR" ? "rtl" : "ltr";
  }, [language]);

  useEffect(() => {
    if (language !== currentLang) {
      setChangingLanguage(true);
      setTimeout(() => {
        setCurrentLang(language);
        setChangingLanguage(false);
      }, 1000);
    }
  }, [language]);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Simulate loading delay to show <Loading /> for smoother UX
  useEffect(() => {
    const timer = setTimeout(() => {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "AR" : "EN"));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => (prev === "dr" ? "wh" : "dr"));
  };

  if (changingLanguage || isAuthenticated === null) {
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

import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved || "light";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const isLight = theme === "light";
  const value = {
    theme,
    toggleTheme,
    isLight,
    colors: {
      background: isLight ? "#ffffff" : "#1E1E2F",
      backgroundSecondary: isLight ? "#f8f9fa" : "#2A2A3F",
      text: isLight ? "#0b2540" : "#e0e0e0",
      primary: isLight ? "#296eb4" : "#342EA0",
      secondary: isLight ? "#c4eafb" : "#A3B8FF",
      card: isLight ? "#ffffff" : "#2A2A3F",
    },
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

import { createContext, useContext, useEffect, useState } from "react";

// Create context
const ThemeContext = createContext();

// Provider component
export const ThemeProvider = ({ childern }) => {
  // Check if user has a theme preference in localStorage
  const storedTheme = localStorage.getItem("theme");
  // Or check if they have a systme preference
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  // Set initial state based on these checks
  const [isDarkMode, setIsDarkMode] = useState(
    storedTheme ? storedTheme === "dark" : prefersDark
  );
  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  // Update document and store preference when theme changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      document.body.style.backgroundColor = "#0f172a";
      document.body.style.color = "white";
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.style.backgroundColor = "#f8fafc";
      document.body.style.color = "#1e293b";
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handelChange = (e) => {
      // Only changes if the hasn't explicitly set a perference
      console.log("handle change theme provider:", e);
      if (!localStorage.getItem("theme")) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handelChange);
    return () => mediaQuery.removeEventListener("change", handelChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {childern}
    </ThemeContext.Provider>
  );
};

// Custom hook for using the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

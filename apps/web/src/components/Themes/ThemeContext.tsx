"use client";

import { createContext, use, useContext, useState} from "react";

export type Theme = "light" | "dark";

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// TODOS:
// 1. Create Theme Provider
function ThemeProvider({ children, initialTheme }: {children: React.ReactNode; initialTheme: Theme}) {
      const [theme, setTheme] = useState<Theme>(initialTheme);
      // UseState to save theme
      const toggleTheme = () => {
        setTheme((current) => {
          const newTheme = current === "light" ? "dark" : "light";
          document.documentElement.setAttribute("data-theme", newTheme);
          document.cookie = `theme=${newTheme}; path=/;`;
          return newTheme;
        })
        // Toggles between light and dark themes based on saved theme
      };
return (
  <ThemeContext.Provider value={{ theme, toggleTheme
  }}>
    {children}
  </ThemeContext.Provider>
);
};
export { ThemeProvider };

// 2. Create useTheme hook
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}; //Createing custom hook

export { useTheme };

// 3. Use the provider in your layout

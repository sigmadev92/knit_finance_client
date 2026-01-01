import { createContext, useContext } from "react";
import type { ThemeContextType } from "../../types/theme";

const themeContext = createContext<ThemeContextType | null>(null);

const useTheme = () => {
  const value = useContext(themeContext);
  if (value) {
    const { theme, setTheme } = value;
    return { theme, setTheme };
  }

  throw new Error("useTheme must be used inside ThemeProvider");
};

export { themeContext, useTheme };

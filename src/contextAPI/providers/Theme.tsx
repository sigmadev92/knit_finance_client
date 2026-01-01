import { useState, type ReactElement } from "react";
import type { Theme } from "../../types/theme";
import { themeContext } from "../contexts/theme";
const CustomThemeProvider = ({ children }: { children: ReactElement }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const { Provider } = themeContext;
  return <Provider value={{ theme, setTheme }}>{children}</Provider>;
};

export default CustomThemeProvider;

import { useEffect } from "react";
import CustomRouter from "./Router";
import { useTheme } from "../contextAPI/contexts/theme";

const App = () => {
  const { setTheme } = useTheme();
  useEffect(() => {
    const prevTheme = localStorage.getItem("vRTsccDmContext101");
    let newTheme = "light";
    if (prevTheme === "light" || prevTheme === "dark") {
      newTheme = prevTheme;
      setTheme(prevTheme);
    } else setTheme("light");
    document.documentElement.classList.toggle("dark", prevTheme === "dark");
    localStorage.setItem("vRTsccDmContext101", newTheme);
  }, []);
  return <CustomRouter />;
};

export default App;

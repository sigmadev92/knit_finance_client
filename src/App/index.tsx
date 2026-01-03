import { useEffect } from "react";
import CustomRouter from "./Router";
import { useTheme } from "../contextAPI/contexts/theme";
import { useUser } from "../contextAPI/contexts/user";
import { usersURL } from "../constants/urls/backend";
import type { User } from "../types/user";
const App = () => {
  const { setTheme } = useTheme();

  const { user, setUser } = useUser();
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

  const fetchUser = async () => {
    try {
      const response = await fetch(`${usersURL}/auth`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Logged Out`);
      }
      const data: { user: User } = await response.json();

      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      return;
    }
    fetchUser();
  }, []);
  return <CustomRouter />;
};

export default App;

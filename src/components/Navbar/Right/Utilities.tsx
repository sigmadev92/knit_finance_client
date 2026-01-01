import { GithubIcon, MoonIcon, SunIcon } from "lucide-react";
import CustomButton from "../../ui/CustomButton";
import { useTheme } from "../../../contextAPI/contexts/theme";
import type { Theme } from "../../../types/theme";
const Utilities = ({ githubURL }: { githubURL?: string }) => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("vRTsccDmContext101", newTheme);
  };
  return (
    <div className="flex items-center gap-4">
      <a
        className="rounded-full p-1 shadow shadow-violet-400"
        href={githubURL || "https://github.com/sigmadev92"}
        target="_blank"
      >
        <GithubIcon size={14} />
      </a>
      <CustomButton
        variant="rounded-full"
        className=" p-1 shadow shadow-violet-400"
        onClick={toggleTheme}
      >
        {theme === "light" ? <MoonIcon size={14} /> : <SunIcon size={14} />}
      </CustomButton>
    </div>
  );
};

export default Utilities;

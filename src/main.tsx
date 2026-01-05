import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import CustomThemeProvider from "./contextAPI/providers/Theme";
import CustomUserProvider from "./contextAPI/providers/User";
import { Toaster } from "react-hot-toast";
import CustomTaskProvider from "./contextAPI/providers/Tasks";
import CustomCurrentTaskProvider from "./contextAPI/providers/CurrentTask";
createRoot(document.getElementById("root")!).render(
  <>
    <Toaster />
    <CustomThemeProvider>
      <CustomUserProvider>
        <CustomTaskProvider>
          <CustomCurrentTaskProvider>
            <App />
          </CustomCurrentTaskProvider>
        </CustomTaskProvider>
      </CustomUserProvider>
    </CustomThemeProvider>
  </>
);

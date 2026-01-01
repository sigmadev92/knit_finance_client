import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import CustomThemeProvider from "./contextAPI/providers/Theme";

createRoot(document.getElementById("root")!).render(
  <CustomThemeProvider>
    <App />
  </CustomThemeProvider>
);

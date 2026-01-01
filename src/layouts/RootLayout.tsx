import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const RootLayout = () => {
  return (
    <div className="h-[110vh]">
      <Navbar />
      <main className="h-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default RootLayout;

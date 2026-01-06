import { useState } from "react";
import Right from "./Right";
import Left from "./Left";
import MenuHorizontal from "./MenuHorizontal";

const Dashboard = () => {
  const [tab, setTab] = useState<number>(1);

  return (
    <section className="theme">
      <div className="p-2 h-screen md:flex">
        <Left tab={tab} setTab={setTab} />
        <MenuHorizontal tab={tab} setTab={setTab} />
        <Right tab={tab} />
      </div>
    </section>
  );
};

export default Dashboard;

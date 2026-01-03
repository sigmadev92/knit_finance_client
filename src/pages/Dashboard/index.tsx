import { useState } from "react";
import Right from "./Right";
import Left from "./Left";

const Dashboard = () => {
  const [tab, setTab] = useState<number>(1);

  return (
    <section className="theme">
      <div className="p-2 h-screen flex">
        <Left tab={tab} setTab={setTab} />
        <Right tab={tab} />
      </div>
    </section>
  );
};

export default Dashboard;

import { useState } from "react";
import DBBody from "./Body";

const AdminDashboard = () => {
  const [tab, setTab] = useState<number>(0);
  const adminDbTabs = [
    { tab: 0, name: "Tasks" },
    { tab: 1, name: "Profile" },
    { tab: 2, name: "Settings" },
  ];

  return (
    <section className="theme">
      <div className="p-4 h-full">
        <div className="">
          <ul className="list-none flex ">
            {adminDbTabs.map((ele) => (
              <li
                onClick={() => setTab(ele.tab)}
                className={`cursor-pointer text-[12px] px-2 py-1 ${
                  tab === ele.tab ? "theme-rev" : "bg-blue-400"
                }`}
                key={ele.tab}
              >
                {ele.name}
              </li>
            ))}
          </ul>
        </div>
        <DBBody tab={tab} />
      </div>
    </section>
  );
};

export default AdminDashboard;

import { useState } from "react";
import { useUser } from "../../../../contextAPI/contexts/user";
import Pending from "./Pending";
import History from "./History";

const Tasks = () => {
  const { user } = useUser();
  const adminTasksTabs = [
    { tab: 0, name: "Pending" },
    { tab: 1, name: "All Verified" },
  ];
  const [tab, setTab] = useState<number>(0);
  return (
    <div className="h-full">
      <div>
        <h3 className="font-bold">Tasks for Testing</h3>
        <p className="text-[12px]">
          See all tasks which are assigned to you for testing
        </p>
        <div className="flex gap-4 text-[12px] font-bold">
          <span>Current Tasks Assigned : {user?.tasksAssigned}</span>
          <span>Total Tasks Assigned : {user?.totalTasksAssigned}</span>
        </div>
      </div>
      <div className="p-2 rounded border-light">
        <ul className="flex text-[12px] items-center">
          {adminTasksTabs.map((ele) => (
            <li
              onClick={() => setTab(ele.tab)}
              className={`cursor-pointer px-3 py-1  hover:bg-black text-white ${
                ele.tab === tab ? "bg-blue-400 font-bold" : "bg-pink-600"
              }`}
              key={ele.tab}
            >
              {ele.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="h-[90%] text-[12px]">
        {tab === 0 && <Pending />}
        {tab === 1 && <History />}
      </div>
    </div>
  );
};

export default Tasks;

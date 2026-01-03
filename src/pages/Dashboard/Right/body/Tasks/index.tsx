import { useState } from "react";
import Create from "./Create";

const Tasks = () => {
  const tasks = [
    { tab: 0, name: "Create New" },
    { tab: 1, name: "All" },
    { tab: 2, name: "Not Started" },
    { tab: 3, name: "In Progress" },
    { tab: 4, name: "Completed" },
    { tab: 5, name: "Testing" },
    { tab: 6, name: "Failed" },
    { tab: 7, name: "Approved" },
  ];
  const [tab, setTab] = useState<number>(1);
  return (
    <div>
      <h3 className="font-bold mb-4">Tasks</h3>
      <div>
        <ul className="flex ">
          {tasks.map((ele) => (
            <li
              key={ele.tab}
              className={` hover:bg-gray-400 cursor-pointer text-[12px] p-4 py-2 ${
                tab === ele.tab ? "bg-white text-black" : "bg-blue-400"
              }`}
              onClick={() => {
                setTab(ele.tab);
              }}
            >
              {ele.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        {tab === 0 && <Create />}
        {tab === 1 && <div>All</div>}
        {tab === 2 && <div>Not Started</div>}
        {tab === 3 && <div>In Progress</div>}
        {tab === 4 && <div>Completed</div>}
        {tab === 5 && <div>Testing</div>}
        {tab === 6 && <div>Failed</div>}
        {tab === 7 && <div>Approved</div>}
      </div>
    </div>
  );
};

export default Tasks;

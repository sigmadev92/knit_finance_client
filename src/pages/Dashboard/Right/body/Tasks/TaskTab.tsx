import { dbRightTaskTabs } from "../../../../../constants/objects/dashboardTabs";
const TaskTab = ({
  tab,
  setTab,
}: {
  tab: number;
  setTab: (e: number) => void;
}) => {
  return (
    <div className="overflow-x-auto pb-4">
      <ul className="flex text-white">
        {dbRightTaskTabs.map((ele) => (
          <li
            key={ele.tab}
            className={` hover:bg-gray-400 cursor-pointer p-4 py-2 ${
              tab === ele.tab
                ? "dark:bg-white dark:text-black font-bold bg-black "
                : "bg-blue-400"
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
  );
};

export default TaskTab;

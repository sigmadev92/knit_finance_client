import { useEffect, useState } from "react";
import Create from "./Create";
import { useTask } from "../../../../../contextAPI/contexts/tasks";
import toast from "react-hot-toast";
import { taskURL } from "../../../../../constants/urls/backend";
import type { Task, TaskStatus } from "../../../../../types/task";
// import All from "./All";
import TaskBox from "../../../../../components/ui/TaskBox";
import TaskLayer from "./TaskLayer";
import { useCurrentTask } from "../../../../../contextAPI/contexts/currentTask";
import { statusColorMap } from "../../../../../constants/objects/statusColor";

const Tasks = () => {
  const { fetched, setTasks, tasks, setFetched } = useTask();
  const { currentTask, setCurrentTask } = useCurrentTask();
  const tasksTab = [
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
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${taskURL}`, {
        credentials: "include",
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch tasks ${response.status}`);
      }

      const { tasks }: { tasks: Task[] } = await response.json();

      setTasks(tasks);
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
    setFetched(true);
  };
  useEffect(() => {
    if (fetched) {
      console.log("running user db");
      return;
    }

    fetchTasks();
  }, []);

  return (
    <div className="relative h-full text-[12px]">
      <h3 className="font-bold mb-4">Tasks</h3>
      {currentTask && <TaskLayer />}
      <div className="overflow-x-auto pb-4">
        <ul className="flex text-white">
          {tasksTab.map((ele) => (
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
      <div>
        {tab === 0 && <Create />}
        {tab === 1 && (
          <div className="border-light rounded p-2">
            {tasks.length > 0 ? (
              <ul className="flex flex-wrap gap-4">
                {tasks.map((ele) => (
                  <li key={ele._id}>
                    <TaskBox taskData={ele} openTaskView={setCurrentTask} />
                  </li>
                ))}
              </ul>
            ) : (
              <div>No Task Created Yet</div>
            )}
          </div>
        )}
        {tab > 1 && tab <= 7 && (
          <div className="border-light rounded p-2">
            {tasks.filter((t) => t.status === tasksTab[tab].name).length > 0 ? (
              <ul className="flex flex-wrap gap-4">
                {tasks
                  .filter((t) => t.status === tasksTab[tab].name)
                  .map((ele) => (
                    <li key={ele._id}>
                      <TaskBox taskData={ele} openTaskView={setCurrentTask} />
                    </li>
                  ))}
              </ul>
            ) : (
              <div>
                No Task in{" "}
                <span
                  className={`p-1 ${
                    statusColorMap[tasksTab[tab].name as TaskStatus]
                  } `}
                >
                  {tasksTab[tab].name}
                </span>{" "}
                Phase
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;

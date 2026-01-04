import { useEffect, useState } from "react";
import Create from "./Create";
import { useTask } from "../../../../../contextAPI/contexts/tasks";
import toast from "react-hot-toast";
import { taskURL } from "../../../../../constants/urls/backend";
import type { Task } from "../../../../../types/task";
// import All from "./All";
import TaskBox from "../../../../../components/ui/TaskBox";
import TaskLayer from "../../../TaskLayer";

const Tasks = () => {
  const { fetched, setTasks, tasks, setFetched } = useTask();
  const [openedTask, setOpenedTask] = useState<Task | null>(null);
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
    <div className="relative h-full">
      <h3 className="font-bold mb-4">Tasks</h3>
      {openedTask && <TaskLayer taskObj={openedTask} close={setOpenedTask} />}
      <div className="overflow-x-auto pb-4">
        <ul className="flex ">
          {tasksTab.map((ele) => (
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
        {tab === 1 && (
          <div className="border-light rounded p-2">
            {tasks.length > 0 ? (
              <ul className="flex flex-wrap gap-4">
                {tasks.map((ele) => (
                  <li key={ele._id}>
                    <TaskBox taskData={ele} openTaskView={setOpenedTask} />
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
                      <TaskBox taskData={ele} openTaskView={setOpenedTask} />
                    </li>
                  ))}
              </ul>
            ) : (
              <div>
                No Task in{" "}
                <span className="px-3 bg-red-400 rounded">
                  {tasksTab[tab].name}
                </span>{" "}
                State
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;

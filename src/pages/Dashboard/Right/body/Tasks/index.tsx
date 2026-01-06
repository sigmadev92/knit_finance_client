import { useEffect, useState } from "react";
import Create from "./Create";
import { useTask } from "../../../../../contextAPI/contexts/tasks";
import toast from "react-hot-toast";
import { taskURL } from "../../../../../constants/urls/backend";
import type { Task } from "../../../../../types/task";
import TaskLayer from "./TaskLayer";
import { useCurrentTask } from "../../../../../contextAPI/contexts/currentTask";

import TaskTab from "./TaskTab";
import All from "./All";
import Remaining from "./Remaining";
import Analytics from "./Analytics";
const Tasks = () => {
  const { fetched, setTasks, setFetched } = useTask();
  const { currentTask } = useCurrentTask();

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
      <TaskTab tab={tab} setTab={setTab} />
      <div className="h-[90%]">
        {tab === 0 && <Create />}
        {tab === 1 && <All />}
        {tab > 1 && tab <= 7 && <Remaining tab={tab} />}
        {tab === 8 && <Analytics />}
      </div>
    </div>
  );
};

export default Tasks;

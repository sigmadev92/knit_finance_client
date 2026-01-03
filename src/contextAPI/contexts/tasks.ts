import { createContext, useContext } from "react";
import type { TasksContextType } from "../../types/task";
const taskContext = createContext<TasksContextType | undefined>(undefined);

const useTask = () => {
  const value = useContext(taskContext);
  if (value) {
    const { tasks, fetched, setTasks, setFetched } = value;
    return { tasks, fetched, setTasks, setFetched };
  }

  throw new Error("useTask must be used inside TaskProvider");
};

export { taskContext, useTask };

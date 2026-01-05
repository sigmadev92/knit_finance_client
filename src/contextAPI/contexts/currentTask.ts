import { createContext, useContext } from "react";
import type { CurrentTasksContextType } from "../../types/task";

const currentTaskContext = createContext<CurrentTasksContextType | null>(null);

const useCurrentTask = () => {
  const value = useContext(currentTaskContext);
  if (value) {
    const { currentTask, setCurrentTask } = value;
    return { currentTask, setCurrentTask };
  }

  throw new Error("useCurrentTask must be used inside UserProvider");
};

export { currentTaskContext, useCurrentTask };

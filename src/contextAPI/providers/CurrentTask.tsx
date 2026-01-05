import { useState, type ReactElement } from "react";
import type { Task } from "../../types/task";
import { currentTaskContext } from "../contexts/currentTask";
const CustomCurrentTaskProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const { Provider } = currentTaskContext;
  return (
    <Provider value={{ currentTask, setCurrentTask }}>{children}</Provider>
  );
};

export default CustomCurrentTaskProvider;

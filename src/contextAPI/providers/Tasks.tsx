import { useState, type ReactElement } from "react";
import type { Task } from "../../types/task";
import { taskContext } from "../contexts/tasks";
const CustomTaskProvider = ({ children }: { children: ReactElement }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [fetched, setFetched] = useState(false);
  const { Provider } = taskContext;
  return (
    <Provider value={{ tasks, setTasks, fetched, setFetched }}>
      {children}
    </Provider>
  );
};

export default CustomTaskProvider;

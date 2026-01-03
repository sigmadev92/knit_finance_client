export type TaskStatus =
  | "Not Started"
  | "In Progress"
  | "Completed"
  | "Testing"
  | "Failed"
  | "Approved";
export type Task = {
  _id: string;
  title: string;
  description: string;
  attempts: number;
  status: TaskStatus;
  userId: string;
  adminId: string;
  createdAt: string;
  updatedAt: string;
};

export type TasksContextType = {
  tasks: Task[];
  fetched: boolean;
  setFetched: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

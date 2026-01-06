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
  adminId: null | { _id: string; fullName: string; email: string };
  createdAt: string;
  updatedAt: string;
};

export type TasksContextType = {
  tasks: Task[];
  fetched: boolean;
  setFetched: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export type CurrentTasksContextType = {
  currentTask: Task | null;
  setCurrentTask: React.Dispatch<React.SetStateAction<Task | null>>;
};

export type Submission = {
  _id: string;
  testId: string;
  taskId: string;
  adminId: string;
  submittedOn: string;
  verifiedOn: string;
  isFailed: boolean;
  userId: string;
  isDeleted: boolean;
};

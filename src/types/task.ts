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
  createdAt: string;
  updatedAt: string;
};

export type UserRole = "admin" | "user";
export type User = {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  tasksAssigned?: number;
  tasksSentForTest?: number;
  totalTasksAssigned?: number;
  totalTasksSentForTest?: number;
  onVacation?: boolean;
  role: UserRole;
  updatedAt: string;
  isVerified: boolean;
};

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

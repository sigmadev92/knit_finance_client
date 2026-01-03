export type UserRole = "admin" | "user";
export type User = {
  _id: string;
  fullName: string;
  email: string;
  createdAt: string;
  role: UserRole;
  updatedAt: string;
};

export type UserContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

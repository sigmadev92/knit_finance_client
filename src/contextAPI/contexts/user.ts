import { createContext, useContext } from "react";
import type { UserContextType } from "../../types/user";

const userContext = createContext<UserContextType | null>(null);

const useUser = () => {
  const value = useContext(userContext);
  if (value) {
    const { user, setUser } = value;
    return { user, setUser };
  }

  throw new Error("useUser must be used inside UserProvider");
};

export { userContext, useUser };

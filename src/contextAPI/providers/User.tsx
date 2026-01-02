import { useState, type ReactElement } from "react";
import type { User } from "../../types/user";
import { userContext } from "../contexts/user";
const CustomUserProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);
  const { Provider } = userContext;
  return <Provider value={{ user, setUser }}>{children}</Provider>;
};

export default CustomUserProvider;

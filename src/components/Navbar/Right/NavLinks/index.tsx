import { useUser } from "../../../../contextAPI/contexts/user";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";

const NavLinks = () => {
  const { user } = useUser();
  return (
    <nav className="text-[12px]">{user ? <LoggedIn /> : <LoggedOut />}</nav>
  );
};

export default NavLinks;

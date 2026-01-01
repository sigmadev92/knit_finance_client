import Left from "./Left";
import Right from "./Right";

const Navbar = () => {
  return (
    <header className="flex justify-between px-4 py-2 fixed top-0 w-full box-border text-black dark:text-white">
      <Left />
      <Right />
    </header>
  );
};

export default Navbar;

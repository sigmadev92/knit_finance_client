import { useUser } from "../../../contextAPI/contexts/user";
import Tasks from "./body/Tasks";

const Right = ({ tab }: { tab: number }) => {
  const { user } = useUser();
  return (
    <div className="w-[85%] border-light ">
      <div className="h-[5%] bg-pink-400 px-2">
        <h3>{user?.role}</h3>
      </div>
      <div className="h-[95%] p-2">
        {tab === 1 && <Tasks />}
        {tab === 2 && <div>Profile</div>}
        {tab === 3 && <div>Settings</div>}
      </div>
    </div>
  );
};

export default Right;

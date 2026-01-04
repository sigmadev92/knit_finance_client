import Profile from "./Profile";
import Settings from "./Settings";
import Tasks from "./Tasks";

const DBBody = ({ tab }: { tab: number }) => {
  return (
    <div className="h-[95%]">
      {tab === 0 && <Tasks />}
      {tab === 1 && <Profile />}
      {tab === 2 && <Settings />}
    </div>
  );
};

export default DBBody;

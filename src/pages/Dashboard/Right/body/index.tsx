import Tasks from "./Tasks";

const RightBody = ({ tab }: { tab: number }) => {
  return (
    <div className="h-[95%] p-2">
      {tab === 1 && <Tasks />}
      {tab === 2 && <div>Profile</div>}
      {tab === 3 && <div>Settings</div>}
    </div>
  );
};

export default RightBody;

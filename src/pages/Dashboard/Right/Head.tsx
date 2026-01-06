import { useUser } from "../../../contextAPI/contexts/user";

const Head = () => {
  const { user } = useUser();
  return (
    <div className="h-[5%] flex justify-between bg-[#ea11eabb] px-2 font-bold items-center">
      <h3>User</h3>
      <span className="text-[12px]">
        {user?.isVerified ? "Account Verified" : "Demo Account"}
      </span>
    </div>
  );
};

export default Head;

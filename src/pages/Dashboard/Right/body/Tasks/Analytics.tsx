import { LockIcon } from "lucide-react";
import CustomButton from "../../../../../components/ui/CustomButton";
import { useUser } from "../../../../../contextAPI/contexts/user";

const Analytics = () => {
  const { user } = useUser();
  return (
    <div className="h-full">
      <div className="h-[10%]">
        <h3>Total Tasks sent for Testing: {user?.totalTasksSentForTest}</h3>
        <h3>Current Tasks sent for Testing: {user?.tasksSentForTest}</h3>
      </div>
      {!user?.isVerified && (
        <div className="h-[90%] center">
          <div className="flex flex-col items-center">
            <CustomButton variant="regular-confirm">
              <span className="flex items-center gap-2 font-bold">
                <LockIcon size={12} />
                <span>History</span>
              </span>
            </CustomButton>
            <p>
              You are using Demo Account. Create a real account or verify your
              mail to upgrade to real account
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;

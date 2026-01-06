import { NavLink } from "react-router-dom";
import CustomButton from "../../../../../../components/ui/CustomButton";
import { statusColorMap } from "../../../../../../constants/objects/statusColor";
import { useCurrentTask } from "../../../../../../contextAPI/contexts/currentTask";
import { useUser } from "../../../../../../contextAPI/contexts/user";
import type { TaskStatus } from "../../../../../../types/task";

const TaskLayerBodyLeft = ({
  changeStatusBtn,
  sendForTesting,
  deleteTaskBtn,
}: {
  changeStatusBtn: (e: TaskStatus) => void;
  sendForTesting: () => void;
  deleteTaskBtn: () => void;
}) => {
  const { currentTask } = useCurrentTask();
  const { user } = useUser();
  const { status } = currentTask!;
  return (
    <div className="md:w-[60%] flex flex-col gap-4 p-2">
      <div>
        <p className="font-bold flex gap-4 items-center">
          Current Status{" "}
          <span
            className={`${statusColorMap[status]} text-white p-2 text-[12px]`}
          >
            {status}
          </span>
        </p>

        {status === "Not Started" && (
          <div className="flex gap-4 w-full">
            <CustomButton
              className="bg-green-500 "
              variant="regular"
              onClick={() => changeStatusBtn("In Progress")}
            >
              <span>Start Now</span>
            </CustomButton>
          </div>
        )}
        {status === "In Progress" && (
          <div className="flex gap-4 w-full">
            <CustomButton
              variant="regular-confirm"
              onClick={() => changeStatusBtn("Completed")}
            >
              <span>Mark as Completed</span>
            </CustomButton>
          </div>
        )}
        {status === "Completed" && (
          <div className="flex gap-4 w-full">
            {user!.tasksSentForTest! < 5 && (
              <CustomButton
                className="bg-green-500 "
                variant="regular"
                onClick={() => sendForTesting()}
              >
                <span>Send for Testing</span>
              </CustomButton>
            )}
          </div>
        )}
        {status === "Failed" && (
          <div className="flex gap-4 w-full">
            <CustomButton className="bg-green-500 " variant="regular">
              <span>Restart</span>
            </CustomButton>
          </div>
        )}
      </div>
      <div>
        {status === "In Progress" && (
          <div>
            <span>You can Now Edit the Task</span>
          </div>
        )}

        {status === "Testing" && (
          <div>
            <p>Cannot delete Task</p>
            {currentTask?.adminId && (
              <div>
                Task Assigned to{" "}
                <NavLink
                  to={`/profile/${currentTask.adminId._id}`}
                  className="font-bold"
                >
                  {currentTask.adminId.fullName}
                </NavLink>
                {"       "}
                for Verification.
              </div>
            )}
          </div>
        )}

        {status !== "Testing" && (
          <CustomButton
            variant="regular-danger"
            onClick={() => deleteTaskBtn()}
          >
            <span>Delete Task</span>
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default TaskLayerBodyLeft;

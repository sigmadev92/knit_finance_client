import { XIcon } from "lucide-react";
import CustomButton from "../../components/ui/CustomButton";
import type { Task, TaskStatus } from "../../types/task";
import type React from "react";
import toast from "react-hot-toast";
import { taskURL, testingURL } from "../../constants/urls/backend";
import { useTask } from "../../contextAPI/contexts/tasks";
import type { User } from "../../types/user";

const TaskLayer = ({
  taskObj,
  close,
}: {
  taskObj: Task;
  close: React.Dispatch<React.SetStateAction<Task | null>>;
}) => {
  const { _id, title, description, status } = taskObj;
  const { setTasks } = useTask();
  const changeStatusBtn = async (newStatus: TaskStatus) => {
    try {
      const response = await fetch(`${taskURL}/status/user/${_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error(`Error changing the status ${response.status}`);
      }

      setTasks((prev) =>
        prev.map((ele) =>
          ele._id === _id ? { ...taskObj, status: newStatus } : ele
        )
      );
      close({ ...taskObj, status: newStatus });
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  const sendForTesting = async () => {
    try {
      const response = await fetch(`${testingURL}/`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ taskId: _id }),
      });
      if (!response.ok) {
        throw new Error(`Error in Sending for testing ${response.status}`);
      }

      const { admin }: { admin: User } = await response.json();

      setTasks((prev) =>
        prev.map((ele) =>
          ele._id === _id
            ? { ...taskObj, status: "Testing", adminId: admin._id }
            : ele
        )
      );
      close({ ...taskObj, status: "Testing", adminId: admin._id });
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="absolute z-4 top-0 w-full h-full bg-white text-black">
      <div className="bg-black text-white flex justify-between px-3">
        <span>Viewing Task -{_id} </span>
        <CustomButton onClick={() => close(null)}>
          <XIcon size={14} />
        </CustomButton>
      </div>

      <div className="md:flex p-3">
        <div className="md:w-[60%]">
          <h3 className="text-xl font-bold">{title}</h3>

          <p>{description}</p>
        </div>
        <div className="md:w-[40%] border-light p-2">
          <p className="font-bold">
            Current Status{" "}
            <span className="bg-red-300 px-2 rounded text-[12px]">
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
              <CustomButton variant="regular-confirm">
                <span>Mark as Completed</span>
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
              <CustomButton
                className="bg-green-500 "
                variant="regular"
                onClick={() => sendForTesting()}
              >
                <span>Send for Testing</span>
              </CustomButton>
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
      </div>
    </div>
  );
};

export default TaskLayer;

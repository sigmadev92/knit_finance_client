import { XIcon } from "lucide-react";
import CustomButton from "../../components/ui/CustomButton";
import type { Task, TaskStatus } from "../../types/task";
import type React from "react";
import toast from "react-hot-toast";
import { taskURL, testingURL } from "../../constants/urls/backend";
import { useTask } from "../../contextAPI/contexts/tasks";
import { useUser } from "../../contextAPI/contexts/user";
import Edit from "./Right/body/Tasks/Edit";

const TaskLayer = ({
  taskObj,
  close,
}: {
  taskObj: Task;
  close: React.Dispatch<React.SetStateAction<Task | null>>;
}) => {
  const { _id, status } = taskObj;
  const { setTasks } = useTask();
  const { user, setUser } = useUser();
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
      const response = await fetch(`${testingURL}/${_id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const data: { message: string } = await response.json();

        throw new Error(`${data.message} ${response.status}`);
      }

      const {
        message,
        newTest,
      }: {
        message: string;
        newTest: {
          adminId: string | null;
          _id: string;
          status: "Assigned" | "Queued";
        };
      } = await response.json();

      toast.success(message);

      setUser((prev) => {
        if (prev?.role === "user") {
          return {
            ...prev,
            tasksSentForTest: prev.tasksSentForTest! + 1,
          };
        } else return prev;
      });

      let adminId = null;
      if (newTest.status === "Assigned") {
        adminId = newTest.adminId;
      }

      setTasks((prev) =>
        prev.map((ele) =>
          ele._id === _id ? { ...taskObj, status: "Testing", adminId } : ele
        )
      );
      close({ ...taskObj, status: "Testing", adminId });
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  const deleteTaskBtn = async () => {
    try {
      const response = await fetch(`${taskURL}/${_id}`, {
        credentials: "include",
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete Task ${response.status}`);
      }
      setTasks((prev) => prev.filter((ele) => ele._id != _id));
      close(null);
      toast.success("Task deleted Successfully");
    } catch (error) {
      toast.error((error as Error).message);
      console.log(error);
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
      <div className="md:flex">
        <Edit
          openedTask={taskObj}
          canEdit={status === "In Progress"}
          setOpenedTask={close}
        />
        <div className="md:w-[40%] flex flex-col gap-4 border-light p-2">
          <div>
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

            {status === "Testing" && <p>Cannot delete Task</p>}

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
      </div>
    </div>
  );
};

export default TaskLayer;

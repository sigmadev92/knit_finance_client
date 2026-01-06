import type { TaskStatus } from "../../../../../../types/task";
import toast from "react-hot-toast";
import { taskURL, testingURL } from "../../../../../../constants/urls/backend";
import { useTask } from "../../../../../../contextAPI/contexts/tasks";
import { useUser } from "../../../../../../contextAPI/contexts/user";
import Edit from "../../../../../../pages/Dashboard/Right/body/Tasks/Edit";
import TaskLayerTop from "./Top";
import TaskLayerBodyLeft from "./Left";
import { useCurrentTask } from "../../../../../../contextAPI/contexts/currentTask";

const TaskLayer = () => {
  const { currentTask, setCurrentTask } = useCurrentTask();
  const { setTasks } = useTask();
  const { setUser } = useUser();
  const changeStatusBtn = async (newStatus: TaskStatus) => {
    try {
      const response = await fetch(
        `${taskURL}/status/user/${currentTask?._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PUT",
          credentials: "include",
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) {
        throw new Error(`Error changing the status ${response.status}`);
      }

      setTasks((prev) =>
        prev.map((ele) =>
          ele._id === currentTask?._id ? { ...ele, status: newStatus } : ele
        )
      );
      setCurrentTask((prev) => {
        if (!prev) return null;
        else
          return {
            ...prev,
            status: newStatus,
          };
      });
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  const sendForTesting = async () => {
    try {
      const response = await fetch(`${testingURL}/${currentTask!._id}`, {
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
          ele._id === currentTask?._id
            ? { ...currentTask, status: "Testing", adminId }
            : ele
        )
      );
      setCurrentTask({ ...currentTask!, status: "Testing", adminId });
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  const deleteTaskBtn = async () => {
    try {
      const response = await fetch(`${taskURL}/${currentTask?._id}`, {
        credentials: "include",
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete Task ${response.status}`);
      }
      setTasks((prev) => prev.filter((ele) => ele._id != currentTask!._id));
      setCurrentTask(null);
      toast.success("Task deleted Successfully");
    } catch (error) {
      toast.error((error as Error).message);
      console.log(error);
    }
  };

  return (
    <div className="absolute z-4 top-0 w-full h-full theme">
      <TaskLayerTop taskId={currentTask!._id} />
      <div className="md:flex p-4">
        <TaskLayerBodyLeft
          changeStatusBtn={changeStatusBtn}
          sendForTesting={sendForTesting}
          deleteTaskBtn={deleteTaskBtn}
        />
        <Edit />
      </div>
    </div>
  );
};

export default TaskLayer;

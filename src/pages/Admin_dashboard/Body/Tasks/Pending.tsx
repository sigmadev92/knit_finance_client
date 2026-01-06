import { useEffect } from "react";
import { useTask } from "../../../../contextAPI/contexts/tasks";
import toast from "react-hot-toast";
import { adminURL } from "../../../../constants/urls/backend";
import type { Task } from "../../../../types/task";
import { useUser } from "../../../../contextAPI/contexts/user";
import styles from "./pending.module.css";
import CustomButton from "../../../../components/ui/CustomButton";
const Pending = () => {
  const { fetched, setFetched, setTasks, tasks } = useTask();
  const { user, setUser } = useUser();
  const fetchPendingTests = async () => {
    try {
      const response = await fetch(`${adminURL}/pending-tasks`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Error in fetching pending tasks ${response.status}`);
      }

      const data: { tasks: Task[] } = await response.json();
      setFetched(true);
      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  const actionTaskBtn = async (
    taskId: string,
    action: "Approved" | "Failed"
  ) => {
    try {
      const response = await fetch(`${adminURL}/approve-task`, {
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "PUT",
        body: JSON.stringify({
          taskId,
          action,
        }),
      });
      if (!response.ok) {
        const { message }: { message: string } = await response.json();

        throw new Error(message);
      }

      setTasks((prev) => prev.filter((ele) => ele._id !== taskId));
      setUser((prev) => {
        if (prev?.role === "admin") {
          return { ...prev, tasksAssigned: prev!.tasksAssigned! - 1 };
        } else {
          return prev;
        }
      });

      toast.success(`Task Verified Successfully. Marked ${action}`);
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };
  useEffect(() => {
    if (fetched) {
      return;
    }
    if (user?.role === "admin") fetchPendingTests();
  }, []);
  return (
    <div className="h-full ">
      <div>
        <p>
          See all the tasks which are assigned to you for testing and in Pending
          state
        </p>
        <span> Current Limit : 5</span>
      </div>

      {tasks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className={styles.tableStyle}>
            <thead className="bg-blue-400">
              <tr>
                <th>Task ID</th>
                <th>User Id</th>
                <th>Title</th>
                <th>Description</th>
                <th>Created On</th>
                <th>Attempts</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((ele) => (
                <tr key={ele._id}>
                  <td>{ele._id}</td>
                  <td>{ele.userId}</td>
                  <td>{ele.title.slice(0, 20)}...</td>
                  <td>{ele.description.slice(0, 20)}...</td>
                  <td>{new Date(ele.createdAt).toDateString()}</td>
                  <td>{ele.attempts}</td>
                  <td className="flex gap-4 items-center justify-center">
                    <CustomButton
                      variant="regular-confirm"
                      onClick={() => actionTaskBtn(ele._id, "Approved")}
                    >
                      <span>Approve</span>
                    </CustomButton>
                    <CustomButton
                      variant="regular-danger"
                      onClick={() => actionTaskBtn(ele._id, "Failed")}
                    >
                      <span>Reject</span>
                    </CustomButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-[90%] center">
          <p>No Pending Tasks</p>
        </div>
      )}
    </div>
  );
};

export default Pending;

import TaskBox from "../../../../../components/ui/TaskBox";
import { dbRightTaskTabs } from "../../../../../constants/objects/dashboardTabs";
import { statusColorMap } from "../../../../../constants/objects/statusColor";
import { useCurrentTask } from "../../../../../contextAPI/contexts/currentTask";
import { useTask } from "../../../../../contextAPI/contexts/tasks";
import type { TaskStatus } from "../../../../../types/task";

const Remaining = ({ tab }: { tab: number }) => {
  const { tasks } = useTask();
  const { setCurrentTask } = useCurrentTask();
  return (
    <div className="border-light rounded p-2">
      {tasks.filter((t) => t.status === dbRightTaskTabs[tab].name).length >
      0 ? (
        <ul className="flex flex-wrap gap-4">
          {tasks
            .filter((t) => t.status === dbRightTaskTabs[tab].name)
            .map((ele) => (
              <li key={ele._id}>
                <TaskBox taskData={ele} openTaskView={setCurrentTask} />
              </li>
            ))}
        </ul>
      ) : (
        <div>
          No Task in{" "}
          <span
            className={`p-1 ${
              statusColorMap[dbRightTaskTabs[tab].name as TaskStatus]
            } `}
          >
            {dbRightTaskTabs[tab].name}
          </span>{" "}
          Phase
        </div>
      )}
    </div>
  );
};

export default Remaining;

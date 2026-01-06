import TaskBox from "../../../../../components/ui/TaskBox";
import { useCurrentTask } from "../../../../../contextAPI/contexts/currentTask";
import { useTask } from "../../../../../contextAPI/contexts/tasks";

const All = () => {
  const { tasks } = useTask();
  const { setCurrentTask } = useCurrentTask();
  return (
    <div className="border-light rounded p-2">
      {tasks.length > 0 ? (
        <ul className="flex flex-wrap gap-4">
          {tasks.map((ele) => (
            <li key={ele._id}>
              <TaskBox taskData={ele} openTaskView={setCurrentTask} />
            </li>
          ))}
        </ul>
      ) : (
        <div>No Task Created Yet</div>
      )}
    </div>
  );
};

export default All;

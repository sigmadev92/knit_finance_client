import type React from "react";
import type { Task } from "../../types/task";
import CustomButton from "./CustomButton";
import { DoorClosedLocked, Trash2Icon } from "lucide-react";
import { statusColorMap } from "../../constants/objects/statusColor";

const TaskBox = ({
  taskData,
  openTaskView,
}: {
  taskData: Task;
  openTaskView: React.Dispatch<React.SetStateAction<Task | null>>;
}) => {
  const { title, description, attempts, status } = taskData;
  return (
    <div className="rounded border p-2 hover:shadow hover:shadow-amber-300 theme h-[150px] w-[200px] relative">
      <span className={`text-[12px] px-2 ${statusColorMap[status]} rounded`}>
        {status}
      </span>
      <h3 className="font-bold text-xl">{title}</h3>

      <p className="text-[12px]">{description.slice(0, 100)}</p>

      <div className="flex justify-around items-center theme left-0 w-full  absolute bottom-2 text-[12px]">
        <CustomButton
          onClick={() => openTaskView(taskData)}
          className="hover:bg-amber-300"
          variant="regular-critical"
        >
          <span>View</span>
        </CustomButton>
        <span>Attempts : {attempts}</span>
        {status === "Testing" ? (
          <DoorClosedLocked color="red" size={14} />
        ) : (
          <CustomButton>
            <Trash2Icon color="red" size={14} />
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default TaskBox;

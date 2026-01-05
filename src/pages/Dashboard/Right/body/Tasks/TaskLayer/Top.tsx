import { XIcon } from "lucide-react";
import CustomButton from "../../../../../../components/ui/CustomButton";
import { useCurrentTask } from "../../../../../../contextAPI/contexts/currentTask";

const TaskLayerTop = ({ taskId }: { taskId: string }) => {
  const { setCurrentTask } = useCurrentTask();
  return (
    <div className="bg-gray-500 text-white flex justify-between px-3">
      <span>Viewing Task -{taskId} </span>
      <CustomButton onClick={() => setCurrentTask(null)}>
        <XIcon size={14} />
      </CustomButton>
    </div>
  );
};

export default TaskLayerTop;

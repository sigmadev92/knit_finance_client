import { useState, type ChangeEvent, type FormEvent } from "react";
import TextInput from "../../../../../components/ui/TextInput";
import CustomTextArea from "../../../../../components/ui/TextArea";
import CustomButton from "../../../../../components/ui/CustomButton";
import toast from "react-hot-toast";
import { taskURL } from "../../../../../constants/urls/backend";
import { useTask } from "../../../../../contextAPI/contexts/tasks";
import { useCurrentTask } from "../../../../../contextAPI/contexts/currentTask";

const Edit = () => {
  const { currentTask, setCurrentTask } = useCurrentTask();
  const { setTasks } = useTask();
  const [taskForm, setForm] = useState<{ title: string; description: string }>({
    title: currentTask!.title,
    description: currentTask!.description,
  });
  if (!currentTask) return;

  const { title, description } = taskForm;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const changes: { title?: string; description?: string } = {};
    if (title !== currentTask.title) {
      changes.title = title;
    }
    if (title !== currentTask.description) {
      changes.description = description;
    }
    try {
      const response = await fetch(`${taskURL}/${currentTask._id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changes),
      });

      if (!response.ok) {
        throw new Error(`Failed to Edit task ${response.status}`);
      }
      setTasks((prev) =>
        prev.map((ele) =>
          ele._id === currentTask._id ? { ...currentTask, ...changes } : ele
        )
      );
      setCurrentTask({ ...currentTask, ...changes });
      toast.success("Task Edited successfully");
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };
  return (
    <div className="shadow shadow-pink-300 p-3 rounded md:w-[40%] center">
      <form className="w-[300px] flex flex-col gap-6" onSubmit={handleSubmit}>
        <TextInput
          value={title}
          style={{
            size: "flex flex-col gap-3",
            input: "border-light p-2 text-[12px]",
          }}
          placeholder="Enter title of task"
          label="Title"
          inputType="text"
          min={10}
          required={true}
          readOnly={currentTask.status !== "In Progress"}
          max={50}
          handleChange={(e: ChangeEvent<HTMLInputElement>) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
          name="title"
        />
        <CustomTextArea
          value={description}
          styles={{
            outer: "flex flex-col gap-3",
            textArea: "resize-none border-light px-2 text-[12px]",
          }}
          handleChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setForm((prev) => ({ ...prev, description: e.target.value }))
          }
          rows={4}
          label="Description"
          readonly={currentTask.status !== "In Progress"}
          placeholder="Enter description of task"
          name="Description"
        />
        <CustomButton
          btnType="submit"
          variant="regular-confirm"
          disabled={
            title === currentTask.title &&
            description === currentTask.description
          }
        >
          <span>Edit</span>
        </CustomButton>
      </form>
    </div>
  );
};

export default Edit;

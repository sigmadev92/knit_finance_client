import { useState, type ChangeEvent, type FormEvent } from "react";
import TextInput from "../../../../../components/ui/TextInput";
import CustomTextArea from "../../../../../components/ui/TextArea";
import CustomButton from "../../../../../components/ui/CustomButton";
import toast from "react-hot-toast";
import { taskURL } from "../../../../../constants/urls/backend";
import type { Task } from "../../../../../types/task";
import { useTask } from "../../../../../contextAPI/contexts/tasks";
// import type { Task } from "../../../../../types/task";

const Create = () => {
  const { setTasks } = useTask();
  const [taskForm, setForm] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });
  const { title, description } = taskForm;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${taskURL}/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create task ${response.status}`);
      }
      const { newTask }: { newTask: Task } = await response.json();
      setTasks((prev) => [...prev, newTask]);
      toast.success("Task added successfully");
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };
  return (
    <div className="shadow shadow-pink-300 p-3 rounded mt-4">
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
          placeholder="Enter description of task"
          name="Description"
        />
        <CustomButton btnType="submit" variant="regular-confirm">
          <span>Submit</span>
        </CustomButton>
      </form>
    </div>
  );
};

export default Create;

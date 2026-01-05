import {
  BookOpenCheck,
  CircleCheckBig,
  Edit2Icon,
  Trash2Icon,
} from "lucide-react";
import styles from "./register.module.css";
const Left = () => {
  return (
    <div className="hidden sm:block w-[40%] shadow-md rounded-xl h-[400px] shadow-blue-300">
      <div className="flex flex-col h-full gap-4 ">
        <h3 className=" text-3xl text-center font-bold">Join Us Today</h3>
        <p className="p-4">
          Create Tasks from Projects and get Verified by Admins.
        </p>
        <ul className={styles.leftUl}>
          <li>
            <BookOpenCheck />
            Your tasks are private to you
          </li>
          <li>
            {" "}
            <CircleCheckBig />
            Only admins can view and verify your tasks
          </li>
          <li>
            <Edit2Icon fill="white" />
            Edit and <Trash2Icon fill="white" /> Delete your Tasks
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Left;

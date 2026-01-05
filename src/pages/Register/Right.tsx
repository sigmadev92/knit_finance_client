import CustomButton from "../../components/ui/CustomButton";
import { NavLink, useNavigate } from "react-router-dom";
import TextInput from "../../components/ui/TextInput";
import { usersURL } from "../../constants/urls/backend";
import { useState, type ChangeEvent, type FormEvent } from "react";

import toast from "react-hot-toast";
import { LockIcon, Mail, User2Icon } from "lucide-react";
import OrBreaker from "../../components/ui/OrBreaker";
const Right = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [role, setRole] = useState<"admin" | "user">("user");
  const { fullName, email, password } = formData;
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log(formData);

    const names = fullName.split(" ");
    if (names.length < 2 || names.length > 3) {
      toast.error("Invalid Full Name");
      return;
    }
    console.log(usersURL);

    try {
      const response = await fetch(`${usersURL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          role,
        }),
      });
      if (!response.ok) {
        throw new Error(`Error While creating user ${response.status}`);
      }

      toast.success("Registered successfully");
      navigate("/out/login");
    } catch (error: unknown) {
      console.log(error);
      toast.error((error as Error).message);
    }
  }
  return (
    <div className="w-[90%] sm:w-[40%]   h-[450px] shadow-2xs rounded-2xl px-5">
      <h3 className=" text-3xl text-center font-bold">User Sign Up </h3>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col gap-4 mx-auto items-center"
      >
        <TextInput
          label="Full Name"
          variant="regular"
          placeholder="John F Cena"
          name="fullName"
          inputType="text"
          style={{ input: "px-3 py-1 placeholder:text-[12px]" }}
          value={fullName}
          icon={<User2Icon size={15} />}
          handleChange={handleChange}
        />
        <TextInput
          label="Email"
          variant="regular"
          placeholder="email here"
          name="email"
          style={{ input: "px-3 py-1 placeholder:text-[12px]" }}
          inputType="email"
          value={email}
          icon={<Mail size={15} />}
          handleChange={handleChange}
        />
        <TextInput
          label="Password"
          placeholder="**********"
          variant="regular"
          name="password"
          inputType="password"
          value={password}
          style={{ input: "px-3 py-1 placeholder:text-[12px]" }}
          icon={<LockIcon size={15} />}
          handleChange={handleChange}
        />
        <select
          className="backdrop:blur-2xl theme text-blue-400 cursor-pointer"
          name="role"
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setRole(e.target.value as "admin" | "user")
          }
        >
          <option value={"admin"}>Admin</option>
          <option value={"user"}>User</option>
        </select>
        <CustomButton className="text-[14px]" variant="submit" btnType="submit">
          Register
        </CustomButton>
      </form>
      <OrBreaker />
      {/* <div className="flex justify-center"> */}
      {/* <CustomButton className="" variant="regular-dark">
              <span className="flex gap-2 items-center">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg"
                  className="w-4 h-4"
                />{" "}
                Sign In with Google
              </span>
            </CustomButton> */}
      {/* </div> */}
      <div className="flex justify-center mt-3">
        <p>
          Already have an account?{" "}
          <NavLink to={"/out/login"} className={"hover:underline"}>
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Right;

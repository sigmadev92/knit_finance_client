import { useState, type ChangeEvent, type FormEvent } from "react";
import TextInput from "../../components/ui/TextInput";
// import { images } from "../../functions/images";
import toast from "react-hot-toast";
import { LockIcon, Mail } from "lucide-react";
import CustomButton from "../../components/ui/CustomButton";
import { NavLink, useNavigate } from "react-router-dom";

import { usersURL } from "../../constants/urls/backend";
import { useUser } from "../../contextAPI/contexts/user";
import type { User } from "../../types/user";
const Login = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const { setUser } = useUser();
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter valid details");
      return;
    }

    try {
      const response = await fetch(`${usersURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        throw new Error(`Failed to Login ${response.status}`);
      }
      const data: { user: User } = await response.json();
      setUser(data.user);
      toast.success("Logged in successfully");
      if (data.user.role === "admin") {
        navigate("/in/dashboard/admin");
      } else navigate("/in/dashboard");
    } catch (error: unknown) {
      console.log(error);
      toast.error((error as Error).message);
    }
  }
  return (
    <section className="theme">
      <div className="w-full  h-full flex flex-col md:flex-row md:justify-between">
        <div className="h-full w-[65%] relative hidden md:block">
          <div className="absolute w-full md:h-full top-0 left-0 flex justify-center items-center">
            <div className="flex flex-col gap-4 items-center">
              <h3 className="text-4xl font-bold text-[#1f1fdd]">
                Knit Finance
              </h3>
              <p className="text-2xl">You can always Count on Us</p>
            </div>
          </div>
        </div>
        <div
          className={` w-[90%] sm:w-[35%] h-full flex flex-col justify-center items-center`}
        >
          <div className="w-[90%]">
            <h3 className=" text-3xl text-center font-bold">Sign In </h3>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col gap-4 mx-auto items-center"
            >
              <TextInput
                label="Email"
                variant="regular"
                placeholder="email here"
                name="email"
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
                icon={<LockIcon size={15} />}
                handleChange={handleChange}
              />
              <CustomButton btnType="submit" variant="submit">
                Login
              </CustomButton>
            </form>
            <p className="text-center my-2">-----OR-----</p>
            <div className="flex justify-center">
              {/* <CustomButton className="" variant="regular-dark">
                <span className="flex gap-2 items-center">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Google_Favicon_2025.svg"
                    className="w-4 h-4"
                  />{" "}
                  Sign In with Google
                </span>
              </CustomButton> */}
            </div>
            <div className="flex justify-between mt-3">
              <p>
                Don't have an account?{" "}
                <NavLink to={"/out/register"} className={"hover:underline"}>
                  Register
                </NavLink>
              </p>
              <NavLink
                to={"/out/password/forgot"}
                className={"hover:underline"}
              >
                Forgot Password
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

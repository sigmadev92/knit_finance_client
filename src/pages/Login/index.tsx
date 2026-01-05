import Left from "./Left";
import Right from "./Right";

const Login = () => {
  return (
    <section className="theme">
      <div className="w-full  h-full flex flex-col md:flex-row md:justify-between">
        <Left />
        <Right />
      </div>
    </section>
  );
};

export default Login;

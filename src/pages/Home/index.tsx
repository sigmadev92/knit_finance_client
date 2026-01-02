import { useUser } from "../../contextAPI/contexts/user";

const Home = () => {
  const { user } = useUser();
  return (
    <section className="theme center">
      <div className="h-[500p] flex flex-col gap-16 justify-between items-center p-5 rounded-md dark:shadow dark:shadow-amber-50">
        <div>
          <h3 className="text-4xl font-bold text-[#1b4ce0]">
            Task Management System
          </h3>
          {user && (
            <p>
              Hello <span className="font-bold">{user.fullName}</span>
            </p>
          )}
        </div>
        <p className="text-2xl font-bold dark:text-white text-black">
          Knit Finance
        </p>
      </div>
    </section>
  );
};

export default Home;

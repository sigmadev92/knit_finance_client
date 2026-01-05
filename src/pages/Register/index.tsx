import Left from "./Left";
import Right from "./Right";

const Register = () => {
  return (
    <section className={`pt-11 theme h-full`}>
      {/* <img src={images["forDashboard"].src} className="h-screen w-full" /> */}
      <div className="top-0 left-0 w-full h-full flex justify-center gap-8 items-center">
        <Left />
        <Right />
      </div>
    </section>
  );
};

export default Register;

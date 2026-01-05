import RightBody from "./body";
import Head from "./Head";

const Right = ({ tab }: { tab: number }) => {
  return (
    <div className="w-full md:w-[85%] border-light ">
      <Head />
      <RightBody tab={tab} />
    </div>
  );
};

export default Right;

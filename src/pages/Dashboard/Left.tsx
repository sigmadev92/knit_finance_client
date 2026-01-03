import { dbLefttabs } from "../../constants/objects/dashboardTabs";
const Left = ({
  tab,
  setTab,
}: {
  tab: number;
  setTab: (e: number) => void;
}) => {
  return (
    <div className="w-[15%] p-4 box-border border-light text-[12px]">
      <h3 className="text-center font-bold text-xl mb-4">Dashboard</h3>
      <ul className="list-none flex flex-col gap-3">
        {dbLefttabs.map((ele) => (
          <li
            key={ele.tab}
            className={`cursor-pointer p-1 hover:bg-blue-400 ${
              tab === ele.tab ? "bg-blue-500 font-bold" : "bg-transparent"
            }`}
            onClick={() => {
              setTab(ele.tab);
            }}
          >
            {ele.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Left;

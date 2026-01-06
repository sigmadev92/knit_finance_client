import { dbLefttabs } from "../../constants/objects/dashboardTabs";
const MenuHorizontal = ({
  tab,
  setTab,
}: {
  tab: number;
  setTab: (e: number) => void;
}) => {
  return (
    <div className="block md:hidden p-4 box-border border-light text-[12px]">
      <ul className="flex">
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

export default MenuHorizontal;

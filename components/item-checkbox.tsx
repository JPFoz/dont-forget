import { actions } from "../lib/item-store";
import { Item } from "../lib/types";

export default function Checkbox({item, proxyName}:{item: Item, proxyName: string}) {

  function toggleChecked(checked){
    actions.toggleItem(proxyName, item.id, checked)
  }
  
  return (
    <div>
      <label>
        <input type="checkbox" onChange={() => { toggleChecked(!item.done);}}/>
        <svg
          className={`inline-block h-5 w-5 border-2 border-solid  mr-4 ${item.done ? "bg-blue border-blue" : "border-white dark:border-slate dark:border-bg-slate bg-white"}`}
          aria-hidden="true"
          viewBox="0 0 15 11"
          fill="none"
        >
          <path
            d="M1 4.5L5 9L14 1"
            strokeWidth="2"
            stroke={item.done ? "#fff" : "none"}
          />
        </svg>
        </label>
    </div>
  );
}
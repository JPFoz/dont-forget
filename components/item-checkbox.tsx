import { actions } from "../lib/item-store";
import { Item } from "../lib/types";

export default function Checkbox({item}:{item: Item}) {

  function toggleChecked(checked){
    actions.toggleItem(item.id, checked)
  }
  
  return (
    <div>
      <label>
        <input type="checkbox" onChange={() => { toggleChecked(!item.done);}}/>
        <svg
          className={`checkbox ${item.done ? "checkbox--active" : ""}`}
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
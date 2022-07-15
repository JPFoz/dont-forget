
import React from "react";
import Checkbox from "./item-checkbox";
import { actions } from "../lib/item-store";
import { Item } from "../lib/types";

type ItemContainerData = {
  key: number,
  item: Item,
  proxyName: string
}

export default function ItemContainer({key, item, proxyName}: ItemContainerData){
  const {id, text, dateCreated, done } = item
  
  function handleItemUpdate(value) {
    actions.updateItemText(proxyName, id, value )
  }

  function handleRemoveItem() {
    actions.removeItem(proxyName, id)
  }

  return (
    <li key={key}>
        <a href="#" className="flex items-center p-3 text-base font-bold text-gray-900 bg-pink-100 rounded-lg group dark:bg-gray-600 dark:text-white shadow-sm">
            <Checkbox item={item} proxyName={proxyName}></Checkbox>
            <input type="text" value={text} onChange={(e) => {handleItemUpdate(e.target.value)}} className={"border-none focus:outline-none focus:ring-0 bg-pink-100  text-stone-500 text-sm block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" + (item.done ? " line-through": "")}></input>
            <span className="inline-flex items-center justify-center px-2 py-0.5  text-xs font-medium text-gray-500 bg-white rounded dark:bg-gray-700 dark:text-gray-400">{dateCreated.toDateString()}</span>
            <button type="button" onClick={()=> handleRemoveItem()}className="dark:bg-gray-600 rounded-md p-2 inline-flex items-center justify-center text-gray-400 focus:outline-none ">
              <span className="sr-only">Close menu</span>
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </a>
    </li>
  )
}
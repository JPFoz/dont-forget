
import React, { useState } from "react";
import ItemsContainer from "./items-container"
import AddItem from "./add-item"


export default function Section({ items, heading, proxyName, expandTitle }){

  const [doneExpanded, setDoneExpanded] = useState(false)

  const onExpandToggle = () => {
    const newExpanded = !doneExpanded
    setDoneExpanded(newExpanded);
  }

  const lastItemNotCompleted = items.length > 0 && items[items.length - 1].text === null
  
  const outstandingItems = items.filter(item => !item.done)
  const completedItems = items.filter(item => item.done)
  return (
  <div className="p-4 max-w-sm bg-pink-200 border-pink-200 rounded-lg border shadow-md  dark:bg-gray-800 dark:border-gray-700">
  <h5 className="b-3 text-base font-semibold text-white lg:text-xl dark:text-white">
      {heading}
      <ItemsContainer items={outstandingItems} proxyName={proxyName}></ItemsContainer>
      {!lastItemNotCompleted && <AddItem proxyName={proxyName}></AddItem>}
      {completedItems.length > 0 &&
      <div className="mt-3">
        <div className = "flex flex-row" >
        <svg xmlns="http://www.w3.org/2000/svg" className={"h-6 w-6 mr-1"+ (doneExpanded ? " rotate-180 ": "")} fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
        </svg>
          <h2 onClick={onExpandToggle}>{expandTitle}</h2>
        </div>
        {doneExpanded && <ItemsContainer items={completedItems} proxyName={proxyName}></ItemsContainer>}
      </div>
      }
  </h5>
</div>
  )
}
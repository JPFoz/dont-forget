
import React from 'react';
import ItemsContainer from './items-container'
import AddItem from './add-item'


export default function Section({ items, heading }){

  const lastItemNotCompleted = items.length > 0 && items[items.length - 1].text === null
  
  return (
  <div className="p-4 max-w-sm bg-white rounded-lg border shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700">
  <h5 className="mb-3 text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
      {heading}
      <ItemsContainer items={items}></ItemsContainer>
      {!lastItemNotCompleted && <AddItem></AddItem>}
  </h5>
</div>
  )
}
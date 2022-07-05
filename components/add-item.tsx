
import React from 'react';
import { actions } from '../lib/item-store';
export default function AddItem(){
    function addItem() {
        actions.addItem({ 
            text: null,
            done: false,
            dateCompleted: new Date(),
            dateCreated: new Date()
        })
    }
        
    return (
        <div className="flex flex-row">
            <a onClick={() => addItem()} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Add an item
            </a>
        </div>
    )
}
import { proxy, useSnapshot} from 'valtio'
import { addItemToList, removeItem, updateListItem, toggleListItem } from './firestore'
import { ItemStore, Item} from './types'
import { uuidv4 } from '@firebase/util'

export const itemStore = proxy<ItemStore>({
  items: [],
})

export const isItemDiff = (a: Item, b: Item) => a.text !== b.text || a.done !== b.done;

export const actions = {
  addItem(item: Omit<Item, 'id'>) {
    const newItem = {
      ...item,
      id: uuidv4(),
    }
    itemStore.items.push(newItem)
    addItemToList(newItem, 'to-buy')
  },
  syncChanges(changes){
    changes.forEach((change) => {
      if (change.type === "added") {
        const newItem = change.doc.data()
        const existsAlready = itemStore.items.find((i) => i.id === newItem.id)
        if(!existsAlready){
          itemStore.items.push({
            ...newItem,
            dateCompleted: newItem.dateCompleted.toDate(),
            dateCreated: newItem.dateCreated.toDate()
          })
        }
      }
      if (change.type === "modified") {
          const changedItem = change.doc.data()
          const storeItem = itemStore.items.find((i) => i.id === changedItem.id)
          storeItem.text = changedItem.text
          storeItem.done = changedItem.done
      }
      if (change.type === "removed") {
        const removedItem = change.doc.data()
        itemStore.items = itemStore.items.filter((item) => item.id !== removedItem.id)
      }
    });
  },
  updateItemText(id: string, text: string){
    const item = itemStore.items.find((item) => item.id === id)
    item.text = text
    updateListItem('to-buy', item)
  },
  toggleItem(id: string, value: boolean) {
    const item = itemStore.items.find((item) => item.id === id)
    if (item && value) item.done = value
    else if (item) item.done = !item.done
    toggleListItem('to-buy', id, value)
  },
  removeItem(id: string) {
    itemStore.items = itemStore.items.filter((item) => item.id !== id)
    removeItem(id, 'to-buy')
  }
}

export function useItems() {
  const snapShot = useSnapshot(itemStore, { sync: true })
  return snapShot.items
}


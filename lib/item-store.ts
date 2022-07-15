import { proxy, useSnapshot} from "valtio"
import { addItemToList, removeListItem, updateListItem, toggleListItem } from "./firestore"
import { ItemStore, Item} from "./types"
import { uuidv4 } from "@firebase/util"

export const TOBUY_PROXY = "to-buy"
export const TODO_PROXY = "todo"

const proxies = {
  "to-buy": proxy<ItemStore>({items: []}),
  "todo": proxy<ItemStore>({items: []})
}

export const isItemDiff = (a: Item, b: Item) => a.text !== b.text || a.done !== b.done;

export const actions = {
  addItem(proxyName: string, item: Omit<Item, "id">) {
    const newItem = {
      ...item,
      id: uuidv4(),
    }
    proxies[proxyName].items.push(newItem)
    addItemToList(proxyName, newItem)
  },
  syncChanges(proxyName: string, changes){
    changes.forEach((change) => {
      if (change.type === "added") {
        const newItem = change.doc.data()
        const existsAlready = proxies[proxyName].items.find((item: Item) => item.id === newItem.id)
        if(!existsAlready){
          proxies[proxyName].items.push({
            ...newItem,
            dateCompleted: newItem.dateCompleted.toDate(),
            dateCreated: newItem.dateCreated.toDate()
          })
        }
      }
      if (change.type === "modified") {
          const changedItem = change.doc.data()
          const storeItem = proxies[proxyName].items.find((item: Item) => item.id === changedItem.id)
          storeItem.text = changedItem.text
          storeItem.done = changedItem.done
      }
      if (change.type === "removed") {
        const removedItem = change.doc.data()
        proxies[proxyName].items = proxies[proxyName].items.filter((item: Item) => item.id !== removedItem.id)
      }
    });
  },
  updateItemText(proxyName: string, id: string, text: string){
    const item = proxies[proxyName].items.find((item) => item.id === id)
    item.text = text
    updateListItem(proxyName, item)
  },
  toggleItem(proxyName: string, id: string, value: boolean) {
    const item = proxies[proxyName].items.find((item: Item) => item.id === id)
    if (item && value) item.done = value
    else if (item) item.done = !item.done
    toggleListItem(proxyName, id, value)
  },
  removeItem(proxyName: string, id: string) {
    proxies[proxyName].items = proxies[proxyName].items.filter((item: Item) => item.id !== id)
    removeListItem(proxyName, id)
  }
}

export function useItems(proxyName: string) {
  const snapShot = useSnapshot(proxies[proxyName], { sync: true })
  return snapShot.items
}



import React from "react";
import { Item } from "../lib/types";
import ItemContainer from "./item-container"

type ItemData = {
  items: Item[],
  proxyName: string
}

export default function ItemsContainer({ items, proxyName }: ItemData){
  return (
    <ul className="my-2 space-y-2">
      {items.map((item, i) => (
      <ItemContainer key={i} item={item} proxyName={proxyName}></ItemContainer>
      ))}
    </ul>
  )
}
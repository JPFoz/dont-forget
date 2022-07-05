
import React from 'react';
import { Item } from '../lib/types';
import ItemContainer from './item-container'

type ItemData = {
  items: Item[],
}

export default function ItemsContainer({ items }: ItemData){
  return (
    <ul className="my-4 space-y-3">
      {items.map((item, i) => (
      <ItemContainer key={i} item={item}></ItemContainer>
      ))}
    </ul>
  )
}
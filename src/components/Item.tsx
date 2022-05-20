import React, {FC} from 'react';
import {InterfaceItem} from '../models/InterfaceItem'

interface ItemProps {
  itemData: InterfaceItem
}

const Item: FC<ItemProps> = ({itemData}) => {
  return (
    <div>
      <span>{itemData.id}</span>
      <span>{itemData.orderDate.toLocaleDateString()}</span>
      <span>{itemData.name}</span>
      <span>{itemData.recipient}</span>
      <span>{itemData.endDate.toLocaleDateString()}</span>
      <span>{itemData.state}</span>
      <span>{itemData.zone}</span>
    </div>
  );
}


export default Item;

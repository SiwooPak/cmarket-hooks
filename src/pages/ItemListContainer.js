import React from 'react';
import Item from '../components/Item';

function ItemListContainer({ items, updateCart }) {
  const handleClick = (e, itemId) => {
    
    updateCart(itemId);
  }
  return (
    <div id="item-list-container">
      <div id="item-list-body">
        <div id="item-list-title">쓸모없는 선물 모음</div>
        {items.map((item, idx) => <Item item={item} key={idx} handleClick={handleClick} />)}
      </div>
    </div>
  );
}

export default ItemListContainer;

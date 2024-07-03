
import React from 'react';

const Item = ({ item, editItem, deleteItem }) => {
  return (
    <div>
      <span>{item.name} - {item.email} - {item.phone}</span>
      <button onClick={() => editItem(item)}>Edit</button>
      <button onClick={() => deleteItem(item.id)}>Delete</button>
    </div>
  );
};

export default Item;

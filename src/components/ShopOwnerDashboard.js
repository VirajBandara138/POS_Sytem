import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockManagement = () => {
  const [stockItems, setStockItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '', quantity: '' });

  useEffect(() => {
    // Fetch the current stock
    axios.get('/api/shop/stock', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => {
        setStockItems(response.data);
      });
  }, []);

  const handleAddItem = () => {
    axios.post('/api/shop/stock', newItem, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => {
        setStockItems([...stockItems, response.data]);
        setNewItem({ name: '', price: '', quantity: '' });
      });
  };

  return (
    <div>
      <h2>Manage Stock</h2>
      <input
        type="text"
        placeholder="Item Name"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newItem.quantity}
        onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
      />
      <button onClick={handleAddItem}>Add Item</button>

      <h3>Current Stock</h3>
      <ul>
        {stockItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.price} - {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockManagement;

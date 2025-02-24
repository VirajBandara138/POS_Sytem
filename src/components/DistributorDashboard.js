import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DistributorDashboard = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    // Fetch all shops and their stock details
    axios.get('/api/distributor/shops', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
      .then(response => {
        setShops(response.data);
      });
  }, []);

  return (
    <div>
      <h2>Distributor Dashboard</h2>
      <h3>Shops</h3>
      <ul>
        {shops.map(shop => (
          <li key={shop.id}>
            {shop.name} - Stock: {shop.stock.length}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DistributorDashboard;

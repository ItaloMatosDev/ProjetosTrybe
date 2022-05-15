import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CardOrder from './CardOrder';

// import { Container } from './styles';

function OrdersList() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const getSales = async () => {
      const allSales = await axios.get('http://localhost:3001/customer/checkout');
      console.log(allSales);
      setSales(allSales.data);
      localStorage.setItem('sales', JSON.stringify(allSales.data));
      return sales;
    };

    getSales();
  }, []);

  return (
    <div
      style={ { display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' } }
    >
      { sales.map((e, i) => (
        <CardOrder sales={ { ...e, key: i } } key={ i } />
      )) }
    </div>
  );
}

export default OrdersList;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

// import { Container } from './styles';

function CardOrder(props) {
  const { sales } = props;
  const [list, setList] = useState([]);
  const [totalLocal, setTotalLocal] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setList(sales);
    const getDate = new Date(sales.saleDate);
    setDate(getDate.toLocaleDateString('pt-Br'));
    if (sales.product.length !== 0) {
      const total = list.product.reduce((acc, rec) => acc + (rec.price * acc.value));
      setTotalLocal(total.toFixed(2).toString().replace('.', ','));
    } else if (sales.product.length === 0) {
      setTotalLocal('0,00');
    }
  }, []);

  const goTo = () => {
    localStorage.setItem('detail', JSON.stringify(sales));
    navigate(`/customer/orders/${sales.id}`);
  };

  const numMagic = 4;

  const card = () => (
    <button
      type="button"
      style={ { display: 'flex', width: '500px', justifyContent: 'space-around' } }
      onClick={ () => goTo() }
    >
      <div style={ { display: 'block' } }>
        <div>Pedido</div>
        <div
          data-testid={ `customer_orders__element-order-id-${sales.id}` }
        >
          { (sales.id).toString().padStart(numMagic, '0') }
        </div>
      </div>
      <div
        data-testid={ `customer_orders__element-delivery-status-${sales.id}` }
      >
        { sales.status }
      </div>
      <div style={ { display: 'block' } }>
        <div
          data-testid={ `customer_orders__element-order-date-${sales.id}` }
        >
          { date }
        </div>
        <div>{ `R$ ${totalLocal}` }</div>
      </div>
    </button>

  );

  return card();
}

export default CardOrder;

import React, { useEffect } from 'react';

// import { Container } from './styles';

function CardDetailsOrder() {
  useEffect(() => {
    const detail = JSON.parse(localStorage.getItem('detail'));
    console.log(detail);
  }, []);
  return (
    <div>Detalhes do pedido</div>
  );
}

export default CardDetailsOrder;

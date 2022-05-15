import React, { useState } from 'react';
import CardCheckout from './CardCheckout';

// import { Container } from './styles';

function Checkout() {
  // const { selected } = useContext(GlobalContext);
  const [address, setAddress] = useState({});
  // const local = JSON.parse(localStorage.getItem('chart'));

  function handleChange({ target: { value, name } }) {
    setAddress({
      ...address,
      [name]: value,
    });
  }

  function submitBtn() {
    const res = {
      userId: JSON.parse(localStorage.getItem('user')).id,
      sellerId: '1',
      totalPrice: JSON.parse(localStorage.getItem('chart'))
        .reduce((acc, { price, quantity }) => acc + (price * quantity), 0),
      deliveryAddress: address.address,
      deliveryNumber: address.number,
      status: 'Pendente',
      products: JSON.parse(localStorage.getItem('chart')),
    };
    console.log(res);
  }

  const list = () => (
    <select
      name="vend"
      onChange={ handleChange }
      data-testid="customer_checkout__select-seller"
    >
      <option value="">-</option>
      <option value="Fulana Pereira">Fulana Pereira</option>
    </select>
  );

  const card = () => (
    <div>
      <div>
        <h2>Finalizar pedidos</h2>
        <div>
          <CardCheckout />
        </div>
      </div>
      <div style={ { marginTop: '70px' } }>
        <h2>Detalhes e endereços para entrega</h2>
        <form action="" style={ { display: 'flex', justifyContent: 'space-around' } }>
          <div style={ { display: 'block' } }>
            <h4>P. Vendedora responsável</h4>
            { list() }
          </div>
          <div style={ { display: 'block' } }>
            <h4>Endereço</h4>
            <input
              data-testid="customer_checkout__input-address"
              style={ { width: '300px' } }
              type="text"
              name="address"
              placeholder="Address here - with no number"
              onChange={ handleChange }
            />
          </div>
          <div style={ { display: 'block' } }>
            <h4>Número</h4>
            <input
              data-testid="customer_checkout__input-addressNumber"
              style={ { width: '50px' } }
              type="number"
              name="number"
              onChange={ handleChange }
            />
          </div>
        </form>
        <div style={ { textAlign: 'center', marginTop: '20px' } }>
          <button
            data-testid="customer_checkout__button-submit-order"
            type="button"
            onClick={ () => submitBtn() }
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </div>
    </div>
  );

  return card();
}

export default Checkout;

import React from 'react';
import BuyerInfo from '../components/BuyerInfo';
import PaymentMethods from '../components/PaymentMethods';
import * as modules from '../services/modules';

class Checkout extends React.Component {
  render() {
    const arrayCart = modules.getCartState();
    const totalPrice = modules.handleTotalCart();
    return (
      <div>
        {
          arrayCart.map((product) => (
            <div key={ product.id }>
              <span>{ product.title }</span>
              <div>
                <span>{ product.price }</span>
              </div>
            </div>
          ))
        }
        <span>
          Preço total:
          { totalPrice }
        </span>
        <BuyerInfo />
        <PaymentMethods />
        <button type="button">Finalizar compra</button>
      </div>
    );
  }
}

export default Checkout;

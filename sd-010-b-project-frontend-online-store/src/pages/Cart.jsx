import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as modules from '../services/modules';
import BtnDecrement from '../components/BtnDecrement';
import BtnIncrement from '../components/BtnIncrement';
import BtnDel from '../components/BtnDel';

class Cart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reload: false,
    };
    this.handleReload = this.handleReload.bind(this);
  }

  handleReload() {
    const { reload } = this.state;
    this.setState({ reload });
  }

  render() {
    const cart = modules.getCartState();
    const totalPrice = modules.handleTotalCart();

    return cart.length ? (
      <div>
        {cart.map((product) => (
          <div key={ product.id }>
            <BtnIncrement product={ product } handleReload={ this.handleReload } />
            <span data-testid="shopping-cart-product-name">
              {product.title}
            </span>
            <p data-testid="shopping-cart-product-quantity">{product.qty}</p>
            <BtnDecrement product={ product } handleReload={ this.handleReload } />

            <BtnDel product={ product } handleReload={ this.handleReload } />
          </div>
        ))}
        <span>
          Preço total:
          { totalPrice }
        </span>
        <Link to={ { pathname: '/checkout' } }>
          <button
            type="button"
            data-testid="checkout-products"
          >
            Finalizar compra
          </button>
        </Link>
      </div>
    ) : (
      <span data-testid="shopping-cart-empty-message">
        Seu carrinho está vazio
      </span>
    );
  }
}

Cart.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      cart: PropTypes.arrayOf.isRequired,
    }),
  }).isRequired,
};

export default Cart;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ButtonToCart from './ButtonToCart';
import * as modules from '../services/modules';

class CartComponent extends Component {
  render() {
    return (
      <section className="cart-container">
        <Link
          className="cart-icon"
          to="/cart"
          data-testid="shopping-cart-button"
        >
          <ButtonToCart />
        </Link>
        <p
          className="cart-number"
          data-testid="shopping-cart-size"
        >
          {modules.getLength()}
        </p>
      </section>
    );
  }
}

export default CartComponent;

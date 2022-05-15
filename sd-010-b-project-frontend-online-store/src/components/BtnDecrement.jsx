import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as modules from '../services/modules';

export default class BtnDecrement extends Component {
  constructor(props) {
    super(props);
    this.handleReloadAmountCart = this.handleReloadAmountCart.bind(this);
  }

  handleReloadAmountCart() {
    const { product, handleReload } = this.props;
    modules.handleAmount(product, false);
    if (product.qty < 2) {
      modules.handleDelete(product);
    }
    handleReload();
  }

  render() {
    return (
      <div>
        <button
          data-testid="product-decrease-quantity"
          type="button"
          onClick={ this.handleReloadAmountCart }
        >
          -
        </button>
      </div>
    );
  }
}

BtnDecrement.propTypes = {
  product: PropTypes.shape({ qty: PropTypes.number }).isRequired,
  handleReload: PropTypes.func.isRequired,
};

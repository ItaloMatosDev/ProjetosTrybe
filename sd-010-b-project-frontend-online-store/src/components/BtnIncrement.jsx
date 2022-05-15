import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as modules from '../services/modules';

export default class BtnIncrement extends Component {
  constructor(props) {
    super(props);
    this.handleReloadAmountCart = this.handleReloadAmountCart.bind(this);
  }

  handleReloadAmountCart() {
    const { product, handleReload } = this.props;
    modules.handleAmount(product, true);
    handleReload();
  }

  render() {
    return (
      <div>
        <button
          data-testid="product-increase-quantity"
          type="button"
          onClick={ this.handleReloadAmountCart }
        >
          +
        </button>
      </div>
    );
  }
}

BtnIncrement.propTypes = {
  product: PropTypes.shape({}).isRequired,
  handleReload: PropTypes.func.isRequired,
};

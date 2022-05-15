import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as modules from '../services/modules';

export default class BtnDel extends Component {
  constructor(props) {
    super(props);
    this.handleReloadAmountCart = this.handleReloadAmountCart.bind(this);
  }

  handleReloadAmountCart() {
    const { product, handleReload } = this.props;
    modules.handleDelete(product);
    handleReload();
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={ this.handleReloadAmountCart }
        >
          X
        </button>
      </div>
    );
  }
}

BtnDel.propTypes = {
  product: PropTypes.shape({}).isRequired,
  handleReload: PropTypes.func.isRequired,
};

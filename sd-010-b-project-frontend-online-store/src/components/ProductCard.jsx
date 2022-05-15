import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as modules from '../services/modules';
import './ProductCard.css';

export default class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleAddToCart() {
    const { item, handleReload } = this.props;
    modules.addProductCart(item);
    handleReload();
  }

  render() {
    const { item } = this.props;
    const { title, thumbnail, price, shipping } = item;

    return (
      <div className="card" data-testid="product">
        <div className="img-card">
          <img src={ thumbnail } alt="img" />
        </div>
        <div className="title-card">
          <p data-testid="shopping-cart-product-name">{title}</p>
        </div>
        <div className="price-card">
          <span>{`R$ ${price}`}</span>
        </div>

        <div className="button-container">
          <button
            className="button-add-cart"
            type="button"
            onClick={ this.handleAddToCart }
            data-testid="product-add-to-cart"
          >
            Adicionar
          </button>
        </div>
        <div className="button-link">
          <Link
            className="details-link"
            data-testid="product-detail-link"
            to={ { pathname: '/details', state: { item } } }
          >
            Detalhes
          </Link>
        </div>

        <div className="frete-card">
          { shipping.free_shipping ? <p data-testid="free-shipping">Frete grátis</p> : ''}
        </div>

      </div>
    );
  }
}

ProductCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    shipping: PropTypes.shape({
      free_shipping: PropTypes.bool.isRequired,
    }),
  }).isRequired,
  handleReload: PropTypes.func.isRequired,
};

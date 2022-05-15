import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AiFillStar } from 'react-icons/ai';
import ButtonToCart from '../components/ButtonToCart';
import * as modules from '../services/modules';
import StarRating from '../components/StarRating';
import FormRating from '../components/FormRating';

class ProductDetails extends Component {
  constructor(props) {
    super(props);

    this.handleEmailMsgRating = this.handleEmailMsgRating.bind(this);
    this.handleSubmitRating = this.handleSubmitRating.bind(this);
    this.handleAvaliation = this.handleAvaliation.bind(this);
    this.handleRealodAddToCart = this.handleRealodAddToCart.bind(this);

    this.state = {
      rating: 0,
      email: '',
      avaliation: '',
      reload: true,
    };
  }

  handleSubmitRating(e) {
    e.preventDefault();
    const {
      location: {
        state: { item },
      },
    } = this.props;

    const { rating, email, avaliation, reload } = this.state;
    const obj = { id: item.id, rating, email, avaliation };
    modules.setReview(obj);
    this.setState({ reload });
  }

  handleEmailMsgRating(e) {
    const { name, value } = e.target;
    const isnum = /^\d+$/.test(value);
    const value2 = !isnum ? value : parseInt(value, 10);

    this.setState({ [name]: value2 });
  }

  handleRealodAddToCart() {
    const {
      location: {
        state: { item },
      },
    } = this.props;

    const { reload } = this.state;
    modules.addProductCart(item);

    this.setState({ reload });
  }

  handleAvaliation() {
    const {
      location: {
        state: { item },
      },
    } = this.props;

    return (
      <div>
        {modules.getReviews(item.id).map((prod, index) => (
          <div key={ index }>
            <p>{prod.email}</p>
            <p>{prod.avaliation}</p>
            {[...Array(prod.rating)].map((_, index2) => (<AiFillStar
              key={ index + index2 }
              color="#FFD700"
            />))}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const {
      location: {
        state: { item },
      },
    } = this.props;
    const { title, shipping } = item;
    const { rating } = this.state;
    return (
      <div>
        <Link to={ { pathname: '/cart' } } data-testid="shopping-cart-button">
          <ButtonToCart />
        </Link>
        <p data-testid="shopping-cart-size">{modules.getLength()}</p>
        <p data-testid="product-detail-name">{title}</p>
        { shipping.free_shipping ? <p data-testid="free-shipping">Frete Grátis</p> : ''}
        <button
          type="button"
          data-testid="product-detail-add-to-cart"
          onClick={ this.handleRealodAddToCart }
        >
          Adicionar
        </button>
        <StarRating
          rating={ rating }
          handleEmailMsgRating={ this.handleEmailMsgRating }
        />
        <FormRating
          handleEmailMsgRating={ this.handleEmailMsgRating }
          handleSubmitRating={ this.handleSubmitRating }
        />
        {this.handleAvaliation()}
      </div>
    );
  }
}

ProductDetails.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      item: PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.string,
        shipping: PropTypes.shape({
          free_shipping: PropTypes.bool.isRequired,
        }),
      }),
    }),
  }).isRequired,
};

export default ProductDetails;

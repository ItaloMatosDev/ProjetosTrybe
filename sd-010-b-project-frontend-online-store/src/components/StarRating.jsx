import React, { Component } from 'react';
import { AiFillStar } from 'react-icons/ai';
import PropTypes from 'prop-types';

export default class StarRating extends Component { // StarRating based on https://www.youtube.com/watch?v=eDw46GYAIDQ&t=532s
  render() {
    const { rating, handleEmailMsgRating } = this.props;
    const num = 5;

    return (
      <div>
        {[...Array(num)].map((star, index) => {
          const ratingValue = index + 1;
          return (
            <label htmlFor={ index } key={ index }>
              <input
                id={ index }
                name="rating"
                value={ ratingValue }
                onClick={ (e) => handleEmailMsgRating(e) }
                type="radio"
              />
              <AiFillStar
                color={ ratingValue <= rating ? '#FFD700' : '#a9a9a9' }
              />
            </label>
          );
        })}
      </div>
    );
  }
}

StarRating.propTypes = {
  handleEmailMsgRating: PropTypes.func.isRequired,
  rating: PropTypes.number.isRequired,
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormRating extends Component {
  render() {
    const { handleSubmitRating, handleEmailMsgRating } = this.props;
    return (
      <div>
        <form>
          <input
            type="email"
            required
            placeholder="Email"
            name="email"
            onChange={ (e) => handleEmailMsgRating(e) }
          />
          <textarea
            name="avaliation"
            cols="30"
            rows="10"
            data-testid="product-detail-evaluation"
            onChange={ (e) => handleEmailMsgRating(e) }
          />
          <button type="submit" onClick={ handleSubmitRating }>
            Enviar
          </button>
        </form>
      </div>
    );
  }
}

FormRating.propTypes = {
  handleSubmitRating: PropTypes.func.isRequired,
  handleEmailMsgRating: PropTypes.func.isRequired,
};

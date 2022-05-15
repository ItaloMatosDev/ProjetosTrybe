// implement Rating component here
import React from 'react';
import PropTypes from 'prop-types';

class Rating extends React.Component {
  render() {
    const { rating } = this.props;
    return (
      <section>
        <span className="rating">{rating}</span>
      </section>
    );
  }
}
Rating.propTypes = { rating: PropTypes.number };

Rating.defaultProps = {
  rating: 'undefined',
};

export default Rating;

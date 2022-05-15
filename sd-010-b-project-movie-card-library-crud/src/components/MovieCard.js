/* eslint-disable react/prop-types */
import React from 'react';
// import movies from '../services/movieData';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    const { title, storyline, id, imagePath } = movie;
    return (
      <div data-testid="movie-card">
        <img alt="Movie Cover" src={ `../${imagePath}` } />
        <p>
          { title }
        </p>
        <p>{ storyline }</p>
        <Link to={ `movies/${id}` }>
          VER DETALHES
        </Link>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    storyline: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieCard;

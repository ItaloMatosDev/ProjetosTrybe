import React, { Component } from 'react';
import { Loading } from '../components';
import MovieCard from '../components/MovieCard';
import * as movieAPI from '../services/movieAPI';
// import movies from '../services/movieData';

class MovieList extends Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchMovie();
  }

  async fetchMovie() {
    this.setState({ loading: true },
      async () => {
        const movieList = await movieAPI.getMovies();
        this.setState({ movies: movieList, loading: false });
      });
  }

  render() {
    const { movies, loading } = this.state;
    // const { getMovie } = this.props;
    // Render Loading here if the request is still happening
    // this.getMovie();
    return (
      <div data-testid="movie-list">
        {/* {movies.map((movie) => <MovieCard key={ movie.title } movie={ movie } />)} */}
        { loading ? <Loading /> : movies.map((movie) => (<MovieCard
          key={ movie.title }
          movie={ movie }
        />)) }
      </div>
    );
  }
}

export default MovieList;

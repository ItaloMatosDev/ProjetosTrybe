import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import AddMovie from './AddMovie';
// import MovieList from './MovieList';
// import SearchBar from './SearchBar';
// import AddMovie from './AddMovie';

class MovieLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      bookmarkedOnly: false,
      selectedGenre: '',
      movies: props.movies,
    };
  }

  onBookmarkedChange = ({ target }) => {
    this.setState({ bookmarkedOnly: target.checked });
  }

  onSelectedGenreChange= ({ target }) => {
    this.setState({ selectedGenre: target.value });
  }

  onSearchTextChange = ({ target }) => {
    this.setState({ searchText: target.value });
  }

  search = (searchText, bookmarkedOnly, selectedGenre, movies) => {
    let moviesSearch = movies;
    // busca por texto
    if (searchText !== '') {
      moviesSearch = movies.filter((movie) => movie.title.includes(searchText)
      || movie.subtitle.includes(searchText)
      || movie.storyline.includes(searchText));
    }

    // busca por marked
    if (bookmarkedOnly) {
      moviesSearch = movies.filter((movie) => movie.bookmarked);
    }

    // busca por genero
    if (selectedGenre !== '') {
      moviesSearch = movies.filter((movie) => movie.genre === selectedGenre);
    }

    return moviesSearch;
  }

  movieAdd(newMovie, movies) {
    // adicionar novo filme ao array de filmes
    this.setState({ movies: [...movies, newMovie] });
  }

  render() {
    const { searchText, bookmarkedOnly, selectedGenre, movies } = this.state;
    return (
      <div>
        <SearchBar
          searchText={ searchText }
          onSearchTextChange={ this.onSearchTextChange }
          onBookmarkedChange={ this.onBookmarkedChange }
          onSelectedGenreChange={ this.onSelectedGenreChange }
          bookmarkedOnly={ bookmarkedOnly }
          selectedGenre={ selectedGenre }
        />
        <MovieList
          movies={ this.search(searchText, bookmarkedOnly, selectedGenre, movies) }
        />

        <AddMovie onClick={ (newMovie) => (this.movieAdd(newMovie, movies)) } />
      </div>
    );
  }
}

MovieLibrary.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default MovieLibrary;

import React from 'react';
import Header from './components/Header';
import './App.css';
// import MovieCard from './components/MovieCard';
import AddMovie from './components/AddMovie';
// import MovieLibrary from './components/MovieLibrary';
import MovieList from './components/MovieList';
import movies from './data';

function App() {
  return (
    <div className="App">
      <Header />
      <AddMovie />
      {/* <MovieCard /> */}
      {/* <MovieLibrary /> */}
      <MovieList movies={ movies } />
    </div>
  );
}

export default App;

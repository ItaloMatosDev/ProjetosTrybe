import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      subtitle: '',
      storyline: '',
      rating: 0,
      imagePath: '',
      genre: 'action',
    };
    // this.onChange = this.onChange.bind(this);
  }

  onChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  inputTitle = (title) => (
    <label htmlFor="title-input" data-testid="title-input-label">
      Título
      <input
        name="title"
        type="text"
        value={ title }
        data-testid="title-input"
        onChange={ this.onChange }
      />
    </label>
  );

  inputSubtitle = (subtitle) => (
    <label htmlFor="subtitle-input" data-testid="subtitle-input-label">
      Subtítulo
      <input
        name="subtitle"
        type="text"
        value={ subtitle }
        data-testid="subtitle-input"
        onChange={ this.onChange }
      />
    </label>
  );

  inputImage = (imagePath) => (
    <label htmlFor="image-path" data-testid="image-input-label">
      Imagem
      <input
        name="imagePath"
        type="text"
        value={ imagePath }
        data-testid="image-input"
        onChange={ this.onChange }
      />
    </label>
  )

  inputStoryline = (storyline) => (
    <label htmlFor="storyline-input" data-testid="storyline-input-label">
      Sinopse
      <textarea
        name="storyline"
        value={ storyline }
        data-testid="storyline-input"
        onChange={ this.onChange }
      />
    </label>
  )

  inputRating = (rating) => (
    <label htmlFor="rating-input" data-testid="rating-input-label">
      Avaliação
      <input
        name="rating"
        type="number"
        value={ rating }
        data-testid="rating-input"
        onChange={ this.onChange }
      />
    </label>
  )

  inputGenre = (genre) => (
    <label htmlFor="genre-input" data-testid="genre-input-label">
      Gênero
      <select
        data-testid="genre-input"
        name="genre"
        id="genre"
        value={ genre }
        onChange={ this.onChange }
      >
        <option value="action" data-testid="genre-option"> Ação </option>
        <option value="comedy" data-testid="genre-option"> Comédia </option>
        <option value="thriller" data-testid="genre-option"> Suspense </option>
      </select>
    </label>
  );

  button = () => (
    <button
      type="button"
      data-testid="send-button"
      onClick={ this.handleClick }
    >
      Adicionar filme
    </button>
  )

  handleClick= () => {
    const { onClick } = this.props;
    onClick(this.state);
    this.setState({
      title: '',
      subtitle: '',
      storyline: '',
      rating: 0,
      imagePath: '',
      genre: 'action',
    });
  }

  render() {
    const { title, subtitle, storyline, rating, imagePath, genre } = this.state;
    return (
      <form data-testid="add-movie-form">
        {this.inputTitle(title)}
        {this.inputSubtitle(subtitle)}
        {this.inputStoryline(storyline)}
        {this.inputRating(rating)}
        {this.inputImage(imagePath)}
        {this.inputGenre(genre)}
        {this.button(this.onClick)}
      </form>
    );
  }
}

AddMovie.propTypes = {
  onClick: PropTypes.func,
}.isRequired;

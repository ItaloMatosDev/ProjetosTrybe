import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ShareBtn from './ShareBtn';
import './css/doneCard.css';

function DoneCard({ filter }) {
  const [showCopiedMsg, setShowCopiedMsg] = useState(false);
  const filtered = () => {
    let finishedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!finishedRecipes) { finishedRecipes = []; }

    const arrayMeals = finishedRecipes.filter(({ type }) => type === 'comida');
    const arrayDrinks = finishedRecipes.filter(({ type }) => type === 'bebida');
    switch (filter) {
    case 'Food':
      return arrayMeals;
    case 'Drinks':
      return arrayDrinks;
    default:
      return finishedRecipes;
    }
  };

  const renderTopText = (type, area, category, alcoholicOrNot) => {
    const textMeal = `${area} - ${category}`;
    const textDrink = `${alcoholicOrNot}`;
    if (type === 'comida') {
      return textMeal;
    }
    return (
      textDrink
    );
  };

  return (
    <section id="doneRecipesContainer">
      {showCopiedMsg && <span id="">Link copiado!</span>}
      {filtered().map((
        { id,
          type,
          image,
          name,
          area,
          category,
          alcoholicOrNot,
        },
        index,
      ) => (
        <section
          key={ index }
          id="doneRecipeCard"
        >
          <hr />
          <Link to={ `${type}s/${id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt="Foto da receita"
            />
            <p data-testid={ `${index}-horizontal-name` }>{name}</p>
          </Link>
          <span
            data-testid={ `${index}-horizontal-top-text` }
          >
            {renderTopText(type, area, category, alcoholicOrNot)}
          </span>

          <ShareBtn
            showCopiedMsg={ setShowCopiedMsg }
            testId={ `${index}-horizontal-share-btn` }
            type={ `${type}s` }
            id={ id }
            route="receitas-feitas"
          />
        </section>
      ))}
    </section>
  );
}

const mapStateToProps = (state) => ({
  all: state.done.allDone,
});

DoneCard.propTypes = {
  filter: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(DoneCard);

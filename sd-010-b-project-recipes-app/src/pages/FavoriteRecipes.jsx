import React, { useEffect, useState } from 'react';
import { FavoriteBtn, Header, ShareBtn } from '../components';
import './css/favoriteRecipes.css';
import './css/doneRecipes.css';

function FavoriteRecipes() {
  const [allFavorites, setAllFavorites] = useState([]);
  const [wasCopied, setWasCopied] = useState(false);
  const [recipesToRender, setRecipesToRender] = useState([]);
  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    setAllFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')));
    setRecipesToRender(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, [shouldUpdate]);

  const filterRecipes = (rcpType) => {
    setRecipesToRender(allFavorites.filter(({ type }) => type === rcpType));
  };

  return (
    <>
      <Header />
      <section id="category-done-buttons">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => { setRecipesToRender(allFavorites); } }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filterRecipes('comida') }
        >
          Comidas
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterRecipes('bebida') }
        >
          Bebidas
        </button>
      </section>

      <section id="favoriteRecipeContainer">
        {wasCopied && <span>Link copiado!</span>}
        {recipesToRender && recipesToRender.map((el, idx) => {
          const { id, type, area, category, alcoholicOrNot, name, image } = el;

          return (
            <section className="favoriteRecipe" key={ idx }>
              <div id="favoriteRecipeImage">
                <img
                  src={ image }
                  alt="Foto da receita"
                  data-testid={ `${idx}-horizontal-image` }
                />
              </div>
              <div id="favoriteRecipeInfo">
                <p data-testid={ `${idx}-horizontal-top-text` }>
                  {`${area} - ${category} ${alcoholicOrNot}`}
                </p>

                <a href={ `/${type}s/${id}` }>
                  <p data-testid={ `${idx}-horizontal-name` }>{name}</p>
                </a>
                <ShareBtn
                  showCopiedMsg={ setWasCopied }
                  type={ `${type}s` }
                  id={ id }
                  route="receitas-favoritas"
                  testId={ `${idx}-horizontal-share-btn` }
                />
                <FavoriteBtn
                  id={ id }
                  type={ type === 'comida' }
                  currentRecipe={ el }
                  setShouldUpdate={ setShouldUpdate }
                  shouldUpdate={ shouldUpdate }
                />
              </div>
            </section>

          );
        })}
        {!recipesToRender && 'Nenhuma receita marcada como favorita ainda :/'}
      </section>
    </>
  );
}

export default FavoriteRecipes;

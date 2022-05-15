import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Categories.css';

class Categories extends Component {
  render() {
    const { categories, handleSelectCategory } = this.props;
    return (
      <div className="category">
        <h3>Categorias:</h3>
        <div>
          {categories.map(({ name, id }) => (
            <div key={ id }>
              <label htmlFor="select-category">
                <input
                  className="input-category"
                  id="select-category"
                  type="radio"
                  onClick={ (e) => handleSelectCategory(e) }
                  data-testid="category"
                  name="category"
                  value={ id }
                />
                { name }
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
  handleSelectCategory: PropTypes.func.isRequired,
};

export default Categories;

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './InputSearch.css';
import { BiSearch } from 'react-icons/bi';

class InputSearch extends Component {
  render() {
    const { handleInputSearch, handleSubmitFetch } = this.props;
    return (
      <div className="input-content">
        <input
          className="input-search"
          data-testid="query-input"
          onChange={ (e) => handleInputSearch(e) }
          type="text"
          placeholder="O que você está buscando?"
        />
        <BiSearch
          className="btn-search"
          data-testid="query-button"
          type="button"
          onClick={ handleSubmitFetch }
        />
      </div>
    );
  }
}

InputSearch.propTypes = {
  handleInputSearch: PropTypes.func.isRequired,
  handleSubmitFetch: PropTypes.func.isRequired,
};

export default InputSearch;

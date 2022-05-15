import React, { Component } from 'react';
import * as api from '../services/api';

import InputSearch from '../components/InputSearch';
import CartComponent from '../components/CartComponent';
import Categories from '../components/Categories';
import ProductCard from '../components/ProductCard';
import './Home.css';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
      products: [],
      value: '',
      reload: true,
    };

    this.getCategories = this.getCategories.bind(this);
    this.handleInputSearch = this.handleInputSearch.bind(this);
    this.handleSubmitFetch = this.handleSubmitFetch.bind(this);
    this.handleSelectCategory = this.handleSelectCategory.bind(this);
    this.handleReload = this.handleReload.bind(this);
  }

  componentDidMount() {
    this.getCategories();
  }

  handleReload() {
    const { reload } = this.state;
    this.setState({ reload });
  }

  handleSubmitFetch() {
    const { value } = this.state;
    return api
      .getProductsFromCategoryAndQuery('', value)
      .then((data) => this.setState({ products: data.results }))
      .catch(() => {
        alert('Erro: Tente novamente.');
      });
  }

  handleInputSearch({ target }) {
    const { value } = target;
    this.setState({ value });
  }

  handleSelectCategory(e) {
    const { value } = e.target;
    return api
      .getProductsFromCategoryAndQuery(value, '')
      .then((data) => this.setState({ products: data.results }));
  }

  handleCard() {
    const { products } = this.state;
    return (
      <div className="card-container">
        {products.map((item) => (
          <ProductCard
            key={ item.id }
            item={ item }
            data-testid="product"
            handleReload={ this.handleReload }
          />
        ))}
      </div>
    );
  }

  async getCategories() {
    const getCategoriesFromApi = await api.getCategories();
    this.setState({ categories: getCategoriesFromApi });
  }

  render() {
    const { products, categories } = this.state;

    return (
      <section className="container">
        <aside className="content-left">
          <Categories
            handleSelectCategory={ this.handleSelectCategory }
            categories={ categories }
          />
        </aside>
        <section className="content-right">
          <section className="header-home">
            <InputSearch
              handleInputSearch={ this.handleInputSearch }
              handleSubmitFetch={ this.handleSubmitFetch }
            />
            <CartComponent />
          </section>
          <section className="content-card">
            <div className="home-initial-message" data-testid="home-initial-message">
              { products.length
                ? this.handleCard()
                : 'Digite algum termo de pesquisa ou escolha uma categoria.'}
            </div>
          </section>
        </section>
      </section>
    );
  }
}

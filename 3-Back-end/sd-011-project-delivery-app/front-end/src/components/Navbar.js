import React from 'react';
import { useNavigate } from 'react-router';

import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-items-container">
        <div
          role="button"
          onKeyPress={ () => navigate('/customer/products') }
          onClick={ () => navigate('/customer/products') }
          tabIndex="0"
          style={ { cursor: 'pointer' } }
          className="navbar-item"
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </div>
        <div
          role="button"
          onKeyPress={ () => navigate('/customer/orders') }
          onClick={ () => navigate('/customer/orders') }
          tabIndex="0"
          style={ { cursor: 'pointer' } }
          className="navbar-item"
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
        </div>
      </div>
      <div
        className="navbar-user-name"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { JSON.parse(localStorage.getItem('user')).name }
      </div>
      <button
        type="button"
        className="navbar-logout"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ () => logout() }
      >
        Sair
      </button>
    </nav>
  );
}

export default Navbar;

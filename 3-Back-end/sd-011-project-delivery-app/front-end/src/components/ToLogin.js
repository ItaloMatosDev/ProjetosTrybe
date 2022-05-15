import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalState';

// import { Container } from './styles';

function ToLogin() {
  const { setUser, setProducts } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [login, setLogin] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);

  function handleChange({ target: { value, name } }) {
    setLogin({
      ...login,
      [name]: value,
    });
  }

  useEffect(() => {
    const { email, password } = login;
    const minPass = 6;
    const emailValid = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (emailValid.test(email) && password.length >= minPass && password.length !== 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [login]);

  async function submitBtn() {
    const { email, password } = login;
    try {
      const userData = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });

      console.log(userData); // verificando o que traz no userData
      setUser(true);
      localStorage.setItem('user', JSON.stringify(userData.data.user));
      const prod = await axios.get('http://localhost:3001/customer/products');
      prod.data.map((item) => {
        item.total = 0;
        item.quantity = 0;
        return item;
      });
      setProducts(prod);
      localStorage.setItem('products', JSON.stringify(prod.data));
      localStorage.setItem('chart', JSON.stringify([]));
      navigate('/customer/products');
    } catch (erro) {
      // const notFoundCode = 404;
      if (erro) {
        setError(true);
      }
    }
  }

  return (
    <main>
      <h2>Login</h2>
      <form>
        <div htmlFor="email">
          <h4>E-mail</h4>
          <input
            id="id-email"
            type="email"
            placeholder="Type your e-mail here"
            name="email"
            onChange={ handleChange }
            data-testid="common_login__input-email"
          />
        </div>
        <div htmlFor="password">
          <h4>Password</h4>
          <input
            id="password"
            type="password"
            placeholder="Type your password here"
            name="password"
            onChange={ handleChange }
            data-testid="common_login__input-password"
          />
        </div>
        <button
          type="button"
          disabled={ disabled }
          onClick={ submitBtn }
          data-testid="common_login__button-login"
        >
          Enter
        </button>
        { error ? (
          <div data-testid="common_login__element-invalid-email">
            Dados inválidos!
          </div>
        ) : null}
      </form>
      <div>
        <button
          type="button"
          onClick={ () => navigate('/register') }
          data-testid="common_login__button-register"
        >
          Register
        </button>
      </div>
    </main>
  );
}

export default ToLogin;

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalState';

// import { Container } from './styles';

function ToRegister() {
  const { setProducts } = useContext(GlobalContext);
  const [register, setRegister] = useState({ name: '', email: '', password: '' });

  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  function handleChange({ target: { value, name } }) {
    setRegister({
      ...register,
      [name]: value,
    });
  }

  useEffect(() => {
    const { email, name, password } = register;
    const minName = 12;
    const emailValid = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const minPass = 6;
    const valid = emailValid.test(email)
      && name.length > minName && password.length >= minPass;
    if (valid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [register]);

  async function submitBtn() {
    const { name, email, password } = register;
    // console.log(name, email, password);
    try {
      await axios.post('http://localhost:3001/register', {
        name,
        email,
        password,
      });
      const response = await axios.get(`http://localhost:3001/user/${email}`);
      console.log('user', response);
      localStorage.setItem('user', JSON.stringify(response.data));
      const prod = await axios.get('http://localhost:3001/customer/products');
      prod.data.map((item) => {
        item.total = 0;
        item.quantity = 0;
        return item;
      });
      // console.log('nav', user, local)
      setProducts(prod);
      localStorage.setItem('products', JSON.stringify(prod.data));
      localStorage.setItem('chart', JSON.stringify([]));
      navigate('/customer/products');
    } catch (erro) {
      console.log(erro);
      console.log(erro.status);
      if (erro) {
        setError(true);
      }
    }
  }

  return (
    <main>
      <h2>Register</h2>
      <form>
        <div>
          <h4>Name</h4>
          <input
            id="name"
            type="text"
            placeholder="Type your name here"
            name="name"
            onChange={ handleChange }
            data-testid="common_register__input-name"
          />
        </div>
        <div>
          <h4>E-mail</h4>
          <input
            id="email"
            type="email"
            placeholder="Type your e-mail here"
            name="email"
            onChange={ handleChange }
            data-testid="common_register__input-email"
          />
        </div>
        <div>
          <h4>Password</h4>
          <input
            id="password"
            type="password"
            placeholder="Type your password here"
            name="password"
            onChange={ handleChange }
            data-testid="common_register__input-password"
          />
        </div>
        <button
          type="button"
          disabled={ disabled }
          onClick={ submitBtn }
          data-testid="common_register__button-register"
        >
          Register
        </button>

        { error ? (
          <div data-testid="common_register__element-invalid_register">
            Usuário já cadastrado!
          </div>
        ) : null}
      </form>
    </main>
  );
}

export default ToRegister;

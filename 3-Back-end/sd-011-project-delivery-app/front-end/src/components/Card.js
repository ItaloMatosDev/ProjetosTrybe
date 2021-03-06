import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import './Card.css';
// import { Container } from './styles';

function Card(props) {
  const { product } = props;
  const { setSelected, setTotal } = useContext(GlobalContext);
  const [value, setValue] = useState(product.quantity);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem('chart'));
    if (arr.length === 0) {
      setTotal(0);
    } else {
      const calcTotal = arr.reduce((acc, e) => acc + (e.price * e.quantity), 0);
      setTotal(calcTotal);
    }
  }, []);

  const addToStore = (arr, valueAcc) => {
    arr.push({ ...product, quantity: valueAcc });
    localStorage.setItem('chart', JSON.stringify(arr));
    return setSelected(arr);
  };

  const removeFromStore = (arr, index) => {
    arr.splice(index, 1);
    localStorage.setItem('chart', JSON.stringify(arr));
    return setSelected(arr);
  };

  const updateStore = (arr, index, valueAcc) => {
    arr[index] = { ...product, quantity: valueAcc };
    localStorage.setItem('chart', JSON.stringify(arr));
    return setSelected(arr);
  };

  const sumTotal = () => {
    const calcTotal = JSON.parse(localStorage.getItem('chart'))
      .reduce((acc, e) => acc + (e.price * e.quantity), 0);
    return setTotal(calcTotal);
  };

  const updateProducts = (valueAcc) => {
    const prod = JSON.parse(localStorage.getItem('products'));
    const index = prod.findIndex((e) => e.name === product.name);
    const numMagic = -1;
    if (index !== numMagic) {
      prod[index].quantity = valueAcc;
      prod[index].total = parseFloat(prod[index].price) * valueAcc;
    }
    return localStorage.setItem('products', JSON.stringify(prod));
  };

  const sendTo = (valueAcc) => {
    console.log('send 1', value, valueAcc);
    const arr = JSON.parse(localStorage.getItem('chart'));
    const index = arr.findIndex((e) => e.name === product.name);
    const numMagic = -1;
    if (index !== numMagic && valueAcc === 0) {
      removeFromStore(arr, index);
      updateProducts(valueAcc);
    } else if (index !== numMagic && valueAcc !== 0) {
      updateStore(arr, index, valueAcc);
      updateProducts(valueAcc);
    } else {
      addToStore(arr, valueAcc);
      updateProducts(valueAcc);
    }
    sumTotal();
  };

  const submitMore = () => {
    console.log('more 1', value);
    const valueMore = value + 1;
    setValue(valueMore);
    console.log('more 2', value);
    return sendTo(valueMore);
  };

  const submitLess = () => {
    console.log('less 1', value);
    const valueLess = value - 1;
    if (valueLess < 0) return setValue(0);
    setValue(valueLess);
    console.log('less 2', value);
    return sendTo(valueLess);
  };

  const handleChange = ({ target }) => {
    // console.log(target);
    setValue(target.value);
    sendTo(target.value);
  };

  const styleTest = {
    backgroundColor: '#036b52',
    padding: '10px',
    borderRadius: '10px',
    position: 'absolute',
    width: '100px',
  };

  const card = () => (
    <div style={ { height: '350px', textAlign: '-webkit-center' } }>
      <div
        style={ { cursor: 'pointer', display: 'block', height: '300px' } }
      >
        <div style={ { width: '250px', height: '250px' } }>
          <h4
            data-testid={ `customer_products__element-card-price-${product.id}` }
            style={ styleTest }
          >
            { `R$ ${product.price.replace('.', ',')}` }
          </h4>
          <img
            data-testid={ `customer_products__img-card-bg-image-${product.id}` }
            src={ product.url_image }
            alt={ `about ${product.name}` }
            className="img-products"
          />
          <div data-testid={ `customer_products__element-card-title-${product.id}` }>
            { product.name }
          </div>
        </div>
        <div
          style={ { display: 'flex', position: 'relative', bottom: '10vh' } }
        >
          <button
            data-testid={ `customer_products__button-card-rm-item-${product.id}` }
            type="button"
            onClick={ () => submitLess() }
          >
            -
          </button>
          <input
            type="number"
            data-testid={ `customer_products__input-card-quantity-${product.id}` }
            style={ { backgroundColor: 'white', padding: '0 10px', width: '30px' } }
            onChange={ (e) => handleChange(e) }
            value={ value }
          />
          <button
            data-testid={ `customer_products__button-card-add-item-${product.id}` }
            type="button"
            onClick={ () => submitMore() }
          >
            +
          </button>
        </div>
      </div>
    </div>
  );

  return card();
}

export default Card;

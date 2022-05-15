function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ id: sku, title: name, thumbnail: image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}

const addLocalStorage = () => {
  const itemsCart = document.querySelector('ol').innerHTML;
  localStorage.setItem('cart', itemsCart);
};

// Ajuda do Jander Liborio
const sumProducts = async () => {
  const cart = document.querySelector('.total-price');
  const itemsCart = document.querySelectorAll('.cart__item');
  let total = 0;
  await itemsCart.forEach((prices) => {
    const value = parseFloat(prices.innerText.split('$')[1]);
    total += value;
    Math.round(total.toFixed(2));
  });
  cart.innerHTML = total;
};

function cartItemClickListener(event) {
  event.target.remove('');
  addLocalStorage();
  sumProducts(); 
}

function createCartItemElement({ id: sku, title: name, price: salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

// referencia: GitHub/ Lotar
// https://github.com/tryber/sd-010-b-project-shopping-cart/pull/101/
// Ajuda do Jander Liborio
const eventButton = () => {
  const productsButton = document.querySelectorAll('.item__add');
  const cartItems = document.querySelector('.cart__items');
  productsButton.forEach((product) => {
    product.addEventListener('click', async () => {
      const id = getSkuFromProductItem(product.parentNode);
      const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
      const responseAPI = await response.json();
      const itemCart = createCartItemElement(responseAPI);
      cartItems.appendChild(itemCart);
      addLocalStorage();
      sumProducts();
    });
  });
};

const getProducts = async () => {
  const loading = document.querySelector('.loading');
  loading.innerText = 'loading';
  const listProducts = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  const listProductsJSON = await listProducts.json();
  const { results } = listProductsJSON;
  const resultados = results.forEach((produto) => {
    loading.innerText = '';
    loading.remove();
    const prod = document.querySelectorAll('.items')[0];
    const criarElemento = createProductItemElement(produto);
    prod.appendChild(criarElemento); 
    // sumProducts();
    // pricesCar();
  });
  return resultados;
};

const emptyCart = () => {
  const buttonEmpty = document.querySelector('.empty-cart');
  buttonEmpty.addEventListener('click', () => {
    const listCart = document.querySelectorAll('.cart__item');
    listCart.forEach((item) => {
      item.remove();
    });
  });
};

window.onload = async function onload() {
  await getProducts();
  eventButton();
  document.querySelector('ol').innerHTML = localStorage.getItem('cart');
  emptyCart();
  sumProducts();
};

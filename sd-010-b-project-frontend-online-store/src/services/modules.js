let arrayCart = [];
let arrReviews = [];

export const handleAmount = (prod, bool) => {
  if (bool) {
    if (prod.qty < prod.available_quantity) {
      arrayCart = arrayCart.map((elem) => (elem.id === prod.id
        ? { ...elem, qty: elem.qty + 1 } : elem));
    }
  } else {
    arrayCart = arrayCart.map((elem) => (elem.id === prod.id
      ? { ...elem, qty: elem.qty - 1 } : elem));
  }
};

export const addProductCart = (item) => {
  const product = arrayCart.find((obj) => obj.id === item.id);
  if (product) {
    handleAmount(product, true);
  } else {
    const itemProduct = { ...item, qty: 1 };
    arrayCart = [...arrayCart, itemProduct];
  }
};

export const handleDelete = (prod) => {
  arrayCart = arrayCart.filter((item) => item.id !== prod.id);
};

export const setReview = (obj) => {
  arrReviews = [...arrReviews, obj];
};

export const getReviews = (id) => {
  const product = arrReviews.filter((item) => item.id === id);
  return product;
};

export const getCartState = () => arrayCart;

export const getLength = () => {
  const reduceArr = arrayCart.reduce((total, item) => {
    total += item.qty;
    return total;
  }, 0);

  return reduceArr;
};

export const handleTotalCart = () => {
  const reduceTotalPrice = arrayCart.reduce((total, item) => {
    total += item.price * item.qty;
    return total;
  }, 0);

  return reduceTotalPrice;
};

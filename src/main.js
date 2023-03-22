import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);
const productList = await fetchProductsList('computador');
const products = document.querySelector('.products');
productList.forEach((product) => {
  const createProduct = createProductElement(product);
  products.appendChild(createProduct);
});

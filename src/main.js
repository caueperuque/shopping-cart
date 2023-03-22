import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const products = document.querySelector('.products');

const paragraph = document.createElement('p');
paragraph.innerHTML = '...carregando';
paragraph.classList.add('loading');
products.appendChild(paragraph);

const productList = await fetchProductsList('computador');
productList.forEach((product) => {
  const createProduct = createProductElement(product);
  products.appendChild(createProduct);
});

paragraph.remove();

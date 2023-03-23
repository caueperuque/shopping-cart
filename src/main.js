import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';

document.querySelector('.cep-button').addEventListener('click', searchCep);

try {
  const products = document.querySelector('.products');

  const paragraph = document.createElement('h2');
  paragraph.innerHTML = '...carregando';
  paragraph.classList.add('loading');
  products.appendChild(paragraph);

  const productList = await fetchProductsList('computador');
  // console.log(productList);
  productList.forEach((product) => {
    const createProduct = createProductElement(product);
    products.appendChild(createProduct);
  });

  paragraph.remove();
  // const addCartBtn = document.querySelector('.product__add');
  // addCartBtn.addEventListener('click', ({ target }) => {
  // });
} catch (err) {
  const errorMsg = document.createElement('h2');
  errorMsg.classList.add('error');
  errorMsg.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  document.querySelector('.loading').remove();
  document.body.append(errorMsg);
}

// console.log(await fetchProduct('MLB1405519561'));

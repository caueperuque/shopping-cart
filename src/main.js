import { searchCep } from './helpers/cepFunctions';
import './style.css';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement, createCartProductElement } from './helpers/shopFunctions';
import { saveCartID } from './helpers/cartFunctions';

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

  const addCartBtn = document.querySelectorAll('.product__add');
  const getProduct = document.querySelectorAll('.product__id');
  const getCart = document.querySelector('.cart__products');
  addCartBtn.forEach((btn, index) => btn.addEventListener('click', async () => {
    const product = getProduct[index].innerHTML;
    saveCartID(product);
    const testao = createCartProductElement(await fetchProduct(product));
    getCart.appendChild(testao);
  }));
} catch (err) {
  const errorMsg = document.createElement('h2');
  errorMsg.classList.add('error');
  errorMsg.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
  document.querySelector('.loading').remove();
  document.body.append(errorMsg);
}

// console.log(await fetchProduct('MLB1405519561'));

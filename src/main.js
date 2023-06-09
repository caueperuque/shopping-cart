import {
  searchCep,
} from './helpers/cepFunctions';
import './style.css';
import {
  fetchProduct,
  fetchProductsList,
} from './helpers/fetchFunctions';
import {
  createProductElement,
  createCartProductElement,
  calculatePrice,
} from './helpers/shopFunctions';
import {
  saveCartID,
  getSavedCartIDs,
} from './helpers/cartFunctions';

// eslint-disable-next-line react-func/max-lines-per-function
async function main() {
  window.onload = () => {
    const savedValue = localStorage.getItem('subtotal');
    if (savedValue) {
      const teste = document.querySelector('.total-price');
      teste.innerHTML = savedValue;
    }
  };

  document.querySelector('.cep-button').addEventListener('click', searchCep);

  try {
    const products = document.querySelector('.products');

    const paragraph = document.createElement('h2');
    paragraph.innerHTML = '...carregando';
    paragraph.classList.add('loading');
    products.appendChild(paragraph);

    const productList = await fetchProductsList('sdd');
    productList.forEach((product) => {
      const createProduct = createProductElement(product);
      products.appendChild(createProduct);
    });

    const searchBtn = document.querySelector('#search-btn');
    const searchInput = document.querySelector('#search');
    const searchProduct = async () => {
      const tes = document.querySelector('.products');
      tes.innerHTML = '';
      const productsName = await fetchProductsList(searchInput.value);
      productsName.forEach((product) => {
        const createProduct = createProductElement(product);
        products.appendChild(createProduct);
      });
      const addCartBtn = document.querySelectorAll('.product__add');
      const getProduct = document.querySelectorAll('.product__id');
      // eslint-disable-next-line sonarjs/no-duplicate-string
      const getCart = document.querySelector('.cart__products');
      addCartBtn.forEach((btn, index) => btn.addEventListener('click', async () => {
        const product = getProduct[index].innerHTML;
        saveCartID(product);
        const addInCart = createCartProductElement(await fetchProduct(product));
        getCart.appendChild(addInCart);
        calculatePrice();
      }));
    };

    searchBtn.addEventListener('click', searchProduct);

    paragraph.remove();
  } catch (err) {
    const errorMsg = document.createElement('h2');
    errorMsg.classList.add('error');
    errorMsg.innerHTML = 'Algum erro ocorreu, recarregue a página e tente novamente';
    document.querySelector('.loading').remove();
    document.body.append(errorMsg);
  }

  const productsGetStorage = async () => {
    const idList = getSavedCartIDs();
    const promisseList = idList.map((id) => fetchProduct(id));
    const getProduct = await Promise.all(promisseList);
    const getCart = document.querySelector('.cart__products');
    getProduct.forEach((id) => getCart
      .appendChild(createCartProductElement(id)));
  };

  await productsGetStorage();

  const addProductInCart = async () => {
    const addCartBtn = document.querySelectorAll('.product__add');
    const getProduct = document.querySelectorAll('.product__id');
    const getCart = document.querySelector('.cart__products');
    // eslint-disable-next-line sonarjs/no-identical-functions
    addCartBtn.forEach((btn, index) => btn.addEventListener('click', async () => {
      const product = getProduct[index].innerHTML;
      saveCartID(product);
      const addInCart = createCartProductElement(await fetchProduct(product));
      getCart.appendChild(addInCart);
      calculatePrice();
    }));
  };
  addProductInCart();
}

main();

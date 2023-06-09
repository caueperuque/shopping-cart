export const fetchProduct = async (idProduct) => {
  const URL_API = `https://api.mercadolibre.com/items/${idProduct}`;
  if (!idProduct) {
    return Promise.reject(new Error('ID não informado'));
  }
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
};

export const fetchProductsList = async (search) => {
  const URL_API = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
  if (!search) {
    return Promise.reject(new Error('Termo de busca não informado'));
  }
  const response = await fetch(URL_API);
  const data = await response.json();
  return data.results;
};

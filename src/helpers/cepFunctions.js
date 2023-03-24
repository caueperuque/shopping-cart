export const getAddress = async (CEP) => {
  const AWESOME_API = fetch(`https://cep.awesomeapi.com.br/json/${CEP}`);
  const BRASIL_API = fetch(`https://brasilapi.com.br/api/cep/v2/${CEP}`);
  const promises = [AWESOME_API, BRASIL_API];
  const firstResponse = await Promise.any(promises);
  const data = await firstResponse.json();
  return data;
};

export const searchCep = async () => {
  const CEP = document.querySelector('.cep-input').value;
  const printAddress = document.querySelector('.cart__address');
  try {
    const { address, district, city, state } = await getAddress(CEP);
    printAddress.innerHTML = `${address} - ${district} - ${city} - ${state}`;
    if (printAddress.innerHTML.includes('undefined')) {
      throw new Error('CEP não encontrado');
    }
  } catch (err) {
    printAddress.innerHTML = 'CEP não encontrado';
  }
};

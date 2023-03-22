import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes  aqui
describe('Teste a função fetchProduct', () => {
  it('Verifica se fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function');
  });
  it('Verifica se fetchProduct com argumento "MLB1405519561" chama fetch', async () => {
    await fetchProduct("MLB1405519561");
    expect(fetch).toHaveBeenCalled();
  });
  it('Verifica se o retorno da função fetchProduct com o argumento do produto "MLB1405519561" é uma estrutura de dados igual ao objeto produto ', async () => {
    await expect(fetchProduct("MLB1405519561")).toEqual(product);
  });
  it('Verifica se ao chamar a função fetchProduct sem argumento, retorna um erro com a mensagem: "ID não informado"', async () => {
    await expect(fetchProduct()).rejects.toThrowError('ID não informado');
  });
});

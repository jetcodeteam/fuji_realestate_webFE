import { publicRequest } from './HttpServices';

const prefixProductURL = '/products'
/*
| Get products
| ------------------------------------------------------
| GET /products?offset={offset}&limit={limit}&sort={sort}&order={ASC || DESC}
*/
export const getProducts = (offset, limit, sort, order) => publicRequest(`${prefixProductURL}?offset=${offset}&limit=${limit}&sort=${sort}&order=${order}`, {
  method: 'GET',
});
/*
| Get product's detail
| ------------------------------------------------------
| GET /products/{id}
*/
export const getProductDetails = (id) => publicRequest(`${prefixProductURL}/${id}`, {
  method: 'GET',
});

import { publicRequest, privateRequest } from './HttpServices';

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
/*
| Delete Product
*/
export const deleteProduct = (id) => privateRequest(`${prefixProductURL}/${id}`, {
  method: 'DELETE',
});
/*
| Create product
*/
export const createProduct = (data) => privateRequest(`${prefixProductURL}/`, {
  method: 'POST',
  data: data,
});
/*
| Create product
*/
export const updateProduct = (id, data) => privateRequest(`${prefixProductURL}/${id}`, {
  method: 'PUT',
  data: data,
});
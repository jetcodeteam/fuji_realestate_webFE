import { publicRequest, privateRequest } from './HttpServices';

const prefixProductURL = '/articles'
/*
| Get products
| ------------------------------------------------------
| GET /products?offset={offset}&limit={limit}&sort={sort}&order={ASC || DESC}
*/
export const getNews = (data) => privateRequest(`${prefixProductURL}`, {
  method: 'GET',
  params: data,
});
/*
| Get product's detail
| ------------------------------------------------------
| GET /products/{id}
*/
export const getNewsDetails = (id) => publicRequest(`${prefixProductURL}/${id}`, {
  method: 'GET',
});
/*
| Delete Product
*/
export const deleteNews = (id) => privateRequest(`${prefixProductURL}/${id}`, {
  method: 'DELETE',
});
/*
| Create product
*/
export const createNews = (data) => privateRequest(`${prefixProductURL}/`, {
  method: 'POST',
  data: data,
});
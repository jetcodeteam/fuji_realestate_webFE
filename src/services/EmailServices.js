import { privateRequest, publicRequest } from './HttpServices';

const emailPrefixURL = 'requests';
/*
| Get requests
| ------------------------------------------------------
| GET /requests
*/
export const getAllRequests = params => privateRequest(emailPrefixURL, {
  method: 'GET',
  params,
});

/*
| Create requests
| ------------------------------------------------------
| POST /requests
*/
export const createRequest = data => publicRequest(emailPrefixURL, {
  method: 'POST',
  data,
});
/*
| Get an existing customer request
| ---------------------------------------------------------
*/
export const getRequest = id => privateRequest(`${emailPrefixURL}/${id}`, {
  method: 'GET',
});
/*
| Update customer request
| ---------------------------------------------------------
*/
export const updateRequest = (id, data) => privateRequest(`${emailPrefixURL}/${id}`, {
  method: 'PUT',
  data,
});
/*
| Get an existing customer request
| ---------------------------------------------------------
*/
export const deleteRequest = id => privateRequest(`${emailPrefixURL}/${id}`, {
  method: 'DELETE',
});

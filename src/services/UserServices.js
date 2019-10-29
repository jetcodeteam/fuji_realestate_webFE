import { publicRequest, privateRequest } from './HttpServices';

const authPrefixURL = 'users';
/*
| Authentication and get accesstoken of auth user
| ------------------------------------------------------
| GET /users/login
*/
export const userLogin = data => publicRequest(`${authPrefixURL}/login`, {
  method: 'POST',
  data,
});

/*
| Send an email reset password
| ------------------------------------------------------
| POST /users/forgotpassword
*/
export const userForgotPassword = data => privateRequest(`${authPrefixURL}/forgotpassword`, {
  method: 'POST',
  data,
});
/*
| Verify reset password
| ---------------------------------------------------------
*/
export const userVerifyPassword = () => privateRequest(`${authPrefixURL}/verify`, {
  method: 'GET',
});

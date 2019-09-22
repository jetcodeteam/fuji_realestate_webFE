import { publicRequest, privateRequest } from './HttpService';
import config from '../configs/environments';

const authPrefixURL = `/api/oportal/${config.apiVersion}`;
const userPrefixURL = `/api/sales-crm/${config.apiVersion}`;
const authAzurePrefixUrl = `/api/azure/${config.apiVersion}`;
/*
| Authentication and get accesstoken of auth user
| ------------------------------------------------------
| GET /users/login
*/
export const userLogin = data => publicRequest(`${authPrefixURL}/users/login`, {
  method: 'POST',
  data,
});

/*
| Getting information currently log in user
| ------------------------------------------------------
| GET /users/me
*/
export const getUserInformation = () => privateRequest(`${authPrefixURL}/users/me`, {
  method: 'GET',
});
/*
| Getting information by unique ID's user
| ---------------------------------------------------------
| GET /users/{id}
| ---------------------------------------------------------
| @param int id
*/
export const getUserById = id => privateRequest(`${userPrefixURL}/system-users/${id}`, {
  method: 'GET',
});

/*
| Listing all staffs by currently logged in user incl. :
| 1. Id
| 2. bunitOwnerId
| ------------------------------------------------------
| GET /staffs/me
*/
export const getStaffsByMe = () => privateRequest(`${authPrefixURL}/staffs/me`, {
  method: 'GET',
});

/*
| Listing all staffs for search
| GET /staffs
*/
export const getStaffs = () => privateRequest(`${authPrefixURL}/staffs`, {
  method: 'GET',
});

/*
| Listing all teams by specify ID's staff
| GET /staffs/{id}/teams
*/
export const getTeamsByStaffId = staffId => privateRequest(`${authPrefixURL}/staffs/${staffId}/teams`, {
  method: 'GET',
});


/*
| Authentication and get accesstoken of auth user
| ------------------------------------------------------
*/
export const userLoginAzure = data => publicRequest(`${authAzurePrefixUrl}/users/login`, {
  method: 'POST',
  data,
});

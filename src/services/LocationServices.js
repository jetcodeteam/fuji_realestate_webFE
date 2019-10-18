import { publicRequest, privateRequest } from './HttpServices';

const prefixDistrictURL = '/districts';
const prefixWardURL = '/wards';


export const getDistricts = () => publicRequest(`${prefixDistrictURL}?offset=0&limit=0&sort=name&order=asc`, {
  method: 'GET',
});


export const getWards = (id) => publicRequest(`${prefixWardURL}/${id}`, {
  method: 'GET',
});
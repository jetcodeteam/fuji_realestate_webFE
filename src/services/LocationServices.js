import { publicRequest } from './HttpServices';

const prefixDistrictURL = '/districts';

export const getDistricts = () => publicRequest(`${prefixDistrictURL}?offset=0&limit=0&sort=name&order=asc`, {
  method: 'GET',
});

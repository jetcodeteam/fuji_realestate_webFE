import axios from 'axios';
import _ from 'lodash';
import i18n from 'i18next';

import config from '../configs/environments';
import { requestTimeout } from '../configs/constants';
import { isEmpty } from '../utils/index';
import {
  getAccessToken,
} from './TokenServices';

export const privateRequest = (url, info) => {
  const request = axios.create({
    baseURL: `${config.host}${url}`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'accept-language': i18n.language,
    },
  });
  const token = getAccessToken() || '';
  if (!isEmpty(token)) {
    request.defaults.headers.Authorization = `Bearer ${token}`;
    request.defaults.timeout = requestTimeout;
    return request(info)
      .catch((err) => {
        throw (err);
      });
  }
  return null;
};

export const publicRequest = (url, info) => {
  const data = _.extend(info.data || {}, { lang: i18n.language });
  info = {
    ...info,
    data,
  };
  const request = axios.create({
    baseURL: `${config.host}${url}`,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'accept-language': i18n.language,
    },
  });
  request.defaults.timeout = requestTimeout;
  return request(info)
    .catch((err) => {
      throw (err);
    });
};

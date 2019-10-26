/* store global constants */
import EmailsSvg from '../components/svg/EmailsSvg';
import ProductsSvg from '../components/svg/ProductsSvg';
import NewsSvg from '../components/svg/NewsSvg';

export const DATE_FORMATTER_STRING = 'DD-MM-YYYY';
export const DATETIME_FORMATTER_STRING = 'DD-MM-YYYY HH:mm:ss';
export const requestTimeout = 20000;
export const pagination = {
  limit: 10,
  options: [10, 20, 30, 40, 50],
};
// Menu data for sidebar
export const MENU_DATA = [
  {
    key: 'emails',
    name: 'emails_nav',
    icon: EmailsSvg,
    link: '/admin/emails',
    release: true,
  },
  {
    key: 'news',
    name: 'news_nav',
    icon: NewsSvg,
    link: '/admin/news',
    release: true,
  },
  {
    key: 'products',
    name: 'products_nav',
    icon: ProductsSvg,
    link: '/admin/products',
    release: true,
  },
];

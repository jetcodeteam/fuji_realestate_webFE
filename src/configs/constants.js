/* store global constants */
import EmailsSvg from '../components/EmailsSvg';
import ProductsSvg from '../components/ProductsSvg';
import NewsSvg from '../components/NewsSvg';

export const DATE_FORMATTER_STRING = 'DD-MM-YYYY';
export const DATETIME_FORMATTER_STRING = 'DD-MM-YYYY HH:mm:ss';
export const requestTimeout = 20000;
// Menu data for sidebar
export const MENU_DATA = [
  {
    key: 'emails',
    name: 'emails_nav',
    icon: EmailsSvg,
    link: '/emails',
    release: true,
  },
  {
    key: 'news',
    name: 'news_nav',
    icon: NewsSvg,
    link: '/news',
    release: false,
  },
  {
    key: 'products',
    name: 'products_nav',
    icon: ProductsSvg,
    link: '/products',
    release: false,
  },
];

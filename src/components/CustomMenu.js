// Menu component: https://ant.design/components/menu/
import React from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  Icon,
} from 'antd';
// React router
import { Link } from 'react-router-dom';
// Translation
import { withI18n } from 'react-i18next';


// Generate menu for sidebar
const CustomMenu = (props) => {
  const {
    t, menuData, isTranslate, roles, i18nOptions,
    ...rest
  } = props;

  const getMenus = menuArray => menuArray.map((item) => {
    if (item.release
      && (!item.allowFunc || (item.allowFunc && roles && (roles.bitwise && item.allowFunc) > 0))) {
      if (item.child) {
        return (
          // For submenu item
          <Menu.SubMenu
            key={item.link}
            title={(
              <span>
                {
                  item.icon
                    ? <Icon component={item.icon} />
                    : null
                }
                <span>
                  {
                    isTranslate
                      ? t(item.name)
                      : item.name
                  }
                </span>
              </span>
            )}
          >
            {getMenus(item.child)}
          </Menu.SubMenu>
        );
      }
      return (
        // For normal menu item
        <Menu.Item key={item.link}>
          <span>
            {
              item.icon
                ? <Icon component={item.icon} />
                : null
            }
            <span>
              {
                isTranslate
                  ? t(item.name)
                  : item.name
              }
            </span>
          </span>
          {
            item.link
              ? <Link to={item.link} />
              : null
          }
        </Menu.Item>
      );
    }
    return null;
  });
  return (
    <Menu {...rest}>
      {getMenus(menuData)}
    </Menu>
  );
};

CustomMenu.propTypes = {
  menuData: PropTypes.arrayOf(PropTypes.object).isRequired,
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  isTranslate: PropTypes.bool,
  roles: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  i18nOptions: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

CustomMenu.defaultProps = {
  roles: null,
  isTranslate: false,
};

export default withI18n()(CustomMenu);

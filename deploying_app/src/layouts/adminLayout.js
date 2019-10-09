import React from 'react';
import { withRouter } from 'react-router';
import { withI18n } from 'react-i18next';
import PropTypes from 'prop-types';
import {
  Layout,
  Icon,
  Button,
} from 'antd';
import { MENU_DATA } from '../configs/constants';
import MenuHolder from '../components/MenuHolder';
import CustomMenu from '../components/CustomMenu';
import { setAccessToken } from '../services/TokenServices';

import FujiwaraLogoSvg from '../components/LogoSvg';

const {
  Sider, Content,
} = Layout;

const AdminLayout = (props) => {
  const {
    history,
    children,
    t,
  } = props;

  const logOut = () => {
    setAccessToken(null);
    history.push('/admin');
  };

  return (
    <Layout style={{ height: '100vh', maxWidth: '100%' }}>
      <Sider
        theme="light"
        style={{ height: '100%', overflowY: 'auto', boxShadow: '0 0 20px rgba(201, 200, 207, 0.8)' }}
      >
        <MenuHolder>
          <Icon component={FujiwaraLogoSvg} />
        </MenuHolder>
        <CustomMenu
          menuData={MENU_DATA}
          theme="light"
          mode="inline"
          selectedKeys={[history.location.pathname]}
          isTranslate
          style={{
            paddingTop: '12px',
            paddingRight: '1px',
            border: 'none',
          }}
        />
        <Button
          className="logout-button"
          type="link"
          icon="logout"
          style={{
            color: '#241f21',
            position: 'absolute',
            bottom: '15px',
            left: '24px',
          }}
          onClick={logOut}
        >
          {t('log_out')}
        </Button>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '10px 5px',
            padding: '111px 24px 24px 24px',
            minHeight: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withRouter(withI18n()(AdminLayout));

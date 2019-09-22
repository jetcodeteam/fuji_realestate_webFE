import React, { useState, useEffect } from 'react';
import { withI18n } from 'react-i18next';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import {
  Layout,
  Icon,
  Popover,
  Button,
} from 'antd';
// Service
import {
  getUserRole,
  setAccessToken,
  setUserRole,
  getUserInformation,
  setRefreshToken,
} from '../services/TokenService';
import MenuHolder from '../styled/menuHolder';
import Container from '../styled/container';
// Data for menu
import { menuData, responsiveWidth } from '../../configs/constants';
// Sidebar Menu component
import CustomMenu from '../customMenu';
import UniversalSearch from './universalSearch';
import '../../public/css/masterLayout.css';
import logo from '../../public/images/logoACB.png';
import miniLogo from '../../public/images/minilogo.png';

const { Header, Sider, Content } = Layout;

const miniLogoACB = () => (
  <img
    src={miniLogo}
    alt="mini"
    style={{ width: '50%', margin: 'auto', display: 'block' }}
  />
);
const logoACB = () => (
  <img
    src={logo}
    alt="Logo"
    style={{ width: '50%', margin: 'auto', display: 'block' }}
  />
);
const directionIcon = () => <Icon type="left" />;

const MasterLayout = (props) => {
  const {
    children,
    t,
    history,
  } = props;

  // Control open and close sidebar menu
  const [isCollasped, setCollasped] = useState(false);
  // User Roles info
  const [uroles, setUrole] = useState(null);

  // Language Status
  // const [lgn, setLgn] = useState('en');

  // User information
  const [userInfo, setUserInfo] = useState({});

  // Try another idea, comment old idea
  // const changeLanguage = () => {
  //   if (lgn === 'vi') {
  //     setLgn('en');
  //     i18n.changeLanguage('vi');
  //   }
  //   if (lgn === 'en') {
  //     setLgn('vi');
  //     i18n.changeLanguage('en');
  //   }
  // };

  // Mock user's data
  const userTitle = (
    <div className="user-information-holder">
      <strong>{userInfo.fullName}</strong>
      <p>
        <strong>{`${t('fullname')}: `}</strong>
        {`${userInfo.firstName} ${userInfo.lastName}`}
        <br />
        <strong>{`${t('email')}: `}</strong>
        {userInfo.email}
      </p>
    </div>
  );

  const logOut = () => {
    setAccessToken(null);
    setRefreshToken(null);
    setUserRole(null);
    localStorage.clear();
    history.push('/');
  };

  const logOutContent = (
    <Button
      className="logout-button"
      type="link"
      icon="logout"
      onClick={logOut}
    >
      Log out
    </Button>
  );

  // Get current window size
  const getWindowDimensions = () => {
    const { innerWidth: width } = window;
    if (width <= responsiveWidth) {
      setCollasped(true);
    }
  };

  // set default Languages
  useEffect(() => {
    i18n.changeLanguage('vi');
  }, []);

  // Get current user's roles
  useEffect(() => {
    try {
      setUserInfo(getUserInformation());
      setUrole(getUserRole());
    } catch (err) {
      setUserInfo({});
      setUrole({});
    }
  }, []);

  // Listen for window resize
  useEffect(() => {
    const handleResize = () => {
      getWindowDimensions();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container fluid flex fullheight>
      <Layout style={{ height: '100%', maxWidth: '100%' }}>
        {/* Sider */}
        <Sider
          theme="light"
          style={{ height: '100%', overflowY: 'auto', boxShadow: '0 0 20px rgba(201, 200, 207, 0.8)' }}
          trigger={null}
          collapsible
          collapsed={isCollasped}
        >
          <MenuHolder colasped={isCollasped}>
            {/* Open and close icon */}
            <Icon
              className="siderTrigger"
              onClick={() => setCollasped(!isCollasped)}
              style={{
                fontSize: '15px',
              }}
              component={isCollasped ? miniLogoACB : directionIcon}
            />
            {!isCollasped && <Icon component={logoACB} />}

          </MenuHolder>
          {/*  Sidebar Menu */}
          <CustomMenu
            menuData={menuData}
            roles={uroles}
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
        </Sider>
        <Layout style={{ backgroundColor: '#fdfcff' }}>

          {/* Header */}
          <Header
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundImage: 'linear-gradient(to right, #1890ff 0%, #91d5ff 100%, #bae7ff 100%, #2dd3aa 100%)',
              position: 'relative',
              paddingLeft: '25px',
              // backgroundImage: 'linear-gradient(to right, #1890ff, #91d5ff, #bae7ff)',
            }}
          >
            <UniversalSearch />
            {/* User's avatar - Translate button */}
            <div style={{
              width: 100,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}
            >
              <Popover placement="bottomRight" title={userTitle} content={logOutContent} trigger="click">
                <Button
                  type="danger"
                  shape="circle"
                  icon="user"
                />
              </Popover>
              {/* <Button onClick={() => changeLanguage()} style={{ width: 50 }}>
                {lgn.toUpperCase()}
              </Button> */}
            </div>
          </Header>

          {/* Content */}
          <Content
            style={{
              margin: '10px 5px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Container>
  );
};

MasterLayout.propTypes = {
  children: PropTypes.node.isRequired,
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  history: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withRouter(withI18n()(MasterLayout));

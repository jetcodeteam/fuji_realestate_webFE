import React,
{
  useRef,
  createRef,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TranslateButton from '../components/TranslateButton';
import PageHeader from '../components/PageHeader';
import PageFooter from '../components/PageFooter';

import { Layout } from 'antd';

const { Header, Footer, Content } = Layout;

const styles = {
  root: {
    background: 'white',
    color: 'black',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    zIndex: -1,
    padding: '0',
  },
  grid: {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: 0,
  },
  gridChild: {
    height: '100vh',
    transition: 'background-color 1s',
  },
  childrenContainer: {
    zIndex: 1,
    height: '100vh',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  translateButton: {
    zIndex: 10,
    position: 'absolute',
    top: 3,
    right: '3%',
  },
};

const MasterLayout = (props) => {
  const { children, classes } = props;

  return (
    <Layout>
      <Header style={{backgroundColor: 'unset'}}><PageHeader /></Header>
      <Content>{children}</Content>
      <Footer><PageFooter /></Footer>
    </Layout>
  );
};

MasterLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  classes: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withStyles(styles)(MasterLayout);

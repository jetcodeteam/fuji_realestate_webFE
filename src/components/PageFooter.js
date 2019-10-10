import React from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {Icon} from 'antd';

import { makeStyles } from '@material-ui/core/styles';

const PageFooter = (props) => {
  const { t } = props;
  const useStyles = makeStyles({
    pageFooter: {
      backgroundColor: 'rgb(186,231,255)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      height: '175px',
    },
    title: {
      fontWeight: 700,
      fontSize: '2em',
    },
    icon: {
      width: '75px',
      textAlign: 'center',
      color: '#585858'
    },
    link: {
      width: '120px',
      textAlign: 'center',
    },
    innerLink: {
      textDecoration: 'none',
      color: '#000'
    }
  });
  const classes = useStyles();

  return (
    <footer>
      <div className={classes.pageFooter}>
        <h1 className={classes.title}>FUJIWARA</h1>
        <div style={{ display: 'flex' }}>
          <div className={classes.icon}>
            <Icon type="facebook" style={{ fontSize: '25px' }} />
          </div>
          <div className={classes.icon}>
            <Icon type="twitter" style={{ fontSize: '25px' }} />
          </div>
          <div className={classes.icon}>
            <Icon type="linkedin" style={{ fontSize: '25px' }} />
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          <div className={classes.link}>
            <Link to="/news" className={classes.innerLink}>
              {t('news')}
            </Link>
          </div>
          <div style={{ color: '#787474' }}>
            |
          </div>
          <div className={classes.link}>
            <Link to="/product" className={classes.innerLink}>
              {t('product')}
            </Link>
          </div>
          <div style={{ color: '#787474' }}>
            |
          </div>
          <div className={classes.link}>
            <Link to="/contact" className={classes.innerLink}>
              {t('contact_us')}
            </Link>
          </div>
        </div>
        <div style={{ fontSize: '1em', color: '#949393' }}>Copyright © 2019 Fujiwara.</div>
      </div>
    </footer>
  );
};

PageFooter.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withNamespaces()(PageFooter);

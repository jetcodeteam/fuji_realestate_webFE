import React from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import facebookLogo from '../static/images/icon/facebook-logo.png';
import twitterLogo from '../static/images/icon/twitter-logo.png';
import linkedinLogo from '../static/images/icon/linkedin-logo.png';

const PageFooter = (props) => {
  const { t } = props;
  const useStyles = makeStyles({
    pageFooter: {
      backgroundColor: 'rgb(186,231,255)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      position: 'absolute',
      top: '230%',
      left: 0,
      right: 0,
      width: '100%',
      height: '20%',
    },
    companyLogo: {
      fontSize: 25,
      fontWeight: 700,
      flexGrow: 1,
    },
    logoWrapper: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      flexGrow: 1,
    },
    innerLogoWrapper: {
      display: 'flex',
      width: '15%',
      justifyContent: 'center',
    },
    logoSize: {
      width: '25px',
      height: '25px',
    },
    serviceWrapper: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      flexGrow: 1,
    },
    innerServiceWrapper: {
      display: 'flex',
      justifyContent: 'center',
      width: '25%',
    },
    serviceContent: {
      height: '53%',
      textAlign: 'center',
      flexGrow: 1,
    },
    copyright: {
      color: 'rbg(120, 116, 116)',
      fontSize: '14px',
      fontWeight: 'bold',
    },
  });
  const classes = useStyles();

  return (
    <footer>
      <div className={classes.pageFooter}>
        <h2 className={classes.companyLogo}>FUJIWARA</h2>
        <div className={classes.logoWrapper}>
          <div className={classes.innerLogoWrapper}>
            <div className={classes.logoSize} style={{ flexGrow: 1 }}>
              <img
                src={facebookLogo}
                alt="facebook-logo"
              />
            </div>
            <div className={classes.logoSize} style={{ flexGrow: 1 }}>
              <img
                src={twitterLogo}
                alt="twitter-logo"
              />
            </div>
            <div className={classes.logoSize}>
              <img
                src={linkedinLogo}
                alt="linkedin-logo"
              />
            </div>
          </div>
        </div>
        <div className={classes.serviceWrapper}>
          <div className={classes.innerServiceWrapper}>
            <div className={classes.serviceContent} style={{ borderRight: '2px solid gray' }}>
              {t('news')}
            </div>
            <div className={classes.serviceContent} style={{ borderRight: '2px solid gray' }}>
              {t('product')}
            </div>
            <div className={classes.serviceContent}>
              {t('contact_us')}
            </div>
          </div>
        </div>
        <div className={classes.copyright}>Copyright © 2019 Fujiwara.</div>
      </div>
    </footer>
  );
};

PageFooter.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withNamespaces()(PageFooter);

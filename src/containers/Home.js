import React from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import homeIcon from '../static/images/icon/home-icon.png';
import rentIcon from '../static/images/icon/rent-icon.png';
import visaIcon from '../static/images/icon/visa-icon.png';
import avatar1 from '../static/images/avatar/avatar-1.jpeg';
import avatar2 from '../static/images/avatar/avatar-2.jpg';

const HomePage = (props) => {
  const useStyles = makeStyles({
    bigAvatar: {
      marginBottom: '10px',
      width: 90,
      height: 90,
      alignSelf: 'center',
    },
    carouselImg: {
      position: 'absolute',
      zIndex: 1,
      width: '52%',
      height: '70%',
      right: '0%',
    },
    behindCarousel: {
      position: 'absolute',
      top: '0%',
      right: '3%',
      width: '25%',
      height: '98%',
      backgroundColor: 'rgb(105, 192, 255)',
      zIndex: -1,
    },
    carouselText: {
      position: 'absolute',
      top: '27%',
      left: '10%',
    },
    carouselHeader: {
      width: '20%',
      fontSize: '40px',
      lineHeight: '54px',
      marginBottom: '20px',
    },
    carouselContent: {
      width: '40%',
      fontSize: '18px',
      opacity: '0.5',
    },
    about: {
      display: 'flex',
      position: 'absolute',
      flexDirection: 'column',
      width: '100%',
      height: '40%',
      top: '170%',
      alignItems: 'center',
    },
    aboutHeader: {
      flexGrow: 1,
      fontWeight: '700',
    },
    aboutContent: {
      flexGrow: 1,
      width: '60%',
      textAlign: 'center',
      fontWeight: '700',
      marginBottom: '100px',
    },
    mainServices: {
      position: 'absolute',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '60%',
      top: '100%',
    },
    serviceContent: {
      display: 'flex',
      width: '100%',
    },
  });
  const { t } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.behindCarousel}>.</div>
      <img
        src="https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2018/01/mitchell-gold-bob-williams-e1515009249915.jpg"
        alt="new"
        className={classes.carouselImg}
      />
      <div className={classes.carouselText}>
        <div className={classes.carouselHeader}>
          何か
          {'\n'}
          しています。
        </div>
        <div className={classes.carouselContent}>
          未稿dolor座amet,consectetur adipiscing elit.
          Amet scelerisque imperdiet座suspendisse faucibus auctor. Nibhマッサ,イプサム...
        </div>
      </div>
      {/* ---------------- MAIN SERVICES ----------------- */}
      <div className={classes.mainServices}>
        <h2 style={{ flexGrow: 0.5 }}>{t('main_service')}</h2>
        <div className={classes.serviceContent}>
          <div
            style={{
              paddingLeft: '13%',
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
            }}
          >
            <img
              style={{
                width: '50px',
                height: '50px',
                marginBottom: '20px',
              }}
              src={homeIcon}
              alt="Home"
            />
            <h3>{t('home_sales')}</h3>
            <p style={{ width: '80%', fontSize: '14px', opacity: 0.5 }}>{t('home_sales_des')}</p>
            <h4>{t('details')}</h4>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              marginRight: '10%',
              marginLeft: '10%',
            }}
          >
            <img
              style={{
                width: '50px',
                height: '50px',
                marginBottom: '20px',
              }}
              src={visaIcon}
              alt="Visa"
            />
            <h3>{t('visa_consulting')}</h3>
            <p style={{ width: '80%', fontSize: '14px', opacity: 0.5 }}>{t('home_sales_des')}</p>
            <h4>{t('details')}</h4>
          </div>
          <div
            style={{
              paddingRight: '10%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <img
              style={{
                width: '50px',
                height: '50px',
                marginBottom: '20px',
              }}
              src={rentIcon}
              alt="Rent"
            />
            <h3>{t('employment_consultation')}</h3>
            <p style={{ width: '80%', fontSize: '14px', opacity: 0.5 }}>{t('home_sales_des')}</p>
            <h4>{t('details')}</h4>
          </div>
        </div>
      </div>
      {/* --------------- ABOUT ------------------- */}
      <div className={classes.about}>
        <h2 className={classes.aboutHeader}>{t('about')}</h2>
        <div className={classes.aboutContent}>
          未稿dolor座amet,consectetur adipiscing elit.
          Risus egestas nisl id donec nibh porttitor duis habitant mattis.
          座レオアットblandit nibh est sagittis,et et. Ut tortor,nulla placerat
          volutpat非habitasse proin turpis. Mattis scelerisqueナム
          laoreet habitasse urna職務経歴書lorem nibh.
        </div>
        <div style={{ width: '50%' }}>
          <Grid container justify="center" alignItems="center">
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexGrow: 1,
              }}
            >
              <Avatar alt="Remy Sharp" src={avatar1} className={classes.bigAvatar} />
              <div style={{ fontWeight: 700, textAlign: 'center' }}>幹事</div>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexGrow: 1,
              }}
            >
              <Avatar alt="Remy Sharp" src={avatar2} className={classes.bigAvatar} />
              <div style={{ fontWeight: 700, textAlign: 'center' }}>執行役員</div>
            </div>
          </Grid>
        </div>
      </div>
    </React.Fragment>
  );
};

HomePage.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(HomePage);

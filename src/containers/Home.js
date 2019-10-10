import React from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import AwesomeSlider from 'react-awesome-slider';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import homeIcon from '../static/images/icon/home-icon.png';
import rentIcon from '../static/images/icon/rent-icon.png';
import visaIcon from '../static/images/icon/visa-icon.png';
import otherIcon from '../static/images/icon/other-icon.png';
import avatar1 from '../static/images/avatar/avatar-1.jpeg';
import avatar2 from '../static/images/avatar/avatar-2.jpg';
import carouselImg from '../static/images/product/product.png';
import 'react-awesome-slider/dist/styles.css';

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
      top: 0,
      right: 0,
      width: '50%',
      height: 450,
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
      display: 'flex',
      flexDirection: 'column',
    },
    carouselHeader: {
      fontSize: '40px',
      backgroundColor: 'white',
      width: '40%',
      textAlign: 'left',
    },
    carouselContent: {
      fontSize: '18px',
      opacity: 0.5,
      height: '20%',
      lineHeight: 'normal',
      zIndex: 3,
      textAlign: 'left',
      width: '50%',
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
      alignSelf: 'center',
      width: '80%',
      height: '60%',
      top: '100%',
    },
    serviceContent: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    serviceIcon: {
      width: '50px',
      height: '50px',
      marginBottom: '20px',
    },
    serviceWrapper: {
      paddingLeft: '7%',
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
    },
    serviceDescription: {
      width: '100%',
      fontSize: '14px',
      opacity: 0.5,
      marginBottom: '10%',
    },
    avatarArea: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      flexGrow: 1,
    },
    slickSlide: {
      textAlign: 'center',
      height: '70%',
      lineHeight: '160px',
      width: '100%',
      background: 'white',
      overflow: 'hidden',
    },
    slide: {
      backgroundColor: 'white',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    carText: {
      color: '#fff',
    },
  });
  const { t } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.behindCarousel} />
      <AwesomeSlider className={classes.slickSlide}>
        <div style={{ backgroundColor: 'white' }}>
          <div style={{ position: 'absolute', left: '10%', top: '10%' }}>
            <div className={classes.carouselHeader}>
              何か
              しています。
            </div>
            <p className={classes.carouselContent}>
              未稿dolor座amet,consectetur adipiscing elit.
              Amet scelerisque imperdiet座suspendisse faucibus auctor. Nibhマッサ,イプサム...
            </p>
          </div>
          <img src={carouselImg} alt="new" className={classes.carouselImg} />
        </div>
        <div style={{ backgroundColor: 'white' }}>
          <div style={{ position: 'absolute', left: '10%', top: '10%' }}>
            <div className={classes.carouselHeader}>
              何か
              しています。
            </div>
            <p className={classes.carouselContent}>
              未稿dolor座amet,consectetur adipiscing elit.
              Amet scelerisque imperdiet座suspendisse faucibus auctor. Nibhマッサ,イプサム...
            </p>
          </div>
          <img src={carouselImg} alt="new" className={classes.carouselImg} />
        </div>
        <div style={{ backgroundColor: 'white' }}>
          <div style={{ position: 'absolute', left: '10%', top: '10%' }}>
            <div className={classes.carouselHeader}>
              何か
              しています。
            </div>
            <p className={classes.carouselContent}>
              未稿dolor座amet,consectetur adipiscing elit.
              Amet scelerisque imperdiet座suspendisse faucibus auctor. Nibhマッサ,イプサム...
            </p>
          </div>
          <img src={carouselImg} alt="new" className={classes.carouselImg} />
        </div>
      </AwesomeSlider>
      {/* ---------------- MAIN SERVICES ----------------- */}
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div className={classes.mainServices}>
          <h2 style={{ flexGrow: 0.5 }}>{t('main_service')}</h2>
          <div className={classes.serviceContent}>
            {/* home sales */}
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={homeIcon} alt="Home" />
              <h3 style={{ marginBottom: '7%' }}>{t('home_sales')}</h3>
              <p className={classes.serviceDescription}>{t('home_sales_des')}</p>
              <h4>{t('details')}</h4>
            </div>
            {/* visa consulting */}
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={visaIcon} alt="Visa" />
              <h3 style={{ marginBottom: '7%' }}>{t('visa_consulting')}</h3>
              <p className={classes.serviceDescription}>{t('home_sales_des')}</p>
              <h4>{t('details')}</h4>
            </div>
            {/* employment consultation */}
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={rentIcon} alt="Rent" />
              <h3 style={{ marginBottom: '7%' }}>{t('employment_consultation')}</h3>
              <p className={classes.serviceDescription}>{t('home_sales_des')}</p>
              <h4>{t('details')}</h4>
            </div>
            {/* other */}
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={otherIcon} alt="Other" />
              <h3 style={{ marginBottom: '7%' }}>{t('other')}</h3>
              <p className={classes.serviceDescription}>{t('home_sales_des')}</p>
            </div>
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
            <div className={classes.avatarArea}>
              <Avatar alt="Remy Sharp" src={avatar1} className={classes.bigAvatar} />
              <div style={{ fontWeight: 700, textAlign: 'center' }}>幹事</div>
            </div>
            <div className={classes.avatarArea}>
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

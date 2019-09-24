import React,
{
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import anime from 'animejs';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import { RootContext } from '../store';
import facebookLogo from '../static/images/facebook-logo.png';
import twitterLogo from '../static/images/twitter-logo.png';
import linkedinLogo from '../static/images/linkedin-logo.png';
import homeIcon from '../static/images/home-icon.png';
import rentIcon from '../static/images/rent-icon.png';
import visaIcon from '../static/images/visa-icon.png';
import avatar1 from '../static/images/avatar-1.jpeg';
import avatar2 from '../static/images/avatar-2.jpg';

function useHover() {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const enter = () => setHovered(true);
  const leave = () => setHovered(false);

  useEffect(() => {
    ref.current.addEventListener('mouseenter', enter);
    ref.current.addEventListener('mouseleave', leave);
    return () => {
      ref.current.removeEventListener('mouseenter', enter);
      ref.current.removeEventListener('mouseleave', leave);
    };
  }, [ref.current]);

  return [ref, hovered];
}

const HomePage = (props) => {
  const useStyles = makeStyles({
    bigAvatar: {
      marginBottom: '10px',
      width: 90,
      height: 90,
      alignSelf: 'center',
    },
    pageHeader: {
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      top: '2.5%',
      left: '3%',
      fontFamily: 'Roboto',
    },
    carouselImg: {
      position: 'absolute',
      zIndex: 1,
      width: '52%',
      height: '70%',
      right: '0%',
    },
    companyLogo: {
      marginRight: '40px',
      fontWeight: '900',
      fontSize: '15px',
    },
    headerMenu: {
      marginRight: '40px',
      fontSize: '15px',
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
    line: {
      width: 'inherit',
      height: '3px',
      backgroundColor: 'rgb(105, 192, 255)',
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
    pageFooter: {
      backgroundColor: 'rgb(186,231,255)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      position: 'absolute',
      top: '230%',
      left: '0%',
      width: '100%',
      height: '25%',
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
    linkDecoration: {
      color: 'inherit',
      textDecoration: 'none',
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
  const { state } = useContext(RootContext);
  const Header = useRef();
  const counterRef = useRef();
  const [productRef, productHovered] = useHover();
  const [newsRef, newsHovered] = useHover();
  const [contactRef, contactHovered] = useHover();
  const classes = useStyles();

  useEffect(() => {
    if (state.shouldHeaderShow) {
      const tl = anime.timeline({
        easing: 'easeOutExpo',
      });

      tl.add({
        targets: Header.current,
        opacity: 1,
        duration: 1000,
      });

      tl.add({
        targets: counterRef.current,
        opacity: 1,
        duration: 250,
      });
    }
  }, [state.shouldHeaderShow]);

  return (
    <React.Fragment>
      {/* -------- HEADER ---------- */}
      <header ref={Header} className={classes.pageHeader}>
        <div className={classes.companyLogo}>FUJIWARA</div>
        <div className={classes.headerMenu}>
          <Link to="/" className={classes.linkDecoration}>
            {t('home')}
          </Link>
          <div className={classes.line}>.</div>
        </div>
        <div className={classes.headerMenu} ref={productRef}>
          <Link to="/product" className={classes.linkDecoration}>
            {t('product')}
          </Link>
          {productHovered && <div className={classes.line}>.</div>}
        </div>
        <div className={classes.headerMenu} ref={newsRef}>
          <Link to="/news" className={classes.linkDecoration}>
            {t('news')}
          </Link>
          {newsHovered && <div className={classes.line}>.</div>}
        </div>
        <div className={classes.headerMenu} ref={contactRef}>
          <Link to="/" className={classes.linkDecoration}>
            {t('contact_us')}
          </Link>
          {contactHovered && <div className={classes.line}>.</div>}
        </div>
      </header>
      {/* ------------------- CAROUSEL -------------------- */}
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
      {/* ---------------- FOOTER ---------------- */}
      <footer>
        <div className={classes.pageFooter}>
          <h2 style={{ paddingLeft: '5px' }}>FUJIWARA</h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '13%',
              flexGrow: 1,
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                width: '25px',
                height: '25px',
                flexGrow: '1',
              }}
            >
              <img
                src={facebookLogo}
                alt="facebook-logo"
              />
            </div>
            <div
              style={{
                width: '25px',
                height: '25px',
                flexGrow: '1',
              }}
            >
              <img
                src={twitterLogo}
                alt="twitter-logo"
              />
            </div>
            <div
              style={{
                width: '25px',
                height: '25px',
              }}
            >
              <img
                src={linkedinLogo}
                alt="linkedin-logo"
              />
            </div>
          </div>
          <div
            style={{
              paddingRight: '3%',
              display: 'flex',
              width: '30%',
              justifyContent: 'center',
              flexGrow: 1,
            }}
          >
            <div
              style={{
                height: '53%',
                textAlign: 'center',
                flexGrow: 1,
                borderRight: '2px solid gray',
              }}
            >
              {t('news')}
            </div>
            <div
              style={{
                textAlign: 'center',
                height: '53%',
                flexGrow: 1,
                borderRight: '2px solid gray',
              }}
            >
              {t('product')}
            </div>
            <div
              style={{
                textAlign: 'center',
                marginLeft: '10%',
                height: '53%',
              }}
            >
              {t('contact_us')}
            </div>
          </div>
          <div
            style={{
              color: 'rbg(120, 116, 116)',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Copyright © 2019 Fujiwara.
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

HomePage.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(HomePage);

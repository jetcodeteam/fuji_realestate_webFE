import React,
{
  useState,
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { loadCSS } from 'fg-loadcss';
import { withI18n } from 'react-i18next';
import AwesomeSlider from 'react-awesome-slider';
import { Link } from 'react-router-dom';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/cube-animation';

import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';

import homeIcon from '../static/images/icon/home-icon.png';
import avatar1 from '../static/images/avatar/avatar-1.jpeg';
import avatar2 from '../static/images/avatar/avatar-2.jpg';
import { getProducts } from '../services/ProductServices';


const HomePage = (props) => {
  const adjustServices = useMediaQuery('(min-width:690px)');
  const [productLoading, setProductLoading] = useState(false);
  const [productList, setProductList] = useState([]);

  const isMounted = useRef(true);

  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  useEffect(() => {
    setProductLoading(true);
    getProducts(0, 3, 'createdAt', 'DESC')
      .then((res) => {
        if (isMounted.current) {
          const data = res.data.data;
          setProductLoading(false);
          setProductList(data);
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setProductLoading(false);
        }
      });
  }, []);

  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
    bigAvatar: {
      marginBottom: '10px',
      width: 90,
      height: 90,
      alignSelf: 'center',
    },
    carouselImg: {
      width: '100%',
      height: 450,
    },
    carouselText: {
      display: 'flex',
      flexDirection: 'column',
    },
    carouselHeader: {
      fontSize: adjustServices ? '3.5vw' : '5vw',
      textAlign: 'left',
      marginBottom: '10px',
    },
    carouselContent: {
      fontSize: adjustServices ? '1.5vw': '2vw',
      opacity: 0.5,
      lineHeight: 'normal',
      zIndex: 3,
      textAlign: 'left',
    },
    about: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '40%',
      alignItems: 'center',
      marginBottom: '100px'
    },
    aboutHeader: {
      fontSize: '1.5em',
      fontWeight: '700',
      marginBottom: '25px',
    },
    aboutContent: {
      flexGrow: 1,
      width: '60%',
      textAlign: 'center',
      fontWeight: '700',
      marginBottom: '100px',
    },
    mainServices: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      flexWrap: 'wrap',
      // width: '80%',
      height: '60%',
      marginBottom: '100px'
    },
    serviceContent: {
      display: 'flex',
      width: '100%',
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: adjustServices ? 'nowrap' : 'wrap',
      flexDirection: 'column',
    },
    serviceIcon: {
      width: '50px',
      height: '50px',
      marginBottom: '20px',
    },
    serviceWrapper: {
      position: adjustServices || 'relative',
      right: adjustServices || '9%',
      display: 'flex',
      flexDirection: 'column',
      width: '250px',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      border: adjustServices || '1px solid #69C0FF',
      borderRadius: adjustServices || '5px',
      padding: '25px 15px 25px 15px',
      margin: '0 25px 20px 25px',
    },
    otherServices: {
      position: adjustServices || 'relative',
      right: adjustServices || '10%',
      paddingLeft: adjustServices && '7%',
      display: 'flex',
      width: 'inherit',
      justifyContent: adjustServices || 'center',
      alignItems: adjustServices || 'center',
      textAlign: adjustServices || 'left',
      padding: adjustServices || '25px 15px 25px 15px',
      margin: adjustServices || '0 25px 20px 25px',
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
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '20px',
      height: '30vw',
      width: '50%',
    },
    slide: {
      display: 'flex',
      top: 0,
      left: 0,
      width: '100vw',
      height: '30vw',
    },
    carouselBackdrop: {
      position: 'absolute',
      zIndex: '0',
      width: '25vw',
      height: '40vw',
      backgroundColor: '#69C0FF',
      top: 0,
      right: '75px',
    },
    button: {
      display: 'flex',
      justifyContent: adjustServices && 'flex-start',
      padding: adjustServices && 0,
      width: adjustServices && '25px',
      backgroundColor: adjustServices || '#54D5FE',
    },
    carouselDes: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: '7vw',
    },
  }));
  const { t } = props;
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:1000px)');

  return (
    <React.Fragment>
      {
        matches && (
          <div className={classes.carouselBackdrop} />
        )
      }
      {
        productLoading ? (
          <div className={classes.slickSlide} style={{ alignItems: 'center', position: 'relative', left: '25%' }}>
            <CircularProgress className={classes.progress} />
          </div>
        ) : (
          <AwesomeSlider
            bullets={false}
            cssModule={AwesomeSliderStyles}
            className={classes.slickSlide}
            organicArrows
          >    
            {productList.map(product => (
              <div style={{ backgroundColor: 'white', position: 'relative' }}>
                <div className={classes.slide}>
                  <div className={classes.carouselDes}>
                    <div className={classes.carouselHeader}>{product.name}</div>
                    <p className={classes.carouselContent}>
                      {product.address}, {product.district}, {product.ward}, {product.city}
                    </p>
                  </div>
                  <div style={{ width: '50%' }}>
                    <img src={product.images[0]} alt={product.name} height="100%" />
                  </div>
                </div>
              </div>
            ))}
          </AwesomeSlider>
        )
      }
      {/* ---------------- MAIN SERVICES ----------------- */}
      <div style={{ flexWrap: 'wrap', display: 'flex', justifyContent: 'center', width: '100%', marginTop: '100px' }}>
        <div className={classes.mainServices}>
          <h2 style={{ fontSize: '1.5em', marginBottom: '25px', fontWeight: 'bold' }}>{t('main_service')}</h2>
          <div className={classes.serviceContent}>
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={homeIcon} alt="Home" />
              <Link to="/products" style={{ color: 'blue', textDecoration: 'blue' }}><h3 style={{ marginBottom: '7%' }}>{t('home_sales')}</h3></Link>
              <p className={classes.serviceDescription}>{t('home_sales_des')}</p>
            </div>
            { adjustServices && <h3 style={{ margin: '0 0 20px 0', fontWeight: 'bold' }}>{t('other')}</h3> }
            <div className={classes.otherServices} style={{ justifyContent: 'center' }}>
              {
                adjustServices ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Chip
                      label="Visa"
                      icon={<Icon className="fas fa-money-check" style={{ margin: '10px 0 10px 10px', width: 'fit-content' }} />}
                      style={{ margin: '0 10px 10px 0', width: 'fit-content' }}
                    />
                    <Chip
                      label="Jobs"
                      icon={<Icon className="fas fa-briefcase" style={{ margin: '10px 0 10px 10px' }} />}
                      style={{ margin: '0 10px 10px 0', width: 'fit-content' }}
                    />
                    <Chip
                      label="Translating"
                      icon={<Icon className="fas fa-globe-americas" style={{ margin: '10px 0 10px 10px' }} />}
                      style={{ margin: '0 10px 10px 0', width: 'fit-content' }}
                    />
                    <Chip
                      label="Repair Furniture"
                      icon={<Icon className="fas fa-wrench" style={{ margin: '10px 0 10px 10px' }} />}
                      style={{ margin: '0 10px 10px 0', width: 'fit-content' }}
                    />
                    <Chip
                      label="Mobile Sim"
                      icon={<Icon className="fas fa-mobile" style={{ margin: '10px 0 10px 10px' }} />}
                      style={{ margin: '0 10px 10px 0', width: 'fit-content' }}
                    />
                    <Chip
                      label="Wifi"
                      icon={<Icon className="fas fa-wifi" style={{ margin: '10px 0 10px 10px', width: 'fit-content' }} />}
                      style={{ margin: '0 10px 10px 0', width: 'fit-content' }}
                    />
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon className="fas fa-money-check" style={{ margin: '10px 0 10px 10px', width: 'fit-content' }} />
                    <Icon className="fas fa-briefcase" style={{ margin: '10px 0 10px 10px' }} />
                    <Icon className="fas fa-globe-americas" style={{ margin: '10px 0 10px 10px' }} />
                    <Icon className="fas fa-wrench" style={{ margin: '10px 0 10px 10px' }} />
                    <Icon className="fas fa-mobile" style={{ margin: '10px 0 10px 10px' }} />
                    <Icon className="fas fa-wifi" style={{ margin: '10px 0 10px 10px', width: 'fit-content' }} />
                  </div>
                )
              }
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

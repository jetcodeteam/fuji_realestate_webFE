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
import _ from 'lodash';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/cube-animation';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CircularProgress from '@material-ui/core/CircularProgress';

import homeIcon from '../../static/images/icon/home-icon.png';
import visaIcon from '../../static/images/icon/visa-icon.png';
import jobIcon from '../../static/images/icon/job-icon.png';
import translateIcon from '../../static/images/icon/translate-icon.png';
import repairIcon from '../../static/images/icon/repair-icon.png';
import simIcon from '../../static/images/icon/sim-icon.png';
import wifiIcon from '../../static/images/icon/wifi-icon.png';

import avatar1 from '../../static/images/avatar/avatar-1.jpeg';
import avatar2 from '../../static/images/avatar/avatar-2.jpg';
import { getProducts } from '../../services/ProductServices';


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
    button: {
      margin: theme.spacing(1),
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
      fontSize: adjustServices ? '3.5vw' : '25px',
      textAlign: 'left',
      marginBottom: '10px',
    },
    carouselContent: {
      fontSize: adjustServices ? '1.5vw': '10px',
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
      flexGrow: 1,
      flexWrap: 'wrap',
      height: '60%',
      paddingTop: '50px',
    },
    serviceContent: {
      display: 'flex',
      width: '100%',
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    serviceIcon: {
      width: '50px',
      height: '50px',
      marginBottom: '20px',
    },
    serviceWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: '200px',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      border: adjustServices || '1px solid #69C0FF',
      borderRadius: adjustServices || '5px',
      padding: '25px 15px 25px 15px',
      margin: '0 0 20px 0',
    },
    otherServices: {
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
              <div key={_.get(product, '_id', '')} style={{ backgroundColor: 'white', position: 'relative' }}>
                <div className={classes.slide}>
                  <div className={classes.carouselDes}>
                    <Link key={_.get(product, '_id', '')} to={`/products/${product._id}`}>
                      <div className={classes.carouselHeader}>{product.name}</div>
                    </Link>
                    <p className={classes.carouselContent}>
                      {product.address}, {_.get(product, 'ward.name_with_type', '')}, {_.get(product, 'district.name_with_type', '')}, {product.city}
                    </p>
                  </div>
                  <div style={{ width: '50%' }}>
                    <img
                      src={_.get(product.images[0], 'url', '')}
                      alt={_.get(product.images[0], 'filename', '')}
                      height="100%" width="100%"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </AwesomeSlider>
        )
      }
      {/* ---------------- SERVICES ----------------- */}
      <div style={{ flexWrap: 'wrap', background: '#f7f8f9', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', margin: '100px 0 100px 0' }}>
        <div className={classes.mainServices}>
          <h2 style={{ fontSize: '1.5em', marginBottom: '25px', fontWeight: 'bold' }}>{t('main_service')}</h2>
          <div className={classes.serviceContent}>
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={homeIcon} alt={t('real_estate')} />
              <h3 style={{ marginBottom: '7%', fontSize: '1.5em', fontWeight: 500 }}>{t('real_estate')}</h3>
            </div>
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={visaIcon} alt="Visa" />
              <h3 style={{ marginBottom: '7%', fontSize: '1.5em', fontWeight: 500 }}>{t('visa')}</h3>
            </div>
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={jobIcon} alt="Job" />
              <h3 style={{ marginBottom: '7%', fontSize: '1.5em', fontWeight: 500 }}>{t('jobs')}</h3>
            </div>
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={translateIcon} alt="Home" />
              <h3 style={{ marginBottom: '7%', fontSize: '1.5em', fontWeight: 500 }}>{t('translating')}</h3>
            </div>
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={repairIcon} alt="Home" />
              <h3 style={{ marginBottom: '7%', fontSize: '1.5em', fontWeight: 500 }}>{t('repair_furniture')}</h3>
            </div>
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={simIcon} alt="Home" />
              <h3 style={{ marginBottom: '7%', fontSize: '1.5em', fontWeight: 500 }}>{t('mobile_sim')}</h3>
            </div>
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={wifiIcon} alt="Home" />
              <h3 style={{ marginBottom: '7%', fontSize: '1.5em', fontWeight: 500 }}>{t('wifi')}</h3>
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

import React,
{
  useState,
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { loadCSS } from 'fg-loadcss';
import { withI18n } from 'react-i18next';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CircularProgress from '@material-ui/core/CircularProgress';

import homeIcon from '../../static/images/icon/home-icon.png';
import visaIcon from '../../static/images/icon/visa-icon.png';
import jobIcon from '../../static/images/icon/job-icon.png';
import translateIcon from '../../static/images/icon/translate-icon.png';
import repairIcon from '../../static/images/icon/repair-icon.png';
import simIcon from '../../static/images/icon/sim-icon.png';
import wifiIcon from '../../static/images/icon/wifi-icon.png';
import { getProducts } from '../../services/ProductServices';
import Carousel from '../../components/utils/Carousel';


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
    document.title = "Fujiwara Real Estate";
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
    about: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 0 100px 0',
    },
    aboutHeader: {
      fontSize: '1.5em',
      fontWeight: '700',
      marginBottom: '20px',
    },
    aboutContent: {
      width: '60%',
      textAlign: 'center',
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
      width: adjustServices ? '3vw' : '50px',
      height: adjustServices ? '3vw' : '50px',
      marginBottom: '20px',
    },
    serviceWrapper: {
      display: 'flex',
      flexDirection: 'column',
      width: adjustServices ? '10vw' : '200px',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      border: adjustServices || '1px solid #69C0FF',
      borderRadius: adjustServices || '5px',
      padding: '25px 15px 25px 15px',
      margin: '0 2vw 20px 2vw',
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
    slickSlide: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '20px',
      height: '30vw',
      width: '50%',
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
          <Carousel productList={productList} adjustServices={adjustServices} />
        )
      }
      {/* ---------------- SERVICES ----------------- */}
      <div style={{ flexWrap: 'wrap', background: '#f7f8f9', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%', margin: '100px 0 0 0' }}>
        <div className={classes.mainServices}>
          <h2 style={{ fontSize: '1.5em', marginBottom: '25px', fontWeight: 'bold' }}>{t('main_service')}</h2>
          <div className={classes.serviceContent}>
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={homeIcon} alt={t('real_estate')} />
              <h3 style={{ marginBottom: '7%', fontSize: '1em', fontWeight: 500 }}>{t('real_estate')}</h3>
            </div>
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={visaIcon} alt="Visa" />
              <h3 style={{ marginBottom: '7%', fontSize: '1em', fontWeight: 500 }}>{t('visa')}</h3>
            </div>
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={jobIcon} alt="Job" />
              <h3 style={{ marginBottom: '7%', fontSize: '1em', fontWeight: 500 }}>{t('jobs')}</h3>
            </div>
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={translateIcon} alt="Home" />
              <h3 style={{ marginBottom: '7%', fontSize: '1em', fontWeight: 500 }}>{t('translating')}</h3>
            </div>
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={repairIcon} alt="Home" />
              <h3 style={{ marginBottom: '7%', fontSize: '1em', fontWeight: 500 }}>{t('repair_furniture')}</h3>
            </div>
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={simIcon} alt="Home" />
              <h3 style={{ marginBottom: '7%', fontSize: '1em', fontWeight: 500 }}>{t('mobile_sim')}</h3>
            </div>
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={wifiIcon} alt="Home" />
              <h3 style={{ marginBottom: '7%', fontSize: '1em', fontWeight: 500 }}>{t('wifi')}</h3>
            </div>
          </div>
        </div>
      </div>
      {/* --------------- ABOUT ------------------- */}
      <div className={classes.about}>
        <h2 className={classes.aboutHeader}>{t('about')}</h2>
        <div className={classes.aboutContent}>
          {t('about_des')}
        </div>
      </div>
    </React.Fragment>
  );
};

HomePage.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(HomePage);

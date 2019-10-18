import React,
{
  useState,
  useRef,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import AwesomeSlider from 'react-awesome-slider';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/cube-animation';

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CircularProgress from '@material-ui/core/CircularProgress';

import homeIcon from '../static/images/icon/home-icon.png';
import rentIcon from '../static/images/icon/rent-icon.png';
import visaIcon from '../static/images/icon/visa-icon.png';
import otherIcon from '../static/images/icon/other-icon.png';
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
    setProductLoading(true);
    getProducts(0, 3, 'createdAt', 'ASC')
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
      flexWrap: 'wrap',
      width: '80%',
      height: '60%',
      marginBottom: '100px'
    },
    serviceContent: {
      display: 'flex',
      width: '100%',
      justifyContent: 'center',
      flexWrap: adjustServices ? 'nowrap' : 'wrap'
    },
    serviceIcon: {
      width: '50px',
      height: '50px',
      marginBottom: '20px',
    },
    serviceWrapper: {
      paddingLeft: adjustServices && '7%',
      display: 'flex',
      flexDirection: 'column',
      width: '250px',
      justifyContent: adjustServices || 'center',
      alignItems: adjustServices || 'center',
      textAlign: adjustServices || 'center',
      border: adjustServices || '1px solid #69C0FF',
      borderRadius: adjustServices || '5px',
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
          <div className={classes.slickSlide} style={{ alignItems: 'center' }}>
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
                      {product.street}, {product.district}, {product.ward}, {product.city}
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
          <h2 style={{ fontSize: '1.5em', marginBottom: '25px' }}>{t('main_service')}</h2>
          <div className={classes.serviceContent}>
            {/* home sales */}
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={homeIcon} alt="Home" />
              <h3 style={{ marginBottom: '7%' }}>{t('home_sales')}</h3>
              <p className={classes.serviceDescription}>{t('home_sales_des')}</p>
              <Button variant={adjustServices || "contained"} color="primary" className={classes.button}>
                {t('details')}
              </Button>
            </div>
            {/* visa consulting */}
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={visaIcon} alt="Visa" />
              <h3 style={{ marginBottom: '7%' }}>{t('visa_consulting')}</h3>
              <p className={classes.serviceDescription}>{t('home_sales_des')}</p>
              <Button variant={adjustServices || "contained"} color="primary" className={classes.button}>
                {t('details')}
              </Button>
            </div>
            {/* employment consultation */}
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={rentIcon} alt="Rent" />
              <h3 style={{ marginBottom: '7%' }}>{t('employment_consultation')}</h3>
              <p className={classes.serviceDescription}>{t('home_sales_des')}</p>
              <Button variant={adjustServices || "contained"} color="primary" className={classes.button}>
                {t('details')}
              </Button>
            </div>
            {/* other */}
            <div className={classes.serviceWrapper}>
              <img className={classes.serviceIcon} src={otherIcon} alt="Other" />
              <h3 style={{ marginBottom: '7%' }}>{t('other')}</h3>
              <p className={classes.serviceDescription}>{t('other_des')}</p>
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

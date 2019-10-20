import React from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import AwesomeSlider from 'react-awesome-slider';

import { makeStyles } from '@material-ui/core/styles';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/cube-animation';

import product from '../static/images/product/product.png';
import product1 from '../static/images/product/product1.png';
import product2 from '../static/images/product/product2.png';
import product3 from '../static/images/product/product3.png';
import product4 from '../static/images/product/pr.png';

const MobileProductDetail = (props) => {
  const { t } = props;
  const useStyles = makeStyles({
    root: {
      maxWidth: '100vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      height: 'fit-content',
      backgroundColor: 'lightgray',
      marginBottom: '50px',
    },
    description: {
      height: 'fit-content',
      backgroundColor: 'white',
      margin: '10px 0 10px 0',
      fontSize: '1.5em',
      width: '100vw',
    },
    image: {
      width: '100vw',
      height: 'fit-content',
      backgroundColor: 'white',
      marginBottom: '10px',
      textAlign: 'center',
    },
    details: {
      width: '100vw',
      height: 'fit-content',
      backgroundColor: 'white',
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      fontSize: '1.5em'
    },
    feature: {
      width: '100vw',
      height: 'fit-content',
      backgroundColor: '#54D5FE',
      marginBottom: '10px',
      fontSize: '1.5em',
      fontWeight: 'bold',
      color: 'white',
    }
  });
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.description}>
          <p style={{ margin: '20px' }}>ホーチミン中心の１区、日本食も多く日本人が多く住んでいるエリア内です</p>
        </div>
        <AwesomeSlider
          bullets={false}
          cssModule={AwesomeSliderStyles}
          className={classes.image}
          organicArrows
        >
          <div><img src={product} alt="product" /></div>
          <div><img src={product1} alt="product" /></div>
          <div><img src={product2} alt="product" /></div>
          <div><img src={product3} alt="product" /></div>
          <div><img src={product4} alt="product" /></div>
        </AwesomeSlider>
        <div className={classes.details}>
          <p style={{ margin: '20px' }}>Dollar</p>
          <p style={{ margin: '20px' }}>400</p>
        </div>
        <div className={classes.details}>
          <p style={{ margin: '20px' }}>Size</p>
          <p style={{ margin: '20px' }}>40㎡</p>
        </div>
        <div className={classes.details}>
          <p style={{ margin: '20px' }}>Location</p>
          <p style={{ margin: '20px' }}>12 Dien Bien Phu</p>
        </div>
        <div className={classes.feature}>
          <p style={{ margin: '20px' }}>Feature/Facilities</p>
        </div>
        <div className={classes.details}>
          <p style={{ margin: '20px' }}>TV</p>
        </div>
        <div className={classes.details}>
          <p style={{ margin: '20px' }}>Air Conditioner</p>
        </div>
        <div className={classes.details}>
          <p style={{ margin: '20px' }}>Stove</p>
        </div>
      </div>
    </React.Fragment>
  );
}; 

MobileProductDetail.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(MobileProductDetail);

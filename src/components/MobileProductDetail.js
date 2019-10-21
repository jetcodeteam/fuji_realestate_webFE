import React from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import AwesomeSlider from 'react-awesome-slider';

import { makeStyles } from '@material-ui/core/styles';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/cube-animation';

const MobileProductDetail = (props) => {
  const { t, product } = props;
  const productImages = product.images;
  const productFeature = product.feature;
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
          <p style={{ margin: '20px' }}>{product.name}</p>
        </div>
        <AwesomeSlider
          bullets={false}
          cssModule={AwesomeSliderStyles}
          className={classes.image}
          organicArrows
        >
          {productImages.map(image => (
            <div><img src={image} alt="product" /></div>
          ))}
        </AwesomeSlider>
        <div className={classes.details}>
          <p style={{ margin: '20px' }}>{t('yen')}</p>
          <p style={{ margin: '20px' }}>{product.price}</p>
        </div>
        <div className={classes.details}>
          <p style={{ margin: '20px' }}>{t('size')}</p>
          <p style={{ margin: '20px' }}>{product.size}㎡</p>
        </div>
        <div className={classes.details}>
          <p style={{ margin: '20px' }}>{t('location')}</p>
          <p style={{ margin: '20px' }}>{product.address}, {product.ward.name}, {product.district.name}, {product.city}</p>
        </div>
        <div className={classes.feature}>
          <p style={{ margin: '20px' }}>{t('feature')}</p>
        </div>
        {productFeature.map(feature => (
          <div className={classes.details}>
            <p style={{ margin: '20px' }}>{feature}</p>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}; 

MobileProductDetail.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  product: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(MobileProductDetail);

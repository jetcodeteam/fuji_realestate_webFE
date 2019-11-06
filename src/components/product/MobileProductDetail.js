import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import { useParams } from 'react-router-dom';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Tag, message } from 'antd';

import { getProductDetails } from '../../services/ProductServices';

const MobileProductDetail = (props) => {
  const { t } = props;
  const { product_id } = useParams();
  const [productLoading, setProductLoading] = useState(false);
  const [productInfo, setProductInfo] = useState([]);
  const [productFeature, setProductFeature] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const isMounted = useRef(true);
  const isFirefox = typeof InstallTrigger !== 'undefined';
  const responsive = {
    0: { items: 1 },
    1024: { items: 1 },
  }
  const convertPrice = (labelValue) => {

    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e+9

    ? Math.abs(Number(labelValue)) / 1.0e+9 + " " + t('billion')
    // Six Zeroes for Millions 
    : Math.abs(Number(labelValue)) >= 1.0e+6

    ? Math.abs(Number(labelValue)) / 1.0e+6 + " " + t('million')
    // Three Zeroes for Thousands
    : Math.abs(Number(labelValue)) >= 1.0e+3

    ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

    : Math.abs(Number(labelValue));
  }

  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  useEffect(() => {
    console.log('useEffect')
    setProductLoading(true);
    getProductDetails(product_id)
      .then((res) => {
        const data = res.data.data;
        console.log(data);
        setProductLoading(false);
        setProductInfo(data);
        setProductFeature(data.feature[0].split(','));
        setProductImages(data.images);
      })
      .catch(() => {
        if (isMounted.current) {
          setProductLoading(false);
        }
      });
  }, []);

  useEffect(() => {
    if (isFirefox) {
      window.scrollTo(0, 0); 
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setProductLoading(true);
    getProductDetails(product_id)
      .then((res) => {
        setProductInfo(_.get(res, 'data.data', ''));
        setProductLoading(false);
        setProductFeature((_.get(res, 'data.data.feature[0]', '')).split(','));
        setProductImages(_.get(res, 'data.data.images', ''));
      })
      .catch(() => {
        setProductLoading(false);
        message.error(`Couldn't load product. Please try to reload the page`);
      })
  }, [product_id]);

  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
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
  }));
  const classes = useStyles();

  return (
    <React.Fragment>
      {
        productLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', margin: '100px 0 100px 0' }}>
            <CircularProgress className={classes.progress} />
          </div>
        ) : (
          <div className={classes.root}>
            <div className={classes.description} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ margin: '20px' }}>{productInfo.name}</p>
              {productInfo.status ? <span style={{ marginRight: '20px' }}><Tag color="#f50">{t('sold')}</Tag></span> : null}
            </div>
            <AliceCarousel
              responsive={responsive}
              autoPlay autoPlayInterval={3000}
              duration={600}
              buttonsDisabled dotsDisabled
            >
              {productImages.map(image => (
                <div style={{ width: 'inherit', height: 'inherit' }}>
                  <img
                    style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                    key={_.get(image, 'url', '')}
                    src={_.get(image, 'url', '')}
                    alt={_.get(image, 'filename', '')}
                  />
                </div>
              ))}
            </AliceCarousel>
            <div className={classes.details}>
              <p style={{ margin: '20px' }}>{t('dollar')}</p>
              <p style={{ margin: '20px' }}>{convertPrice(productInfo.price)}</p>
            </div>
            <div className={classes.details}>
              <p style={{ margin: '20px' }}>{t('room')}</p>
              <p style={{ margin: '20px' }}>{productInfo.room}</p>
            </div>
            <div className={classes.details}>
              <p style={{ margin: '20px' }}>{t('size')}</p>
              <p style={{ margin: '20px' }}>{productInfo.square}㎡</p>
            </div>
            <div className={classes.details}>
              <p style={{ margin: '20px' }}>{t('location')}</p>
              <p style={{ margin: '20px', textOverflow: 'ellipsis' }}>{productInfo.address}, {_.get(productInfo, 'ward.name_with_type', '')}, {_.get(productInfo, 'district.name_with_type', '')}, {productInfo.city}</p>
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
        )
      }    
    </React.Fragment>
  );
}; 

MobileProductDetail.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(MobileProductDetail);

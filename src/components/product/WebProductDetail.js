import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { message } from 'antd';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getProductDetails } from '../../services/ProductServices';

const WebProductDetail = (props) => {
  const { t } = props;
  const { product_id } = useParams();
  const [productLoading, setProductLoading] = useState(false);
  const [productInfo, setProductInfo] = useState([]);
  const [productFeature, setProductFeature] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  useEffect(() => {
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
    console.log(product_id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    productBanner: {
      width: '40px',
      backgroundColor: 'rgb(105,192,255)',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontSize: '22px',
      fontWeight: 700,
      position: 'relative',
      top: '-5%',
      marginLeft: '7%',
    },
    productAddress: {
      maxWidth: '400px',
      fontSize: '1.5em',
      margin: '0 0 100px 15%',
    },
    houseSize: {
      color: 'rgb(214,137,67)',
      fontSize: '3em',
      position: 'relative',
      top: '-14%  ',
      marginLeft: '13%',
    },
    productProps: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      top: '-12%',
      fontSize: '1.5em',
      marginLeft: '7%',
      width: '43%',
      height: '20%',
    },
    verticalProducts: {
      textAlign: 'right',
      width: '100%',
      position: 'relative',
      top: '-60%',
      height: 'fit-content',
    },
    verticalProductStyle: {
      width: '40vw',
      height: '20vw',
      objectFit: 'cover',
    },
    horizontalProducts: {
      display: 'flex',
      position: 'relative',
      top: '-50vw',
      height: '15vw',
      marginLeft: '4%',
    },
    horizontalProductStyle: {
      width: '25vw',
      objectFit: 'cover',
      height: 'auto',
    },
    price: {
      color: 'rgb(40,208,55)',
      fontSize: '4em',
      position: 'relative',
      top: '-41%',
      width: '60%',
      textAlign: 'right',
    },
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
          <div style={{ margin: '50px 0 150px 0' }}>
            <div className={classes.productAddress}>
              <p>{productInfo.name}</p>
            </div>
            <div style={{ height: '80vh', backgroundColor: 'lightgray' }}>
              <div className={classes.productBanner}>
                <h2 style={{ color: 'white' }}>{productInfo.room}ベッドルーム</h2>
              </div>
              <h1 className={classes.houseSize}>約{productInfo.square}㎡</h1>
              <div className={classes.productProps}>
                <h4>{t('location')}： {productInfo.address}</h4>
                <h4>{t('floor')}：{productInfo.floor}</h4>
                <div style={{ display: 'flex', width: 'fit-content', height: 'inherit', flexWrap: 'wrap' }}>
                  {productFeature ? (<h4 style={{ marginRight: '30px' }}>{t('feature')}:</h4>) : null}
                  {productFeature && (productFeature.map(feature => (
                    <div style={{ width: 'fit-content', marginRight: '30px' }}>
                      <h4>{feature}: {t('yes')}</h4>
                    </div>
                  )))}
                </div>
              </div>
              <h1 className={classes.price}>{productInfo.price} {t('dollar')}</h1>
              <div className={classes.verticalProducts}>
                <div>
                  <img
                    src={_.get(productImages[0], 'url', '')}
                    alt={_.get(productImages[0], 'filename', '')}
                    className={classes.verticalProductStyle}
                    style={{ marginBottom: '50px' }}
                  />
                </div>
                <div>
                  <img
                    src={_.get(productImages[1], 'url', '')}
                    alt={_.get(productImages[1], 'filename', '')}
                    className={classes.verticalProductStyle} />
                </div>
              </div>
              <div className={classes.horizontalProducts}>
                <img
                  className={classes.horizontalProductStyle}
                  style={{ marginRight: '40px' }}
                  src={_.get(productImages[2], 'url', '')}
                  alt={_.get(productImages[2], 'filename', '')}
                />
                <img
                  src={_.get(productImages[3], 'url', '')}
                  alt={_.get(productImages[3], 'filename', '')}
                  className={classes.horizontalProductStyle} height="100%" />
              </div>
            </div>
          </div>
        )
      }  
    </React.Fragment>
  );
}; 

WebProductDetail.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(WebProductDetail);

import React, { useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import AwesomeSlider from 'react-awesome-slider';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import AwesomeSliderStyles from 'react-awesome-slider/src/styled/cube-animation';

import { makeStyles } from '@material-ui/core/styles';

const Carousel = (props) => {
  const { productList, adjustServices } = props;
  const [showProduct, setShowProduct] = useState(false);

  useEffect(() => {
    if (productList.length > 0) {
      setShowProduct(true);
    }
  }, [productList])

  const useStyles = makeStyles({
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
    carouselDes: {
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingLeft: '7vw',
    },
  });
  const classes = useStyles();

  return (
    <React.Fragment>
      {
        showProduct ? (
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
                    <Link key={_.get(product, '_id', '')} to={`/products/${_.get(product, '_id', '')}`}>
                      <div className={classes.carouselHeader}>{_.get(product, 'name', '')}</div>
                    </Link>
                    <p className={classes.carouselContent}>
                      {_.get(product, 'address', '')}, {_.get(product, 'ward.name_with_type', '')}, {_.get(product, 'district.name_with_type', '')}, {_.get(product, 'city', '')}
                    </p>
                  </div>
                  <div style={{ width: '50%' }}>
                    <img
                      src={_.get(product, 'images[0].url', '')}
                      alt={_.get(product, 'images[0].filename', '')}
                      height="100%" width="100%"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </AwesomeSlider>
        ) : (
          <div className={classes.slickSlide} />
        )
      }
    </React.Fragment>
  );
};

Carousel.propTypes = {
  productList: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withNamespaces()(Carousel);

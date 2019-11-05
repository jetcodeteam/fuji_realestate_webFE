import React, { useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

import { makeStyles } from '@material-ui/core/styles';
import { Button, Icon } from 'antd';

const Carousel = (props) => {
  const { productList, adjustServices } = props;
  const [showProduct, setShowProduct] = useState(false);
  const responsive = {
    0: { items: 1 },
    1024: { items: 1 },
  }

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
      overflow: adjustServices || 'hidden',
      whiteSpace: adjustServices || 'nowrap',
      textOverflow: adjustServices || 'ellipsis',
    },
    carouselContent: {
      fontSize: adjustServices ? '1.5vw': '10px',
      opacity: 0.5,
      lineHeight: 'normal',
      zIndex: 3,
      textAlign: 'left',
      overflow: adjustServices || 'hidden',
      whiteSpace: adjustServices || 'nowrap',
      textOverflow: adjustServices || 'ellipsis',
    },
    slickSlide: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      marginTop: '25px',
      height: '30vw',
    },
    slide: {
      display: 'flex',
      position: 'absolute',
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
  let ca;

  return (
    <React.Fragment>
      {
        showProduct ? (
          <div>
            <div className={classes.slickSlide}>
              <AliceCarousel
                responsive={responsive}
                autoPlay autoPlayInterval={3500}
                duration={600}
                buttonsDisabled
                ref={(el) => (ca = el)}
              >
                {productList.map(product => (
                  <div key={_.get(product, '_id', '')} style={{ backgroundColor: 'white', position: 'relative', height: '30vw', width: '50vw' }}>
                    <div className={classes.slide}>
                      <div className={classes.carouselDes}>
                        <Link key={_.get(product, '_id', '')} to={`/products/${_.get(product, '_id', '')}`}>
                          <div className={classes.carouselHeader}>{_.get(product, 'name', '')}</div>
                        </Link>
                        <p className={classes.carouselContent}>
                          {_.get(product, 'address', '')}<br />
                          {_.get(product, 'ward.name_with_type', '')}, {_.get(product, 'district.name_with_type', '')}, {_.get(product, 'city', '')}
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
              </AliceCarousel>
            </div>
            {
              adjustServices ? (
                <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: '10px' }}>
                  <Button type="ghost" size="default" onClick={() => ca.slidePrev()}>
                    <Icon type="left" />
                  </Button>
                  <Button type="ghost" size="default" onClick={() => ca.slideNext()}>
                    <Icon type="right" />
                  </Button>
                </div>
              ) : (
                null
              )
            }
          </div>
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

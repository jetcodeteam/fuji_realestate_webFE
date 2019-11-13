import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { Tag } from 'antd';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';

import { getProducts } from '../../services/ProductServices';
import MobileProductDetail from '../../components/product/MobileProductDetail';
import WebProductDetail from '../../components/product/WebProductDetail';


const ProductDetail = (props) => {
  const shouldWrap = useMediaQuery('(min-width:1150px)');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  const getRelatedProducts = (params) => {
    const data = {
      offset: 0,
      limit: 3,
      order: 'desc',
      sort: 'createdAt',
      ...params,
    };
    setRelatedLoading(true);
    getProducts(data)
      .then((res) => {
        setRelatedProducts([
          ...relatedProducts,
          ..._.get(res, 'data.data', ''),
        ]);
        setRelatedLoading(false);
      })
      .catch(() => {
        setRelatedLoading(false);
      });
  };

  useEffect(() => {
    getRelatedProducts()
  }, []);

  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
    },
    card: {
      maxWidth: 300,
      width: 345,
    },
    media: {
      height: 140,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    linkDecoration: {
      color: 'inherit',
      textDecoration: 'none',
    },
    detailTitle: {
      fontSize: '1em',
      fontWeight: 'bold',
    },
    productDetails: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    relatedContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '0 30px 30px 5vw',
      width: '90%',
    },
    longText: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  }));
  const { t } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      { shouldWrap ? (<WebProductDetail />) : (<MobileProductDetail />) }
      <div style={{ margin: '200px 0 100px 0' }}>
        <div className={classes.relatedContainer}>
          <h1 style={{ marginLeft: 7, fontSize: 25, fontWeight: 700 }}>{t('more')}</h1>
          { relatedLoading ? (<LinearProgress />) : (<Divider />) }
        </div>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={4} style={{ width: 'fit-content', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
              {relatedProducts.map(value => (
                <Link key={`/products/${_.get(value, '_id')}`} to={`/products/${_.get(value, '_id')}`} className={classes.linkDecoration}>
                  <Grid key={`/products/${_.get(value, '_id')}`} style={{ margin: 12 }} item>
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={_.get(value, 'images[0].url', '')}
                          title={_.get(value.images[0], 'filename', '')}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2" className={classes.productDetails} className={classes.longText}>
                            <span>{value.name}</span>
                            {value.status ? <span><Tag color="#f50">{t('sold')}</Tag></span> : null}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p" className={classes.longText}>
                            <span>{value.address}, {_.get(value, 'ward.name_with_type', '')}, {_.get(value, 'district.name_with_type', '')}, {value.city}</span>
                          </Typography>
                          <Typography className={classes.productDetails} variant="body2" color="textSecondary">
                            <span className={classes.detailTitle}>{t('area')}</span>
                            <span>{value.square}㎡</span>
                          </Typography>
                          <Typography className={classes.productDetails} variant="body2" color="textSecondary">
                            <span className={classes.detailTitle}>{t('floor')}</span>
                            <span>{value.floor}</span>
                          </Typography>
                          <Typography className={classes.productDetails} variant="body2" color="textSecondary">
                            <span className={classes.detailTitle}>{t('price')}</span>
                            <span>${value.price}</span>
                          </Typography>
                          <Typography className={classes.productDetails} variant="body2" color="textSecondary">
                            <span className={classes.detailTitle}>{t('house_type')}</span>
                            <span>{t(value.houseType)}</span>
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Link>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

ProductDetail.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(ProductDetail);

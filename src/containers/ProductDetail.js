import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { getProductDetails } from '../services/ProductServices';
import product from '../static/images/product/product.png';
import MobileProductDetail from '../components/MobileProductDetail';


const ProductDetail = (props) => {
  const shouldWrap = useMediaQuery('(min-width:1150px)');
  const { product_id } = useParams();
  const [productLoading, setProductLoading] = useState(false);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [productInfo, setProductInfo] = useState([]);
  const [productFeature, setProductFeature] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const isMounted = useRef(true);

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
        setProductFeature(data.feature);
        setDistrict(data.district);
        setWard(data.ward);
        setProductImages(data.images);
      })
      .catch(() => {
        if (isMounted.current) {
          setProductLoading(false);
        }
      });
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
    productAddress: {
      maxWidth: '400px',
      fontSize: '1.5em',
      margin: '0 0 100px 15%',
    },
    productBanner: {
      width: shouldWrap ? '40px' : '4vw',
      backgroundColor: 'rgb(105,192,255)',
      textAlign: 'center',
      verticalAlign: 'middle',
      fontSize: shouldWrap ? '22px' : '2.5vw',
      fontWeight: 700,
      position: 'relative',
      top: '-5%',
      marginLeft: '7%',
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
      height: '23vw',
    },
    horizontalProducts: {
      display: 'flex',
      position: 'relative',
      bottom: '100%',
      marginLeft: '4%'
    },
    horizontalProductStyle: {
      width: '25vw',
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
  const { t } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      {
        shouldWrap ? (
          <div style={{ margin: '50px 0 150px 0' }}>
            <div className={classes.productAddress}>
              <p>{productInfo.name}</p>
            </div>
            <div style={{ height: '80vh', backgroundColor: 'lightgray' }}>
              <div className={classes.productBanner}>
                <h2 style={{ color: 'white' }}>ワンルーム</h2>
              </div>
              <h1 className={classes.houseSize}>約{productInfo.square}㎡</h1>
              <div className={classes.productProps}>
                <h4>所在地： {productInfo.address}, {ward.name}, {district.name}, {productInfo.city}</h4>
                <h4>階数：{productInfo.floor}</h4>
                <h4>特徴:</h4>
                {productFeature.map(feature => (
                  <h4>{feature}：はい</h4>
                ))}
              </div>
              <h1 className={classes.price}>{productInfo.price}円</h1>
              <div className={classes.verticalProducts}>
                <div>
                  <img
                    src={productImages[0]}
                    alt="product1"
                    className={classes.verticalProductStyle}
                    style={{ marginBottom: '50px' }}
                  />
                </div>
                <div>
                  <img src={productImages[1]} alt="product2" className={classes.verticalProductStyle} />
                </div>
              </div>
              <div className={classes.horizontalProducts}>
                <img
                  className={classes.horizontalProductStyle}
                  style={{ marginRight: '40px' }}
                  src={productImages[2]}
                  alt="product3"
                />
                <img src={productImages[3]} alt="product4" className={classes.horizontalProductStyle} height="100%" />
              </div>
            </div>
          </div>
        ) : (
          <MobileProductDetail product={productInfo}/>
        )
      }
      <div style={{ marginBottom: '100px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '0 30px 0 30px',
            width: '90%',
          }}
        >
          <h1 style={{ marginLeft: 7, fontSize: 25, fontWeight: 700 }}>{t('more')}</h1>
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'gray',
              opacity: 0.2,
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 25,
            }}
          />
        </div>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Grid container spacing={4} style={{ width: '100%', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
              {[0, 1, 2].map(value => (
                <Link key={value} to="/productdetail" className={classes.linkDecoration}>
                  <Grid key={value} style={{ margin: 12 }} item>
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image={product}
                          title="Title"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {t('title')}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            27 dien bien phu, HCM, Vietnam
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            2 寝室
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            ¥1,280
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            278,499 đ
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

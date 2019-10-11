import React from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import product from '../static/images/product/product.png';
import product1 from '../static/images/product/product1.png';
import product2 from '../static/images/product/product2.png';
import product3 from '../static/images/product/product3.png';
import product4 from '../static/images/product/pr.png';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const ProductDetail = (props) => {
  const shouldWrap = useMediaQuery('(min-width:991px)');


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
      verticalAlign: 'center',
      fontSize: shouldWrap ? '22px' : '2.5vw',
      fontWeight: 700,
      position: 'relative',
      top: '-5%',
      left: '7%',
    },
    houseSize: {
      color: 'rgb(214,137,67)',
      fontSize: '3em',
      position: 'relative',
      top: '-14%  ',
      left: '13%',
    },
    productProps: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      top: '-12%',
      left: '7%',
      width: '50%',
      height: '20%',
    },
    verticalProducts: {
      width: '35%',
      position: 'relative',
      top: '-80%',
      left: '60%',
    },
    verticalProductStyle: {
      width: '40vw',
      height: 'auto',
    },
    horizontalProducts: {
      display: 'flex',
      position: 'relative',
      bottom: '130%',
      left: '4%'
    },
    horizontalProductStyle: {
      width: '25vw',
      height: 'auto',
    },
    price: {
      color: 'rgb(40,208,55)',
      fontSize: '4em',
      position: 'relative',
      top: '-81%',
      left: '61%'
    },
  }));
  const { t } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <div style={{ margin: '50px 0 150px 0' }}>
        <div className={classes.productAddress}>
          <p>ホーチミン中心の１区、日本食も多く日本人が多く住んでいるエリア内です</p>
        </div>
        <div style={{ height: '80vh', backgroundColor: 'lightgray' }}>
          <div className={classes.productBanner}>
            <h2 style={{ color: 'white' }}>ワンルーム</h2>
          </div>
          <h1 className={classes.houseSize}>約40㎡</h1>
          <div className={classes.productProps}>
            <h4>所在地：ホーチミン１区の日本人街</h4>
            <h4>階数：</h4>
            <h4>キッチン：　あり</h4>
            <h4>バルコニー：　あり</h4>
          </div>
          <h1 className={classes.price}>400ドル～</h1>
          <div className={classes.verticalProducts}>
            <div>
              <img
                src={product1}
                alt="product1"
                className={classes.verticalProductStyle}
                style={{ marginBottom: '50px' }}
              />
            </div>
            <div>
              <img src={product2} alt="product2" className={classes.verticalProductStyle} />
            </div>
          </div>
          <div className={classes.horizontalProducts}>
            <img
              className={classes.horizontalProductStyle}
              style={{ marginRight: '40px' }}
              src={product3}
              alt="product3"
            />
            <img src={product4} alt="product4" className={classes.horizontalProductStyle} />
          </div>
        </div>
      </div>
      <div style={{ marginBottom: '100px' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            margin: '0 30px 0 30px',
            width: '100%',
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

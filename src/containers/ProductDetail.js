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
  }));
  const { t } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <div
        style={{
          maxWidth: '400px',
          fontSize: '1.5em',
          margin: '50px 0 150px 15%',
        }}
      >
        <p>ホーチミン中心の１区、日本食も多く日本人が多く住んでいるエリア内です</p>
      </div>
      <div
        style={{
          width: '100%',
          backgroundColor: 'rgb(232,232,232)',
          height: '40vw',
          // maxHeight: 550,
          position: 'relative',
          display: 'flex',
          marginBottom: 100,
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '65%',
            minWidth: '639.59px'
          }}
        >        
          <div
            style={{
              width: shouldWrap ? '40px' : '4vw',
              backgroundColor: 'rgb(105,192,255)',
              textAlign: 'center',
              verticalAlign: 'center',
              fontSize: shouldWrap ? '22px' : '2.5vw',
              fontWeight: 700,
              position: 'absolute',
              top: '-7%',
              left: '5%',
            }}
          >
            <h2 style={{ color: 'white' }}>ワンルーム</h2>
          </div>
          <h1
            style={{
              color: 'rgb(214,137,67)',
              fontSize: '3em',
              position: 'absolute',
              top: '30%',
              left: '12%',
            }}
          >
            約40㎡
          </h1>
          <h1
            style={{
              color: 'rgb(40,208,55)',
              fontSize: '4em',
              position: 'absolute',
              top: '28%',
              left: '75%'
            }}
          >
            400
          </h1>
          <div
            style={{
              width: 40,
              textAlign: 'center',
              verticalAlign: 'center',
              position: 'absolute',
              top: '0',
              left: '88%',
            }}
          >
            <h2 style={{ color: 'rgb(40,208,55)', fontSize: 50 }}>ドル～</h2>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              position: 'absolute',
              top: shouldWrap ? '47%' : '100%',
              left: '9%'
            }}
          >
            <h4>所在地：ホーチミン１区の日本人街</h4>
            <h4>階数：</h4>
            <h4>キッチン：　あり</h4>
            <h4>バルコニー：　あり</h4>
            <h4>物件設備：　テレビ/ソファー/テーブル</h4>
          </div>
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: '-20%',
              left: '12%'
            }}
          >
            <img
              style={{
                width: '25vw', height: 'auto',
                marginRight: '40px',
              }}
              src={product3}
              alt="product3"
            />
            <img src={product4} alt="product4" style={{ width: '25vw', height: 'auto' }} />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
          </div>
        </div>

        <div style={{ width: '35%', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: '-5%',
            }}
          >
            <img
              src={product1}
              alt="product1"
              style={{
                width: '40vw',
                height: 'auto',
                marginBottom: '25px',
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '-5%'
            }}
          >
            <img src={product2} alt="product2" style={{ width: '40vw', height: 'auto' }} />
          </div>
        </div>
          {/* <div
            style={{
              width: '80%',
              alignSelf: 'center',
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              height: 350,
              flexGrow: 1,
            }}
          >
            <div style={{ flexGrow: 1 }}>
              <h3>{t('more')}</h3>
              <div
                style={{
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'gray',
                  opacity: 0.2,
                  marginLeft: 5,
                  marginRight: 5,
                  flexGrow: 1,
                }}
              >
                .
              </div>
          </div>     
      </div>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={6}>
              {[0, 1, 2].map(value => (
                <Link to="/productdetail" className={classes.linkDecoration}>
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
                          <Typography variant="body3" color="textSecondary" component="p">
                            2 寝室
                          </Typography>
                          <Typography variant="body4" color="textSecondary" component="p">
                            ¥1,280
                          </Typography>
                          <Typography variant="body5" color="textSecondary" component="p">
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
        </Grid> */}
      </div>
    </React.Fragment>
  );
};

ProductDetail.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(ProductDetail);

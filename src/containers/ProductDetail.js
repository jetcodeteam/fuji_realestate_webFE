import React,
{
  useEffect,
  useRef,
  useState,
} from 'react';
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

import facebookLogo from '../static/images/icon/facebook-logo.png';
import twitterLogo from '../static/images/icon/twitter-logo.png';
import linkedinLogo from '../static/images/icon/linkedin-logo.png';
import product from '../static/images/product/product.png';
import product1 from '../static/images/product/product1.png';
import product2 from '../static/images/product/product2.png';
import product3 from '../static/images/product/product3.png';
import product4 from '../static/images/product/pr.png';


function useHover() {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const enter = () => setHovered(true);
  const leave = () => setHovered(false);

  useEffect(() => {
    ref.current.addEventListener('mouseenter', enter);
    ref.current.addEventListener('mouseleave', leave);
    return () => {
      ref.current.removeEventListener('mouseenter', enter);
      ref.current.removeEventListener('mouseleave', leave);
    };
  }, []);

  return [ref, hovered];
}

const ProductDetail = (props) => {
  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pagination: {
      position: 'absolute',
      bottom: '-57%',
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
      position: 'absolute',
      top: '7%',
      left: '5%',
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    pageHeader: {
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      top: '2.5%',
      left: '3%',
      fontFamily: 'Roboto',
    },
    companyLogo: {
      marginRight: '40px',
      fontWeight: '900',
      fontSize: '15px',
    },
    headerMenu: {
      marginRight: '40px',
      fontSize: '15px',
    },
    line: {
      width: 'inherit',
      height: '3px',
      backgroundColor: 'rgb(105, 192, 255)',
    },
    pageFooter: {
      marginTop: 30,
      backgroundColor: 'rgb(186,231,255)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      position: 'absolute',
      top: '180%',
      left: 0,
      right: 0,
      width: '100%',
      height: '25%',
    },
    linkDecoration: {
      color: 'inherit',
      textDecoration: 'none',
    },
  }));
  const { t } = props;
  const Header = useRef();
  const [homeRef, homeHovered] = useHover();
  const [newsRef, newsHovered] = useHover();
  const [contactRef, contactHovered] = useHover();
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* -------- HEADER ---------- */}
      <header ref={Header} className={classes.pageHeader}>
        <div className={classes.companyLogo}>FUJIWARA</div>
        <div className={classes.headerMenu} ref={homeRef}>
          <Link to="/" className={classes.linkDecoration}>
            {t('home')}
          </Link>
          {homeHovered && <div className={classes.line} />}
        </div>
        <div className={classes.headerMenu}>
          <Link to="/product" className={classes.linkDecoration}>
            {t('product')}
          </Link>
          <div className={classes.line} />
        </div>
        <div className={classes.headerMenu} ref={newsRef}>
          <Link to="/news" className={classes.linkDecoration}>
            {t('news')}
          </Link>
          {newsHovered && <div className={classes.line} />}
        </div>
        <div className={classes.headerMenu} ref={contactRef}>
          <Link to="/" className={classes.linkDecoration}>
            {t('contact_us')}
          </Link>
          {contactHovered && <div className={classes.line} />}
        </div>
      </header>
      {/* ----------------- PRODUCTS ------------------------- */}
      <div
        style={{
          width: '100%',
          position: 'absolute',
          top: '40%',
          backgroundColor: 'rgb(232,232,232)',
          height: 400,
        }}
      >
        .
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '15%',
          left: '10%',
        }}
      >
        <h2>ホーチミン中心の１区、日本食も多く</h2>
        <h2>日本人が多く住んでいるエリア内です</h2>
      </div>
      <h1
        style={{
          color: 'rgb(214,137,67)',
          position: 'absolute',
          top: '45%',
          left: '8%',
          fontSize: 40,
        }}
      >
        約40㎡
      </h1>
      <h1
        style={{
          color: 'rgb(40,208,55)',
          position: 'absolute',
          top: '45%',
          left: '43%',
          fontSize: 60,
        }}
      >
        400
      </h1>
      <div
        style={{
          width: 40,
          position: 'absolute',
          top: '40%',
          left: '52%',
          textAlign: 'center',
          verticalAlign: 'center',
        }}
      >
        <h2 style={{ color: 'rgb(40,208,55)', fontSize: 50 }}>ドル～</h2>
      </div>
      <div
        style={{
          width: 40,
          backgroundColor: 'rgb(105,192,255)',
          position: 'absolute',
          top: '27%',
          left: '3%',
          textAlign: 'center',
          verticalAlign: 'center',
        }}
      >
        <h2 style={{ color: 'white' }}>ワンルーム</h2>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '55%',
          left: '5%',
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
          top: '80%',
          left: '5%',
        }}
      >
        <img
          style={{
            width: 300,
            height: 200,
            marginRight: '40px',
          }}
          src={product3}
          alt="product3"
        />
        <img src={product4} alt="product4" style={{ width: 300, height: 200 }} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '35%',
          left: '73%',
        }}
      >
        <img
          src={product1}
          alt="product1"
          style={{
            width: 500,
            height: 220,
            marginBottom: '25px',
          }}
        />
        <img src={product2} alt="product2" style={{ width: 500, height: 220 }} />
      </div>
      <div
        style={{
          width: '80%',
          position: 'absolute',
          top: '120%',
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
        </Grid>
      </div>
      {/* ---------------- FOOTER ---------------- */}
      <footer>
        <div className={classes.pageFooter}>
          <h2 style={{ paddingLeft: '5px' }}>FUJIWARA</h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '13%',
              flexGrow: 1,
              marginBottom: '10px',
            }}
          >
            <div
              style={{
                width: '25px',
                height: '25px',
                flexGrow: '1',
              }}
            >
              <img
                src={facebookLogo}
                alt="facebook-logo"
              />
            </div>
            <div
              style={{
                width: '25px',
                height: '25px',
                flexGrow: '1',
              }}
            >
              <img
                src={twitterLogo}
                alt="twitter-logo"
              />
            </div>
            <div
              style={{
                width: '25px',
                height: '25px',
              }}
            >
              <img
                src={linkedinLogo}
                alt="linkedin-logo"
              />
            </div>
          </div>
          <div
            style={{
              paddingRight: '3%',
              display: 'flex',
              width: '30%',
              justifyContent: 'center',
              flexGrow: 1,
            }}
          >
            <div
              style={{
                height: '53%',
                textAlign: 'center',
                flexGrow: 1,
                borderRight: '2px solid gray',
              }}
            >
              {t('news')}
            </div>
            <div
              style={{
                textAlign: 'center',
                height: '53%',
                flexGrow: 1,
                borderRight: '2px solid gray',
              }}
            >
              {t('product')}
            </div>
            <div
              style={{
                textAlign: 'center',
                marginLeft: '10%',
                height: '53%',
              }}
            >
              {t('contact_us')}
            </div>
          </div>
          <div
            style={{
              color: 'rbg(120, 116, 116)',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Copyright © 2019 Fujiwara.
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

ProductDetail.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(ProductDetail);

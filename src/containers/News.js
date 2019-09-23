import React,
{
  useEffect,
  useRef,
  useState,
  lazy,
} from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import facebookLogo from '../static/images/facebook-logo.png';
import twitterLogo from '../static/images/twitter-logo.png';
import linkedinLogo from '../static/images/linkedin-logo.png';
import avatar from '../static/images/avatar-2.jpg';

const Home = lazy(() => import('./Home'));
const Product = lazy(() => import('./Product'));

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
  }, [ref.current]);

  return [ref, hovered];
}

const ProductPage = (props) => {
  const useStyles = makeStyles(theme => ({
    newsfeed: {
      marginTop: '30%',
    },
    subCard: {
      display: 'flex',
      width: 300,
    },
    subDetails: {
      display: 'flex',
      flexDirection: 'column',
    },
    subContent: {
      flex: '1 0 auto',
    },
    subCover: {
      width: 200,
      margin: '10px',
    },
    root: {
      marginTop: '30%',
      flexGrow: 1,
    },
    pagination: {
      position: 'absolute',
      bottom: '-57%',
    },
    card: {
      display: 'flex',
      width: 800,
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    content: {
      flex: '1 0 auto',
    },
    media: {
      height: 140,
    },
    cover: {
      width: 500,
      margin: '10px',
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
      backgroundColor: 'rgb(186,231,255)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      position: 'absolute',
      top: '160%',
      left: '0%',
      width: '100%',
      height: '25%',
    },
    linkDecoration: {
      color: 'inherit',
      textDecoration: 'none',
    },
    newsroot: {
      position: 'absolute',
      display: 'flex',
      left: '5%',
    },
  }));
  const { t } = props;
  const Header = useRef();
  const [homeRef, homeHovered] = useHover();
  const [productRef, productHovered] = useHover();
  const [contactRef, contactHovered] = useHover();
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* -------- HEADER ---------- */}
      <header ref={Header} className={classes.pageHeader}>
        <div className={classes.companyLogo}>FUJIWARA</div>
        <div className={classes.headerMenu} ref={homeRef}>
          <Link to="/" component={Home} className={classes.linkDecoration}>
            {t('home')}
          </Link>
          {homeHovered && <div className={classes.line}>.</div>}
        </div>
        <div className={classes.headerMenu} ref={productRef}>
          <Link to="/product" component={Product} className={classes.linkDecoration}>
            {t('product')}
          </Link>
          {productHovered && <div className={classes.line}>.</div>}
        </div>
        <div className={classes.headerMenu}>
          <Link to="/" className={classes.linkDecoration}>
            {t('news')}
          </Link>
          <div className={classes.line}>.</div>
        </div>
        <div className={classes.headerMenu} ref={contactRef}>
          <Link to="/" className={classes.linkDecoration}>
            {t('contact_us')}
          </Link>
          {contactHovered && <div className={classes.line}>.</div>}
        </div>
      </header>
      <TextField
        id="standard-bare"
        className={classes.textField}
        placeholder="Enter your search here"
        margin="normal"
        inputProps={{ 'aria-label': 'bare' }}
      />
      <div
        style={{
          width: '80%',
          marginTop: '15px',
          height: '1px',
          backgroundColor: 'gray',
          opacity: 0.2,
          marginLeft: 5,
          marginRight: 5,
          position: 'absolute',
          top: '15%',
        }}
      >
        .
      </div>
      {/* ----------------- NEWS ------------------------- */}
      <div className={classes.newsroot}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={6}>
              {[0, 1, 2].map(value => (
                <Grid key={value} item>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cover}
                      image={avatar}
                      title="News Title"
                    />
                    <div className={classes.details}>
                      <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5" style={{ marginBottom: '10%' }}>
                          意味のない大きなタイトル、意味のない大きなタイトル、意味のない大きなタイトル
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          style={{ fontSize: '12px' }}
                        >
                          オバマ大統領の将来の大邸宅は、世論調査の数が多く、他のすべての候補者を押しつぶして
                          最も人気のある家のタイトルを主張しました
                        </Typography>
                      </CardContent>
                    </div>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid container className={classes.newsfeed} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={3}>
              {[0, 1, 2, 3].map(value => (
                <Grid key={value} item>
                  <Card className={classes.subCard}>
                    <CardMedia
                      className={classes.subCover}
                      image={avatar}
                      title="News Title"
                    />
                    <div className={classes.subDetails}>
                      <CardContent className={classes.subContent}>
                        <Typography component="h8" variant="h8" style={{ marginBottom: '20%' }}>
                          ニュースのタイトル、ただ長くします
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="textSecondary"
                          style={{ fontSize: '9px' }}
                        >
                          5時間前
                        </Typography>
                      </CardContent>
                    </div>
                  </Card>
                </Grid>
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

ProductPage.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(ProductPage);

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
import article from '../static/images/news/article.png';
import news from '../static/images/news/news2.png';


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
      top: '220%',
      left: 0,
      right: 0,
      width: '100%',
      height: '20%',
    },
    linkDecoration: {
      color: 'inherit',
      textDecoration: 'none',
    },
  }));
  const { t } = props;
  const Header = useRef();
  const [homeRef, homeHovered] = useHover();
  const [contactRef, contactHovered] = useHover();
  const [productRef, productHovered] = useHover();
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
        <div className={classes.headerMenu} ref={productRef}>
          <Link to="/news" className={classes.linkDecoration}>
            {t('news')}
          </Link>
          {productHovered && <div className={classes.line} />}
        </div>
        <div className={classes.headerMenu} ref={contactRef}>
          <Link to="/" className={classes.linkDecoration}>
            {t('contact_us')}
          </Link>
          {contactHovered && <div className={classes.line} />}
        </div>
      </header>
      {/* ----------------- NEWS ------------------------- */}
      <div
        style={{
          width: '100%',
          position: 'absolute',
          top: '15%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '60%',
            alignSelf: 'center',
            justifyContent: 'center',
            WebkitJustifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <h1>新しい研究は成功について最も安っぽいクリシェを確認します</h1>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 20,
            }}
          >
            <img src={article} alt="article" style={{ height: 400, marginBottom: 5 }} />
            <h7 style={{ opacity: 0.5 }}>クレジット: Mike Harrington/DigitalVision/Getty</h7>
          </div>
          <p>
            これは文です。 これは2番目のものですが、それより長くなります。 次に、3番目のものがあります。 これらはす
            べて段落になります。これは文です。 これは2番目のものですが、それより長くなります。 次に、3番目のものがあ
            ります。 これらはすべて段落になります。これらはすべて段落になります。
          </p>
          <p>
            これは文です。 これは2番目のものですが、それより長くなります。 次に、3番目のものがあります。 これらはす
            べて段落になります。これは文です。 これは2番目のものですが、それより長くなります。 次に、3番目のものがあ
            これらはすべて段落になります。
          </p>
          <p>
            これは文です。 これは2番目のものですが、それより長くなります。 次に、3番目のものがあります。 これらはす
            べて段落になります。これは文です。 これは2番目のものですが、それより長くなります。 次に、3番目のものがあ
            これらはすべて段落になります。これは文です。 これは2番目のものですが、それより長くなります。 次に、3番目
            のものがあります。 これらはす べて段落になります。これは文です。 これは2番目のものですが、それより長く
            なります。 次に、3番目のものがあこ。これは文です。 これは2番目のものですが、それより長くなります。次に、3番目
            のものがあります。 これらはす べて段落になります。これは文です。 これは2番目のものですが、それより長く
            なります。 次に、3番目のものがあこ
          </p>
          <p>
            これは文です。 これは2番目のものですが、それより長くなります。 次に、3番目のものがあります。 これらはす
            べて段落になります。これは文です。 これは2番目のものですが、それより長くなります。 次に、3番目のものがあ
            これらはすべて段落になります。
          </p>
        </div>
        <div
          style={{
            width: '80%',
            position: 'absolute',
            top: '100%',
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
                width: '125%',
                height: '1px',
                backgroundColor: 'gray',
                opacity: 0.2,
                marginLeft: 5,
                marginRight: 5,
                flexGrow: 1,
                marginBottom: 10,
              }}
            >
              .
            </div>
          </div>
          <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={6}>
                {[0, 1, 2].map(value => (
                  <Link to="/newsdetail" className={classes.linkDecoration}>
                    <Grid key={value} style={{ margin: 12 }} item>
                      <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia
                            className={classes.media}
                            image={news}
                            title="Title"
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                              ニュースのタイトル、ただ長くします
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              オバマ大統領の将来の大邸宅は、世論調査の数が多く、他のすべての候補者を押しつぶして
                            </Typography>
                            <Typography variant="body3" color="textSecondary" component="p">
                              5時間前
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
      </div>
      {/* ---------------- FOOTER ---------------- */}
      <footer>
        <div className={classes.pageFooter}>
          <h2 style={{ fontSize: 25, fontWeight: 700, flexGrow: 1 }}>FUJIWARA</h2>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              flexGrow: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '15%',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '25px',
                  height: '25px',
                  flexGrow: 1,
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
                  flexGrow: 1,
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
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
              flexGrow: 1,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '25%',
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
                  height: '53%',
                  flexGrow: 1,
                }}
              >
                {t('contact_us')}
              </div>
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

import React from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import facebookLogo from '../static/images/icon/facebook-logo.png';
import twitterLogo from '../static/images/icon/twitter-logo.png';
import linkedinLogo from '../static/images/icon/linkedin-logo.png';
import news from '../static/images/news/news.png';
import news3 from '../static/images/news/news3.png';

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
      zIndex: 2,
    },
    dense: {
      marginTop: 19,
    },
    menu: {
      width: 200,
    },
    pageFooter: {
      backgroundColor: 'rgb(186,231,255)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      position: 'absolute',
      top: '140%',
      left: '0%',
      width: '100%',
      height: '20%',
    },
    linkDecoration: {
      color: 'inherit',
      textDecoration: 'none',
    },
    newsroot: {
      width: '90%',
      position: 'absolute',
      display: 'flex',
      left: '5%',
      zIndex: 1,
    },
  }));
  const { t } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
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
      <div className={classes.newsroot}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={6}>
              {[0, 1, 2].map(value => (
                <Link to="/newsdetail" className={classes.linkDecoration}>
                  <Grid key={value} style={{ marginBottom: 20 }} item>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cover}
                        image={news}
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
                </Link>
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
                      image={news3}
                      title="Title"
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

ProductPage.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(ProductPage);

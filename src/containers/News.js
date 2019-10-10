import React from 'react';
import { withI18n } from 'react-i18next';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Hidden from '@material-ui/core/Hidden';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import news from '../static/images/news/news.png';
import news3 from '../static/images/news/news3.png';

const NewsPage = () => {
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
      flexGrow: 1,
    },
    pagination: {
      position: 'absolute',
      bottom: '-57%',
    },
    card: {
      display: 'flex',
      width: '100%',
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
      width: '30vw',
      minWidth: 200,
      height: 'auto',
      margin: '10px',
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    subtitle: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: 500,
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
    linkDecoration: {
      color: 'inherit',
      textDecoration: 'none',
    },
    newsroot: {
      position: 'absolute',
      top: '210px',
      width: '90%',
      display: 'flex',
      flexWrap: 'wrap',
      zIndex: 1,
    },
  }));
  const classes = useStyles();

  return (
    <React.Fragment>
      <div
        style={{
          width: '90%',
          marginTop: '15px',
          height: '1px',
          backgroundColor: 'gray',
          opacity: 0.2,
          marginLeft: 5,
          marginRight: 5,
          position: 'absolute',
          top: '150px',
        }}
      >
      </div>
      <div className={classes.newsroot}>
        <Grid container className={classes.root} spacing={2}>
          <Grid item sm={12} md={8}>
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
                          <Typography className="subtitle-news" variant="h6" style={{ marginBottom: '10px' }}>
                            意味のない大きなタイトル、意味のない大きなタイトル、意味のない大きなタイトル
                          </Typography>
                          <Typography
                            variant="caption"
                            color="textSecondary"
                            className="subtitle-news"
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
          <Hidden smDown>
            <Grid item sm={4}>
              <Grid container justify="center" spacing={2}>
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
                          <Typography className="subtitle-news" component="h8" variant="h8" style={{ marginBottom: '20%' }}>
                            ニュースのタイトル、ただ長くします
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            style={{ fontSize: '9px' }}
                            className="subtitle-news"
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
          </Hidden>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default withI18n()(NewsPage);

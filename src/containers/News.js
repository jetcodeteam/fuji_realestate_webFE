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
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';


import news from '../static/images/news/news.png';
import news3 from '../static/images/news/news3.png';

const NewsPage = () => {
  const matches = useMediaQuery('(min-width:613px)');
  const shouldWrap = useMediaQuery('(min-width:961px)');

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
    },
    subCover: {
      width: 200,
      margin: '10px',
    },
    root: {
      display: 'flex',
    },
    card: {
      display: 'flex',
      width: '100%',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
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
    },
    subtitle: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: 500,
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
      width: '90%',
      display: 'flex',
    },
    filter: {
      width: '80%',
      height: '100px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      margin: matches ? '35px 10% 0px 10%' : '35px 10% 35px 10%',
      flexWrap: 'wrap',
    },
    input: {
      display: 'flex',
      alignItems: 'center',
      width: 320,
      height: 35,
      margin: '15px',
      borderRadius: 30,
      backgroundColor: 'rgba(105, 192, 255, 0.27)',
    },
    filterInput: {
      display: 'flex',
      alignItems: 'center',
      width: 110,
      height: 35,
      margin: '15px',
      borderRadius: 30,
      backgroundColor: '#69C0FF',
    },
    divider: {
      marginBottom: matches ? '50px' : '60px',
      width: '90%',
      margin: 'auto',
    }
  }));
  const classes = useStyles();

  function openFilterModal() {
    console.log('oh ye');
  }

  return (
    <React.Fragment>
       <div className={classes.filter}>
        <Paper className={classes.input}>
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="目的地を入力してください"
            inputProps={{ 'aria-label': 'search real estates' }}
            style={{ width: '80%' }}
          />
        </Paper>
        <Button variant="contained" className={classes.filterInput} onClick={openFilterModal}>
          + フィルタ
        </Button>
      </div>
      <Divider variant="middle" className={classes.divider} />

    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 100 }}>
      <div className={classes.newsroot}>
        <Grid container className={classes.root}>
          <Grid item sm={12} md={8}>
            <p style={{ marginLeft: '12px', fontWeight: 700, fontSize: '2em' }}>Recent News</p>
            <div style={{ marginBottom: '10px' }}></div>
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
              <span style={{ marginLeft: '60px', fontWeight: 700, fontSize: '1.5em' }}>Most Viewed</span>
              <div style={{ marginBottom: '10px' }}></div>
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
    </div>
    </React.Fragment>
  );
};

export default withI18n()(NewsPage);

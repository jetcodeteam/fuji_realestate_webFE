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

import article from '../static/images/news/article.png';
import news from '../static/images/news/news2.png';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const ProductDetail = (props) => {
  const shouldWrap = useMediaQuery('(min-width:690px)');

  const useStyles = makeStyles(theme => ({
    root: {
      marginTop: 10,
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '100px',
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
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px'
        }}
      >
        <div
          style={{
            display: 'flex',
            width: shouldWrap ? '60%' : '90%',
            alignSelf: 'center',
            WebkitJustifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <h1 style={{ fontSize: 40, marginBottom: 35 }}>新しい研究は成功について最も安っぽいクリシェを確認します</h1>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 35,
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
            marginTop: 55,
            width: '80%',
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
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
            >
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
    </React.Fragment>
  );
};

ProductDetail.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(ProductDetail);

import React, { useEffect, useState } from 'react';
import { withI18n } from 'react-i18next';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import '../assets/news.css';

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
import LinearProgress from '@material-ui/core/LinearProgress';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  Anchor,
  Typography as TypAntd,
  BackTop,
} from 'antd';


import news from '../static/images/news/news.png';
import news3 from '../static/images/news/news3.png';

import { pagination } from '../configs/constants';
import {
  getNews,
} from '../services/NewsServices';

const { Text } = TypAntd;

const NewsPage = (props) => {
  const {
    t,
  } = props;
  const matches = useMediaQuery('(min-width:613px)');
  const shouldWrap = useMediaQuery('(min-width:961px)');

  const [tableData, setTableData] = useState([]);
  const [mostViewedData, setMostViewedData] = useState([]);
  const [isTableLoading, setTableLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const getMostViewedData = (params) => {
    const data = {
      offset: 0,
      limit: 4,
      order: 'desc',
      sort: 'createdAt',
      ...params,
    };
    setTableLoading(true);
    getNews(data)
      .then((res) => {
        setMostViewedData([
          ...mostViewedData,
          ..._.get(res, 'data.data'),
        ]);
        setTableLoading(false);
      })
      .catch(() => {
        setTableLoading(false);
      });
  };

  const getNewsList = (params) => {
    const data = {
      offset: 0,
      limit: pagination.limit,
      order: 'desc',
      sort: 'createdAt',
      ...params,
    };
    setTableLoading(true);
    getNews(data)
      .then((res) => {
        console.log(res);
        setTableData([
          ...tableData,
          ..._.get(res, 'data.data'),
        ]);
        setTableLoading(false);
        setTotalPage(parseInt(_.get(res, "headers['content-range']", "0/0").split("/")[1]) / data.limit);
      })
      .catch(() => {
        setTableLoading(false);
      });
  };

  useEffect(() => {
    getNewsList()
    getMostViewedData()
  }, []);

  const loadMore = () => {
    const offset = (currentPage) * pagination.limit;
    setCurrentPage(currentPage + 1);
    getNewsList({ offset });
  };

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
      width: 150,
      margin: '10px',
      height: 100,
      objectFit: 'contain',
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
      height: 177.67,
      margin: '10px',
      objectFit: 'contain',
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

  // Uncomment this to show filter
  // function openFilterModal() {
  //   console.log('oh ye');
  // }

  return (
    <React.Fragment>
      <BackTop />
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
        {/* Uncomment this to show filter
        <Button variant="contained" className={classes.filterInput} onClick={openFilterModal}>
          + フィルタ
        </Button>
        */}
      </div>
      {
        isTableLoading ? (
          <LinearProgress className={classes.divider} />          
        ) : (
          <Divider variant="middle" className={classes.divider} />
        )
      }

    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 100 }}>
      <div className={classes.newsroot}>
        <Grid container className={classes.root}>
          <Grid item sm={12} md={11}>
            <p style={{ marginLeft: '12px', fontWeight: 700, fontSize: '2em' }}>{isTableLoading || t('recent_news')}</p>
            <div style={{ marginBottom: '10px' }}></div>
              {tableData.map(value => (
                <Link key={_.get(value, '_id')} to={`news/${_.get(value, '_id')}`} className={classes.linkDecoration}>
                  <Grid key={_.get(value, '_id')} style={{ marginBottom: 20 }} item>
                    <Card key={_.get(value, '_id')} className={classes.card}>
                      <CardMedia
                        className={classes.cover}
                        component="img"
                        src={`${process.env.REACT_APP_API_URL}/static/${_.get(value, 'thumbnail')}`}
                        title="News Title"
                      />
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Typography className="subtitle-news" variant="h5" style={{ marginBottom: '10px' }}>
                            {_.get(value, 'title')}
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
              { totalPage > currentPage && <Button onClick={loadMore}>More...</Button> }
          </Grid>
        </Grid>
        
        <Hidden smDown>
            <Grid item sm={4}>
              <Anchor affix={tableData.length >= 5}>
                <span style={{ marginLeft: '60px', fontWeight: 700, fontSize: '1.5em' }}>{isTableLoading || t('most_viewed')}</span>
                <div style={{ marginBottom: '10px' }}></div>
                <Grid container justify="center">
                  <Grid item>
                    {mostViewedData.map(value => (
                      <Link key={_.get(value, '_id')} to={`news/${_.get(value, '_id')}`} className={classes.linkDecoration}>
                          <Card key={_.get(value, '_id')} className={classes.subCard}>
                            <CardMedia
                              className={classes.subCover}
                              component="img"
                              src={`${process.env.REACT_APP_API_URL}/static/${_.get(value, 'thumbnail')}`}
                              title="Title"
                            />
                            <div className={classes.subDetails}>
                              <CardContent className={classes.subContent}>
                                <Text strong className="subtitle-news" style={{ marginBottom: '20%' }}>
                                  {_.get(value, 'title')}
                                </Text>
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
                          <div style={{ marginBottom: '10px' }}></div>
                      </Link>
                    ))}
                  </Grid>
                </Grid>
              </Anchor>
            </Grid>
          </Hidden>
      </div>
    </div>
    </React.Fragment>
  );
};

export default withI18n()(NewsPage);

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { withI18n, translate } from 'react-i18next';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Pagination, Modal } from 'antd';
import { Tag } from 'antd';

import ProductFilter from '../../components/product/ProductFilterForm';
import { getProducts } from '../../services/ProductServices';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const ProductPage = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isFilterOpen, setFilterOpen] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [filterData, setFilterData] = useState({});
  const isMounted = useRef(true);

  const getProductList = (offset) => {
    const data = {
      offset: offset,
      limit: 6,
      order: 'desc',
      sort: 'createdAt',
      filter: filterData
    };
    setProductLoading(true);
    getProducts(data)
      .then((res) => {
        console.log(res)
        if (isMounted.current) {
          const products = res.data.data;
          setProductLoading(false);
          setProductList(products);
          setTotalPage(Math.ceil(parseInt(_.get(res, "headers['content-range']", "0/0").split("/")[1]) / data.limit)*10);
        }
      })
      .catch(() => {
        if (isMounted.current) {
          setProductLoading(false);
        }
      });
  }

  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  useEffect(() => {
    getProductList(0, filterData);
  }, []);

  productList.sort(function(a, b) {
    var statusA = a.status;
    var statusB = b.status;
    if (statusA < statusB) {
      return -1;
    }
    if (statusA > statusB) {
      return 1;
    }
  
    return 0;
  });

  function handlePageChange(page, pageSize) {
    console.log('changePage')
    let offset = (page - 1) * 6
    getProductList(offset, filterData);
    console.log(productList);
  }

  function openFilterModal() {
    setFilterOpen(true);
  }

  function onFilterClose() {
    setFilterOpen(false);
  }

  function handleFilter(states) {
    console.log('filtering...', states);
    let filter_states = {};
    for (let state in states) {
      if (states[state]) {
        filter_states[String(state)] = states[state]
      };
    };
    setFilterData(filter_states);
    onFilterClose();
  }
  console.log(filterData);

  useEffect(() => {
    getProductList(0, filterData);
  }, [filterData])

  const matches = useMediaQuery('(min-width:613px)');
  const useStyles = makeStyles(theme => ({
    progress: {
      margin: theme.spacing(2),
    },
    root: {
      maxWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pagination: {
    },
    card: {
      maxWidth: 345,
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
    headerMenu: {
      marginRight: '40px',
      fontSize: '15px',
    },
    linkDecoration: {
      color: 'inherit',
      textDecoration: 'none',
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
      marginBottom: matches ? '100px' : '60px',
      width: '90%',
      margin: 'auto',
    },
    productDetails: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    detailTitle: {
      fontSize: '1em',
      fontWeight: 'bold',
    },
    longText: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  }));
  const { t } = props;
  const classes = useStyles();

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
      {
        productLoading ? (
          <LinearProgress className={classes.divider} />          
        ) : (
          <Divider variant="middle" className={classes.divider} />
        )
      }  

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={6} style={{ width: '85%', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
            {productList.map(value => (
              <Link key={_.get(value, '_id', '')} to={`/products/${value._id}`} className={classes.linkDecoration}>
                <Grid key={_.get(value, '_id', '')} style={{ margin: 12 }} item>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image={_.get(value, 'images[0].url', '')}
                        title={_.get(value.images[0], 'filename', '')}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.productDetails} className={classes.longText}>
                          <span>{value.name}</span>
                          {value.status ? <span><Tag color="#f50">{t('sold')}</Tag></span> : null}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p" className={classes.longText}>
                          <span>{value.address}, {_.get(value, 'ward.name_with_type', '')}, {_.get(value, 'district.name_with_type', '')}, {value.city}</span>
                        </Typography>
                        <Typography className={classes.productDetails} variant="body2" color="textSecondary">
                          <span className={classes.detailTitle}>{t('area')}</span>
                          <span>{value.square}㎡</span>
                        </Typography>
                        <Typography className={classes.productDetails} variant="body2" color="textSecondary">
                          <span className={classes.detailTitle}>{t('floor')}</span>
                          <span>{value.floor}</span>
                        </Typography>
                        <Typography className={classes.productDetails} variant="body2" color="textSecondary">
                          <span className={classes.detailTitle}>{t('price')}</span>
                          <span>¥{value.price}</span>
                        </Typography>
                        <Typography className={classes.productDetails} variant="body2" color="textSecondary">
                          <span className={classes.detailTitle}>{t('house_type')}</span>
                          <span>{t(value.houseType)}</span>
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
      <div style={{ margin: '50px 0 75px 0', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          defaultCurrent={6}
          total={totalPage}
          onChange={handlePageChange}
          hideOnSinglePage
        />
      </div>
      <ProductFilter
        visible={isFilterOpen}
        onFilterClose={onFilterClose}
        handleFilter={handleFilter}
      />
    </React.Fragment>
  );
};

ProductPage.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(ProductPage);

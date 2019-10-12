import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { withI18n, translate } from 'react-i18next';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Pagination, Modal } from 'antd';

import ProductFilter from '../components/ProductFilterForm';

import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';


import product from '../static/images/product/product.png';

const ProductPage = (props) => {
  const themes = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [isFilterOpen, setFilterOpen] = useState(false);

  function handlePageChange(page, pageSize) {
    console.log(page);
  }

  function openFilterModal() {
    setFilterOpen(true);
  }

  function onFilterClose() {
    setFilterOpen(false);
  }

  function handleFilter(states) {
    console.log('filtering...', states);
    onFilterClose();
  }
  const matches = useMediaQuery('(min-width:613px)');
  const useStyles = makeStyles(theme => ({
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
    }
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
      <Divider variant="middle" className={classes.divider} />

      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={6} style={{ width: '85%', display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
            {[0, 1, 2, 3, 4, 5].map(value => (
              <Link key={value} to="/productdetail" className={classes.linkDecoration}>
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
                        <Typography variant="body2" color="textSecondary" component="p">
                          2 寝室
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          ¥1,280
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
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
      <div style={{ margin: '50px 0 75px 0', display: 'flex', justifyContent: 'center' }}>
        <Pagination
          defaultCurrent={6}
          total={500}
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

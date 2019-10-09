import React from 'react';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import { Link } from 'react-router-dom';

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import MobileStepper from '@material-ui/core/MobileStepper';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import product from '../static/images/product/product.png';

const ProductPage = (props) => {
  const themes = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }
  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 1100,
      marginTop: '20%',
      flexGrow: 0.5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pagination: {
      position: 'absolute',
      bottom: '-27%',
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
    headerMenu: {
      marginRight: '40px',
      fontSize: '15px',
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
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={6}>
            {[0, 1, 2, 3, 4, 5].map(value => (
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
        <MobileStepper
          variant="dots"
          steps={6}
          position="static"
          activeStep={activeStep}
          className={classes.pagination}
          nextButton={(
            <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
              Next
              {themes.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          )}
          backButton={(
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {themes.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          )}
        />
      </Grid>
    </React.Fragment>
  );
};

ProductPage.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(ProductPage);

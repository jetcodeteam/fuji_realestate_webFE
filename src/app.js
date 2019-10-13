import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import './i18n';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RootProvider } from './store';
import PrivateRoute from './components/PrivateRoute';

import './assets/app.css';

const MasterLayout = lazy(() => import('./layouts/masterLayout'));
const Home = lazy(() => import('./containers/Home'));
const Product = lazy(() => import('./containers/Product'));
const Contact = lazy(() => import('./containers/Contact'));
const ProductDetail = lazy(() => import('./containers/ProductDetail'));
const News = lazy(() => import('./containers/News'));
const NewsDetail = lazy(() => import('./containers/NewsDetail'));
const AdminEmails = lazy(() => import('./containers/AdminEmails'));
const AdminProducts = lazy(() => import('./containers/AdminProducts'));
const LoginPage = lazy(() => import('./containers/LoginPage'));

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
  suspense: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '500px',
  },
}));

const PublicRoute = ({ component: Component, ...rest }) => {
  const classes = useStyles();

  return (
    <Route
      {...rest}
      render={props => (
        <MasterLayout>
          <Suspense fallback={(
            <div className={classes.suspense}>
              <CircularProgress className={classes.progress} />
            </div>
          )}
          >
            <Component {...props} />
          </Suspense>
        </MasterLayout>
      )}
    />
  );
};

const App = () => {
  const classes = useStyles();
  return (
    <RootProvider>
      <Suspense
        fallback={(
          <div className={classes.suspense}>
            <CircularProgress className={classes.progress} />
          </div>
        )}
      >
        <BrowserRouter>
          <Switch>
            <PublicRoute exact path="/home" component={Home} />
            <PublicRoute exact path="/products" component={Product} />
            <PublicRoute exact path="/productdetail" component={ProductDetail} />
            <PublicRoute exact path="/news" component={News} />
            <PublicRoute exact path="/newsdetail" component={NewsDetail} />
            <PublicRoute exact path="/contact" component={Contact} />
            <Route exact path="/admin" component={LoginPage} />
            <PrivateRoute exact path="/emails" component={AdminEmails} />
            {/* <PrivateRoute exact path="/admin/news" component={} /> */}
            <PrivateRoute exact path="/products" component={AdminProducts} />
            <Redirect to="/home" />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </RootProvider>
  );
};

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]).isRequired,
};


export default App;

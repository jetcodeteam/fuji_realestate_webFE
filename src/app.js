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
const AdminNews = lazy(() => import('./containers/AdminNews'));
const AdminNewsForm = lazy(() => import('./containers/AdminNewsForm'));
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
            <Route
              exact
              path="/"
              render={() => (<Redirect to="/home" />)}
             /> 
            <PublicRoute path="/home" component={Home} />
            <PublicRoute path="/products" component={Product} />
            <PublicRoute path="/productdetail" component={ProductDetail} />
            <PublicRoute path="/news" component={News} />
            <PublicRoute path="/newsdetail" component={NewsDetail} />
            <PublicRoute path="/contact" component={Contact} />
            {/* <Route exact path="/admin" component={LoginPage} /> */}
            <Route
              path="/admin"
              render={({ match: { url } }) => (
                <>
                  <Route path={`${url}/`} component={LoginPage} exact />
                  <PrivateRoute path={`${url}/emails`} component={AdminEmails} />
                  <PrivateRoute path={`${url}/products`} component={AdminProducts} />
                  <PrivateRoute exact path={`${url}/news`} component={AdminNews} />
                  <PrivateRoute path={`${url}/news/:news_id`} component={AdminNewsForm} />
                </>
              )}
            />
            {/* <PrivateRoute exact path="/emails" component={AdminEmails} /> */}
            {/* <PrivateRoute exact path="/admin/news" component={} /> */}
            {/* <PrivateRoute exact path="/products" component={AdminProducts} /> */}
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

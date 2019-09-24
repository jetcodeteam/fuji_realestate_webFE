import React, { Suspense, lazy } from 'react';
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

// const MasterLayout = lazy(() => import('./layouts/masterLayout'));
const Home = lazy(() => import('./containers/Home'));
const Product = lazy(() => import('./containers/Product'));
const News = lazy(() => import('./containers/News'));
const AdminEmails = lazy(() => import('./containers/AdminEmails'));
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
          {/* <MasterLayout> */}
          <Switch>

            <Route exact path="/" component={Home} />
            <Route exact path="/product" component={Product} />
            <Route exact path="/news" component={News} />
            <Route exact path="/admin" component={LoginPage} />
            <PrivateRoute exact path="/emails" component={AdminEmails} />
            {/* <PrivateRoute exact path="/admin/news" component={} /> */}
            {/* <PrivateRoute exact path="/admin/products" component={} /> */}
            <Redirect to="/" />
          </Switch>
          {/* </MasterLayout> */}
        </BrowserRouter>
      </Suspense>
    </RootProvider>
  );
};
export default App;

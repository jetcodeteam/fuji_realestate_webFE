import React, { Suspense, lazy } from 'react';
import './i18n';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RootProvider } from './store';

const MasterLayout = lazy(() => import('./layouts/masterLayout'));
const Home = lazy(() => import('./containers/Home'));
const Product = lazy(() => import('./containers/Product'));
const News = lazy(() => import('./containers/News'));
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
        <MasterLayout>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/product" component={Product} />
              <Route exact path="/news" component={News} />
            </Switch>
          </BrowserRouter>
        </MasterLayout>
      </Suspense>
    </RootProvider>
  );
};
export default App;

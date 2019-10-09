import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import AdminLayout from '../layouts/adminLayout';
import { getAccessToken } from '../services/TokenServices';
import { isEmpty } from '../utils/index';

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

function PrivateRoute({ component: Component, ...rest }) {
  const classes = useStyles();

  return (
    <Route
      {...rest}
      render={props => (!isEmpty(getAccessToken()) ? (
        <AdminLayout>
          <Suspense fallback={(
            <div className={classes.suspense}>
              <CircularProgress className={classes.progress} />
            </div>
          )}
          >
            <Component {...props} />
          </Suspense>
        </AdminLayout>
      ) : (
        <Redirect
          to={{
            pathname: '/admin',
            state: { from: props.location },
          }}
        />
      ))
        }
    />
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]).isRequired,
  location: PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.string]),
};

PrivateRoute.defaultProps = {
  location: null,
};

export default PrivateRoute;

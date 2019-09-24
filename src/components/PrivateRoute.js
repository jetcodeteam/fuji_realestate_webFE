import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
} from 'react-router-dom';

import AdminLayout from '../layouts/adminLayout';
import { getAccessToken } from '../services/TokenServices';
import { isEmpty } from '../utils/index';

function PrivateRoute({ component: Component, ...rest }) {
  console.log(getAccessToken());
  return (
    <Route
      {...rest}
      render={props => (!isEmpty(getAccessToken()) ? (
        <AdminLayout>
          <Suspense fallback={<div>Loading...</div>}>
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

import React from 'react';
import PropTypes from 'prop-types';

const PrivateRoute = (props) => {
  const { children } = props;

  return (
    <div>
      {children}
    </div>
  );
};


PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;

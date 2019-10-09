import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  spinner: {
    marginRight: 5,
    color: 'white',
  },
};

const SpinnerAdornment = withStyles(styles)(props => (
  <CircularProgress
    className={props.classes.spinner}
    size={20}
  />
));

const AdornedButton = (props) => {
  const {
    children,
    loading,
    ...rest
  } = props;

  return (
    <Button {...rest} disabled={loading}>
      {loading && <SpinnerAdornment {...rest} color="white" />}
      {children}
    </Button>
  );
};

AdornedButton.propTypes = {
  children: PropTypes.node.isRequired,
  loading: PropTypes.bool,
};

AdornedButton.defaultProps = {
  loading: false,
};

export default AdornedButton;

import React, { useContext, useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';

import { RootContext } from '../store';


const TranslateButton = (props) => {
  const { i18n, className } = props;

  const { state, dispatch } = useContext(RootContext);

  useEffect(() => {
    console.log(i18n);
    if (state.currentLanguage === i18n.language) {
      dispatch({ type: 'changeLanguage' });
    }
  }, []);

  const changeLanguage = () => {
    i18n.changeLanguage(state.currentLanguage);
    dispatch({ type: 'changeLanguage' });
  };

  return (
    <IconButton
      color="primary"
      size="small"
      className={className}
      aria-label="change language"
      onClick={() => changeLanguage()}
    >
      {state.currentLanguage}
    </IconButton>
  );
};

TranslateButton.propTypes = {
  i18n: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  className: PropTypes.string.isRequired,
};

export default withNamespaces()(TranslateButton);

import React, { useContext, useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import Fab from '@material-ui/core/Fab';
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
    <Fab className={className} color="primary" aria-label="change language" onClick={() => changeLanguage()}>
      {state.currentLanguage}
    </Fab>
  );
};

TranslateButton.propTypes = {
  i18n: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  className: PropTypes.string.isRequired,
};

export default withNamespaces()(TranslateButton);

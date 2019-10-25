import React, { useContext, useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import { RootContext } from '../store';
import jpFlag from '../static/flag/japan.png';
import usFlag from '../static/flag/us.png';

const TranslateButton = (props) => {
  const { t, i18n, className } = props;
  const { state, dispatch } = useContext(RootContext);
  const flag = {
    "jp": jpFlag,
    "en": usFlag
  }

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
    <div
      className={className}
      onClick={() => changeLanguage()}
      style={{ cursor: 'pointer', margin: '15px 5vw 0 0', display: 'flex', alignItems: 'center', zIndex: 10 }}
    >
      <span style={{ fontSize: '1em', marginRight: '15px' }}>{t(state.currentLanguage)}</span>
      <img src={flag[state.currentLanguage]} alt={state.currentLanguage} width="50" height="50" />
    </div>
  );
};

TranslateButton.propTypes = {
  i18n: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  className: PropTypes.string.isRequired,
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withNamespaces()(TranslateButton);

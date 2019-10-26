import React, { useContext, useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';

import { RootContext } from '../store';
import jpFlag from '../static/flag/japan.png';
import usFlag from '../static/flag/us.png';

const TranslateButton = (props) => {
  const { t, i18n, className, mobileMode } = props;
  const { state, dispatch } = useContext(RootContext);
  const flag = {
    "jp": usFlag,
    "en": jpFlag
  }
  const lang = {
    "jp": "English",
    "en": "日本語"
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
    window.location.reload(true)
  };

  return (
    <div
      className={className}
      onClick={() => changeLanguage()}
      style={{ cursor: 'pointer', margin: '0 5vw 0 0', display: 'flex', alignItems: 'center', zIndex: 10 }}
    >
      <img src={flag[state.currentLanguage]} alt={state.currentLanguage} style={{ marginRight: mobileMode ? '7vw' : '15px' }} width="25vw" height="25vw" />
      <span style={{ fontSize: '1em' }}>{lang[state.currentLanguage]}</span>
    </div>
  );
};

TranslateButton.propTypes = {
  i18n: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  className: PropTypes.string.isRequired,
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withNamespaces()(TranslateButton);

import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import initialState from './initialState';

const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 };
    case 'decrement':
      return { ...state, count: state.count - 1 };
    case 'showHeader':
      return { ...state, shouldHeaderShow: true };
    case 'changeLanguage':
      return { ...state, currentLanguage: state.currentLanguage === 'jp' ? 'en' : 'jp' };
    default:
      return { ...state, count: state.count };
  }
};

const RootContext = React.createContext(initialState);

function RootProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { children } = props;
  return (
    <RootContext.Provider value={{ state, dispatch }}>
      {children}
    </RootContext.Provider>
  );
}

RootProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { RootContext, RootProvider };

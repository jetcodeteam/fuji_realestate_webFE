import React from 'react';
import PropTypes from 'prop-types';


const MenuHolder = (props) => {
  const { children } = props;
  const style = {
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
    paddingRight: '13px',
    backgroundColor: '#ffffff',
    borderBottom: '1px solid #EBEFF2',
  };

  return (
    <div style={style}>
      {children}
    </div>
  );
};

MenuHolder.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MenuHolder;

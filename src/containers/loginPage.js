import React,
{
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import anime from 'animejs';
import PropTypes from 'prop-types';
import { withI18n } from 'react-i18next';
import Button from '@material-ui/core/Button';

import { RootContext } from '../store';

const LoginPage = (props) => {
  const { t } = props;

  const { state, dispatch } = useContext(RootContext);
  const [errorState, setErrorState] = useState(null);

  const helloWorldHeader = useRef();
  const counterRef = useRef();

  useEffect(() => {
    if (state.shouldHeaderShow) {
      const tl = anime.timeline({
        easing: 'easeOutExpo',
      });

      tl.add({
        targets: helloWorldHeader.current,
        top: '20%',
        opacity: 1,
        duration: 1000,
      });

      tl.add({
        targets: counterRef.current,
        opacity: 1,
        duration: 250,
      });
    }
  }, [state.shouldHeaderShow]);

  const handleCount = (sign) => {
    if (sign === 'minus') {
      if (state.count === 0) {
        setErrorState('Cannot go below 0!');
      } else {
        dispatch({ type: 'decrement' });
      }
    } else if (sign === 'plus') {
      dispatch({ type: 'increment' });
      if (errorState) {
        setErrorState(null);
      }
    }
  };

  return (
    <React.Fragment>
      <h1
        ref={helloWorldHeader}
        style={{
          position: 'absolute',
          top: '40%',
          left: '12%',
          opacity: 0,
        }}
      >
        {t('hello_world')}
        ,
      </h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          lineHeight: '25px',
          opacity: 0,
        }}
        ref={counterRef}
      >
        <h1 style={{ fontSize: '30px', marginBottom: '30px' }}>
          Little Counter
        </h1>
        <div style={{ display: 'flex', width: '150px', justifyContent: 'space-between' }}>
          <Button
            style={{
              maxWidth: '30px',
              maxHeight: '30px',
              minWidth: '30px',
              minHeight: '30px',
              lineHeight: '10px',
            }}
            variant="contained"
            color="primary"
            onClick={() => handleCount('minus')}
          >
            -
          </Button>
          {state.count}
          <Button
            style={{
              maxWidth: '30px',
              maxHeight: '30px',
              minWidth: '30px',
              minHeight: '30px',
              lineHeight: '10px',
            }}
            variant="contained"
            color="secondary"
            onClick={() => handleCount('plus')}
          >
            +
          </Button>
        </div>
        <div>
          {errorState}
        </div>
      </div>
    </React.Fragment>
  );
};

LoginPage.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withI18n()(LoginPage);

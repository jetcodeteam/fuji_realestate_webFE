import React,
{
  useContext,
  useRef,
  createRef,
  useEffect,
} from 'react';
import anime from 'animejs';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TranslateButton from '../components/translateButton';

import { RootContext } from '../store';

const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    color: 'white',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
    padding: '0',
  },
  grid: {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: 0,
  },
  gridChild: {
    height: '100vh',
    transition: 'background-color 1s',
  },
  childrenContainer: {
    zIndex: 1,
    height: '100vh',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  translateButton: {
    position: 'absolute',
    bottom: '5%',
    right: '3%',
  },
};

const MasterLayout = (props) => {
  const { children, classes } = props;

  const { dispatch } = useContext(RootContext);
  const elRef = useRef([...Array(12)].map(() => createRef()));

  useEffect(() => {
    setTimeout(() => {
      const tl = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000,
        complete: () => {
          dispatch({ type: 'showHeader' });
        },
      });

      tl.add({
        targets: elRef.current.map(el => el.current),
        backgroundColor: 'rgb(197, 197, 255)',
        delay: anime.stagger(200),
      });

      tl.add({
        targets: elRef.current.map(el => el.current),
        opacity: 0.2,
      });
    }, 500);
  }, []);

  return (
    <Container className={classes.root} maxWidth="xl">
      <Grid className={classes.grid} container>
        {elRef.current.map(element => (
          <Grid className={classes.gridChild} ref={element} item xs={1} />
        ))}
      </Grid>
      <Container className={classes.childrenContainer} maxWidth="xl">
        {children}
        <TranslateButton className={classes.translateButton} />
      </Container>
    </Container>
  );
};

MasterLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  classes: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withStyles(styles)(MasterLayout);

import React,
{
  useRef,
  useState,
  useEffect,
} from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const PageHeader = (props) => {
  function displayLine(pageName) {
    let displayed;
    if (window.location.href.includes(pageName)) {
      displayed = true;
    } else {
      displayed = false;
    }

    return displayed;
  }

  function useHover() {
    const ref = useRef(null);
    const [hovered, setHovered] = useState(false);

    const enter = () => setHovered(true);
    const leave = () => setHovered(false);

    useEffect(() => {
      ref.current.addEventListener('mouseenter', enter);
      ref.current.addEventListener('mouseleave', leave);
      return () => {
        ref.current.removeEventListener('mouseenter', enter);
        ref.current.removeEventListener('mouseleave', leave);
      };
    }, [ref.current]);

    return [ref, hovered];
  }
  const Header = useRef();
  const [homeRef, homeHovered] = useHover();
  const [productRef, productHovered] = useHover();
  const [newsRef, newsHovered] = useHover();
  const [contactRef, contactHovered] = useHover();

  const homeLine = displayLine('home') || homeHovered;
  const productLine = displayLine('product') || productHovered;
  const newsLine = displayLine('news') || newsHovered;
  const contactLine = displayLine('contact') || contactHovered;
  const { t } = props;
  const useStyles = makeStyles({
    pageHeader: {
      display: 'flex',
      flexDirection: 'row',
      height: '64px',
      alignItems: 'center',
      fontFamily: 'Roboto',
      backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    companyLogo: {
      marginRight: '40px',
      fontWeight: '900',
      fontSize: '1.5em',
      marginLeft: '8%',
    },
    headerMenu: {
      marginRight: '40px',
      fontSize: '15px',
    },
    line: {
      width: 'inherit',
      height: '3px',
      backgroundColor: 'rgb(105, 192, 255)',
    },
    linkDecoration: {
      color: 'inherit',
      textDecoration: 'none',
    },
  });
  const classes = useStyles();

  return (
    <header ref={Header} className={classes.pageHeader}>
      <Button style={{ backgroundColor: 'transparent' }} component={Link} to="/home">
        <div className={classes.companyLogo}>FUJIWARA</div>
      </Button>
      <div className={classes.headerMenu} ref={homeRef}>
        <Link to="/home" className={classes.linkDecoration}>
          {t('home')}
        </Link>
        {homeLine && <div className={classes.line} />}
      </div>
      <div className={classes.headerMenu} ref={productRef}>
        <Link to="/product" className={classes.linkDecoration}>
          {t('product')}
        </Link>
        {productLine && <div className={classes.line} />}
      </div>
      <div className={classes.headerMenu} ref={newsRef}>
        <Link to="/news" className={classes.linkDecoration}>
          {t('news')}
        </Link>
        {newsLine && <div className={classes.line} />}
      </div>
      <div className={classes.headerMenu} ref={contactRef}>
        <Link to="/contact" className={classes.linkDecoration}>
          {t('contact_us')}
        </Link>
        {contactLine && <div className={classes.line} />}
      </div>
    </header>
  );
};

PageHeader.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withNamespaces()(PageHeader);

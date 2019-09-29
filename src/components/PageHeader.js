import React,
{
  useRef,
  useState,
  useEffect,
} from 'react';
import { withNamespaces } from 'react-i18next';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

const PageHeader = (props) => {
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
  const [productRef, productHovered] = useHover();
  const [newsRef, newsHovered] = useHover();
  const [contactRef, contactHovered] = useHover();
  const { t } = props;
  const useStyles = makeStyles({
    pageHeader: {
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      top: '2.5%',
      left: '3%',
      fontFamily: 'Roboto',
    },
    companyLogo: {
      marginRight: '40px',
      fontWeight: '900',
      fontSize: '15px',
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
      <div className={classes.companyLogo}>FUJIWARA</div>
      <div className={classes.headerMenu}>
        <Link to="/" className={classes.linkDecoration}>
          {t('home')}
        </Link>
        <div className={classes.line} />
      </div>
      <div className={classes.headerMenu} ref={productRef}>
        <Link to="/product" className={classes.linkDecoration}>
          {t('product')}
        </Link>
        {productHovered && <div className={classes.line} />}
      </div>
      <div className={classes.headerMenu} ref={newsRef}>
        <Link to="/news" className={classes.linkDecoration}>
          {t('news')}
        </Link>
        {newsHovered && <div className={classes.line} />}
      </div>
      <div className={classes.headerMenu} ref={contactRef}>
        <Link to="/" className={classes.linkDecoration}>
          {t('contact_us')}
        </Link>
        {contactHovered && <div className={classes.line} />}
      </div>
    </header>
  );
};

PageHeader.propTypes = {
  t: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
};

export default withNamespaces()(PageHeader);

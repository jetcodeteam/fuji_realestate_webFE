import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withI18n, translate } from 'react-i18next';

import { Link } from "react-router-dom";

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import HomeIcon from '@material-ui/icons/Home';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import SubtitlesIcon from '@material-ui/icons/Subtitles';
import BookIcon from '@material-ui/icons/Book';

import menuBackground from '../static/images/menu.png';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '56px',
    alignItems: 'center',
    fontFamily: 'Roboto',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    justifyContent: 'space-between',
  },
  brand: {
    fontWeight: 700,
    fontSize: '35px',
    paddingTop: '20px',
    paddingRight: '20px',
  },
  menuBg: {
    background: `url(${menuBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: '150px',
    paddingLeft: '20px',
    fontSize: '50px',
  },
  list: {
    width: 250
  },
  drawerBrand: {
    height: 75,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5em',
    fontWeight: 700
  }
}));

const MobileHeader = (props) => {
    const { t } = props;
    const classes = useStyles();
    const [state, setState] = useState({
      left: false,
    });
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const toggleDrawer = (side, open) => event => {
      if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }

      setState({ ...state, [side]: open });
    };
    
    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
        <List>
          <ListItem button component={Link} to="/home">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={t('home_menu')} />
          </ListItem>
          <ListItem button component={Link} to="/products">
            <ListItemIcon><SubtitlesIcon /></ListItemIcon>
            <ListItemText primary={t('product_menu')} />
          </ListItem>
          <ListItem button component={Link} to="/news">
            <ListItemIcon><BookIcon /></ListItemIcon>
            <ListItemText primary={t('news_menu')} />
          </ListItem>
          <ListItem button component={Link} to="/contact">
            <ListItemIcon><ContactSupportIcon /></ListItemIcon>
            <ListItemText primary={t('contact_us_menu')} />
          </ListItem>
        </List>
      </div>
    );

    return (
      <React.Fragment>
        <div className={classes.root}>
          <div className={classes.menuBg}>
            <IconButton 
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer('left', true)}
            >
              <MenuIcon style={{ width: 35, height: 35 }} />
            </IconButton>
          </div>
          
          <Button style={{ backgroundColor: 'transparent' }} component={Link} to="/home">
            <div className={classes.brand}>
              FUJIWARA
            </div>
          </Button>
          
        </div>
        <SwipeableDrawer
          disableBackdropTransition={!iOS}
          disableDiscovery={iOS}
          className={classes.drawerMenu}
          open={state.left}
          onClose={toggleDrawer('left', false)}
          onOpen={toggleDrawer('left', true)}
        >
          <div className={classes.drawerBrand}>
            FUJIWARA
          </div>
          <Divider />
          {sideList('left')}
        </SwipeableDrawer>
      </React.Fragment>
    );
}

export default withI18n()(MobileHeader);

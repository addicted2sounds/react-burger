import React from 'react';

import classes from './Toolbar.module.css';
import Logo from './Logo/Logo';
import NavigationItems from '../Items/Items';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div onClick={props.openSideDrawer} className={classes.SideDrawerBtn}>Menu</div>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;

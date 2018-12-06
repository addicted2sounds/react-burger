import React from 'react';

import classes from './Item.module.css';

import { NavLink } from 'react-router-dom';

const item = (props) => (
  <li className={classes.Item}>
    <NavLink
      exact={props.exact}
      to={props.href}
      activeClassName={classes.active}>
      {props.children}
    </NavLink>
  </li>
)

export default item;

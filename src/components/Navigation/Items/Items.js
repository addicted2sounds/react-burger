import React from 'react';

import Item from './Item/Item';
import classes from './Items.module.css';

const items = () => (
  <ul className={classes.Items}>
    <Item href="/" exact>Burger Builder</Item>
    <Item href="/orders">Orders</Item>
  </ul>
);

export default items;

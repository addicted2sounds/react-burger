import React from 'react';

import Item from './Item/Item';
import classes from './Items.module.css';

const items = () => (
  <ul className={classes.Items}>
    <Item href="/" active>Burger Builder</Item>
    <Item href="/">Checkout</Item>
  </ul>
);

export default items;

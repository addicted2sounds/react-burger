import React from 'react';

import classes from './Order.module.css';

const order = (props) => {
  return (
    <div className={classes.Order}>
      <p>Ingredients: </p>
      <p>Price: <strong>{props.price}</strong></p>
    </div>
  );
}

export default order;

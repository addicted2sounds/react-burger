import React from 'react';

import Control from './Control/Control';
import classes from './Controls.module.css';

const ctrls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];
const controls = (props) => (
  <div className={classes.Controls}>
    <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
    {ctrls.map((control) => (
      <Control
        key={control.type}
        added={() => props.ingredientAdded(control.type)}
        removed={() => props.ingredientRemoved(control.type)}
        disabled={props.disabled[control.type]}
        label={control.label} />
    ))}
    <button className={classes.OrderButton}
            onClick={props.ordered}
            disabled={!props.purchaseable}>Check Out</button>
  </div>
)

export default controls;

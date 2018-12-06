import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';

const checkoutSummary = (props) => (
  <div className={classes.CheckoutSummary}>
    <h1>Your satiation will be full soon</h1>
    <div className={classes.Ingredients}>
      <Burger ingredients={props.ingredients}/>
    </div>
    <Button
      type="Danger"
      clicked={props.checkoutCancelled}>CANCEL</Button>
    <Button
      type="Success"
      clicked={props.checkoutContinued}>Continue</Button>
  </div>
);

export default checkoutSummary;

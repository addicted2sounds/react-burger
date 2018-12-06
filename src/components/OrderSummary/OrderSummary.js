import React from 'react';

import Aux from '../../hoc/Aux';
import Spinner from '../UI/Spinner/Spinner';
import Button from '../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map((ingredient) => (
      <li key={ingredient}><span>{ingredient}</span>: {props.ingredients[ingredient]}</li>
    ));
  let buttons = <div>
    <Button type="Danger" clicked={props.cancel}>Cancel</Button>
    <Button type="Success" clicked={props.continue}>Continue</Button>
  </div>;
  if (props.loading) buttons = <Spinner />;
  return (
    <Aux>
      <h3>Your order:</h3>
      <p>Ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
      <p>Continue to checkout</p>
      {buttons}
    </Aux>
  );
}

export default orderSummary;

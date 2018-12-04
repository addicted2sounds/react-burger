import React from 'react';

import classes from './Burger.module.css';
import Ingredient from './Ingredient/Ingredient';

const burger = (props) => {
  let transformedIngedients = Object.keys(props.ingredients)
    .map(ingredient => {
      return [...Array(props.ingredients[ingredient])].map((_, i) => (
        <Ingredient key={ingredient + i} type={ingredient} />
      ));
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformedIngedients.length === 0) {
    transformedIngedients = <p>Please, start adding ingredients</p>;
  }
  return (
    <div className={classes.Burger}>
      <Ingredient type="bread-top"/>
      {transformedIngedients}
      <Ingredient type="bread-bottom"/>
    </div>
  )
}

export default burger;

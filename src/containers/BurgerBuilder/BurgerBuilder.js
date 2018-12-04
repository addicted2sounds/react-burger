import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';

const INGEDIENT_PRICES = {
      salad: 0.5,
      bacon: 0.7,
      cheese: 0.4,
      meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    purchaseable: false,
    purchasing: false,
    totalPrice: 4
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    alert("Continue");
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((a,b) => a + b);
    this.setState({purchaseable: sum > 0});
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const ingredients = { ...this.state.ingredients, [type]: oldCount + 1 }
    const price = this.state.totalPrice + INGEDIENT_PRICES[type];
    this.setState({
      ingredients,
      totalPrice: price
    });
    this.updatePurchaseState(ingredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const ingredients = { ...this.state.ingredients, [type]: oldCount - 1 }
    const price = this.state.totalPrice - INGEDIENT_PRICES[type];
    this.setState({
      ingredients,
      totalPrice: price
    });
    this.updatePurchaseState(ingredients);
  }

  render() {
    const disabledInfo = { ...this.state.ingredients}
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            cancel={this.purchaseCancelHandler}
            continue={this.purchaseContinueHandler} />
        </Modal>
        <Burger
          ingredients={this.state.ingredients} />
        <Controls
          price={this.state.totalPrice}
          disabled={disabledInfo}
          purchaseable={this.state.purchaseable}
          ingredientAdded={this.addIngredientHandler}
          ordered={this.purchaseHandler}
          ingredientRemoved={this.removeIngredientHandler} />
      </Aux>
    );
  }
}

export default BurgerBuilder;

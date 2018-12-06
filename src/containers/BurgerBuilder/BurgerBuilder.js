import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';

const INGEDIENT_PRICES = {
      salad: 0.5,
      bacon: 0.7,
      cheese: 0.4,
      meat: 1.3
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    purchaseable: false,
    purchasing: false,
    totalPrice: 4,
    loading: false,
    error: false
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: 'Anonymous',
        address: '123 Lane street'
      }
    }
    axios.post('/orders.json', order)
      .then(response => this.setState({ loading: false, purchasing: false }))
      .catch(error => console.log(error));
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

  componentDidMount() {
    axios.get('/ingredients.json')
      .then((resp) => {
        this.setState({ ingredients: resp.data });
      }).catch(error => {
        this.setState({ error: true });
      });
  }

  render() {
    const disabledInfo = { ...this.state.ingredients}
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (this.state.ingredients) {
      burger = (
        <Aux>
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
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          { this.state.ingredients &&
            <OrderSummary ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              cancel={this.purchaseCancelHandler}
              continue={this.purchaseContinueHandler}
              loading={this.state.loading}/>
          }
        </Modal>
        { burger }
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);

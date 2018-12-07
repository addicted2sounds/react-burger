import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import Controls from '../../components/Burger/Controls/Controls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  isPurchaseable = (ingredients) => {
    const sum = Object.values(ingredients).reduce((a,b) => a + b);
    return sum > 0;
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
    const disabledInfo = { ...this.props.ingredients}
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />
    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger
            ingredients={this.props.ingredients} />
          <Controls
            price={this.props.totalPrice}
            disabled={disabledInfo}
            purchaseable={this.isPurchaseable(this.props.ingredients)}
            ingredientAdded={this.props.onIngredientAdded}
            ordered={this.purchaseHandler}
            ingredientRemoved={this.props.onIngredientRemoved} />
        </Aux>
      );
    }
    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          { this.state.ingredients &&
            <OrderSummary ingredients={this.state.ingredients}
              price={this.props.totalPrice}
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

const mapDispatchToProps = dispatch => (
  {
    onIngredientAdded: ingredient => dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredient
    }),
    onIngredientRemoved: ingredient => dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredient
    })
  }
);

const mapStateToProps = state => (
  {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

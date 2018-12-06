import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 1,
      meat: 1,
      bacon: 1
    }
  }

  onCheckoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  onCheckoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCancelled={this.onCheckoutCancelledHandler}
          checkoutContinued={this.onCheckoutContinuedHandler}
          ingredients={this.state.ingredients} />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData} />
      </div>
    );
  }
}

export default Checkout;

import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
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
          ingredients={this.props.ingredients} />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData} />
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
)

export default connect(mapStateToProps)(Checkout);

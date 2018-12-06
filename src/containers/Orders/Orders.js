import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }

  componentDidMount() {
    axios.get('/orders.json')
      .then(response => {
        const orders = [];
        for(let key in response.data) {
          orders.push({
            ...response.data[key],
            id: key
          });
        }
        this.setState({ orders: orders, loading: false });
      }).catch(e => this.setState({ loading: false }))
  }

  render() {
    let orders = <Spinner />;
    if (!this.state.loading) {
      if (this.state.orders.size > 0) {
        orders = this.state.orders.map(order => (
          <Order {...order} key={order.id}/>
        ));
      } else {
        orders = <p>You never stepped with path of satiation</p>;
      }
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);

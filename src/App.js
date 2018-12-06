import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Layout from './components/Layout/Layout';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder} />
          <Route path="/orders" component={Orders}/>
          <Route path="/checkout" component={Checkout} />
        </Switch>
      </Layout>
    );
  }
}

export default App;

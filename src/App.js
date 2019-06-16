import React, { Component, Suspense } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Logout/Logout';
import * as actions from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';

//Lazy loading Components
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

class App extends Component {
  constructor(props) {
    super(props);
    props.onAuthCheckLocalStorage();
  };

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Route path='/auth' component={Auth} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          <Suspense fallback={<Spinner />}>
            {routes}
          </Suspense>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthCheckLocalStorage: () => dispatch(actions.authCheckLocalStorage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;

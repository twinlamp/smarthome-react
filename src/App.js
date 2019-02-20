import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Devices from './containers/Devices/Devices';
import NewDevice from './containers/NewDevice/NewDevice';
import Logout from './containers/Auth/Logout/Logout';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import * as actions from './store/actions/index';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: document.getElementById('jss-insertion-point'),
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Redirect to='/auth' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Layout>
          <Switch>
            <Route path='/devices/new' exact component={NewDevice} />
            <Route path='/devices' exact component={Devices} />
            <Route path='/logout' component={Logout} />
            <Redirect to='/devices' />
          </Switch>
        </Layout>
      );
    }

    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
        <React.Fragment>
          <CssBaseline />
          {routes}
        </React.Fragment>
      </JssProvider>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

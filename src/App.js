import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Devices from './containers/Devices/Devices';
import Device from './containers/Device/Device';
import NewDevice from './containers/NewDevice/NewDevice';
import EditDevice from './containers/EditDevice/EditDevice';
import EditSensor from './containers/EditSensor/EditSensor';
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
    this.props.onTryAutoSignup(this.props.location.pathname);
  }

  render() {
    let routes = null

    if (this.props.isAuthenticated) {
      routes = (
        <Layout>
          <Switch>
            <Route path='/devices/new' exact component={NewDevice} />
            <Route path='/devices' exact component={Devices} />
            <Route path='/devices/:id/edit' exact component={EditDevice} />
            <Route path='/devices/:id' exact component={Device} />
            <Route path='/sensors/:id/edit' exact component={EditSensor} />
            <Route path='/logout' exact component={Logout} />
            {this.props.location.state && this.props.location.state.from ? <Redirect from='/' to={this.props.location.state.from} /> : <Redirect from='/' to='/devices' /> }
          </Switch>
        </Layout>
      );
    } else {
      routes = (
        <Switch>
          <Route path='/auth' exact component={Auth} />
          <Redirect from='/' to={{pathname: '/auth', state: {from: this.props.location}}} />
        </Switch>
      )
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
    onTryAutoSignup: (url) => dispatch(actions.authCheckState(url))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

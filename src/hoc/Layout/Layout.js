import React, { Component } from 'react';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import { connect } from 'react-redux';
import classes from './Layout.module.css';

class Layout extends Component {

  render() {
    return <React.Fragment>
      <Navbar
        navActions={this.props.navActions}
        currentItem={this.props.currentItem}
        currentAction={this.props.currentAction}
      />
      <main className={classes.Main}>
        {this.props.children}
      </main>
    </React.Fragment>
  }
}

const mapStateToProps = state => {
  return {
    navActions: state.nav.navActions,
    currentItem: state.devices.currentDevice,
    currentAction: state.nav.currentAction,
    loading: state.auth.loading || state.devices.loading
  };
};

export default connect(mapStateToProps)(Layout);
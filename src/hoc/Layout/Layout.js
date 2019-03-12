import React, { Component } from 'react';
import Navbar from '../../components/Navigation/Navbar/Navbar';
import { connect } from 'react-redux';
import classes from './Layout.module.css';
import { getLoadingStatus } from '../../store/selectors';

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
    currentItem: state.nav.showCurrentItem ? state.nav.currentItem : null,
    currentAction: state.nav.currentAction,
    loading: getLoadingStatus(state)
  };
};

export default connect(mapStateToProps)(Layout);
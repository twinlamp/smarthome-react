import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class Devices extends Component {
  componentWillMount() {
    this.props.onSetNavActions(['AddDevice', 'Logout'])
    this.props.onGetDevices(this.props.token)
  }

  render() {
    return null
  }
}

const mapStateToProps = state => {
  return {
    devices: state.devices.devices,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetNavActions: (navActions) => dispatch(actions.setNavActions(navActions)),
    onGetDevices: (token) => dispatch(actions.getDevices(token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
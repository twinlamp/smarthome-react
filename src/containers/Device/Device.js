import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import * as navActions from '../../components/Navigation/Navbar/NavActions/navActionTypes'
import EndpointList from '../../components/EndpointList/EndpointList';

class Device extends Component {
  componentDidMount() {
    const { id } = this.props.match.params
    let actions = {}
    actions[navActions.BACK] = {url: '/devices'}
    actions[navActions.EDIT_DEVICE] = {id: id}
    actions[navActions.LOGOUT] = {}
    this.props.onSetNavActions(actions)
    this.props.onSetNavTitle('Device: ', true)
    this.props.onGetCurrentDevice(this.props.token, id)
  }

  render() {
    let endpoints = []
    if (this.props.currentDevice) {
      endpoints = [
        ...this.props.currentDevice.free_sensors.map((s) => { return { ...s, type: 'sensor' } }),
        ...this.props.currentDevice.relays.map((r) => { return { ...r, type: 'relay' } })
      ]
    }

    return <EndpointList items={endpoints} />
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    currentDevice: state.devices.currentDevice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetNavActions: (navActions) => dispatch(actions.setNavActions(navActions)),
    onGetCurrentDevice: (token, id) => dispatch(actions.getCurrentDevice(token, id)),
    onSetNavTitle: (currentAction, showCurrentItem) => dispatch(actions.setNavTitle(currentAction, showCurrentItem))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Device);
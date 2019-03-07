import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Typography from '@material-ui/core/Typography';
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

    return <React.Fragment>
      <Typography variant="h4" gutterBottom={true}>Device</Typography>
      <Typography variant="body1" gutterBottom={true}>{JSON.stringify(this.props.currentDevice)}</Typography>
      <EndpointList items={endpoints} />
    </React.Fragment>
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
    onGetCurrentDevice: (token, id) => dispatch(actions.getCurrentDevice(token, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Device);
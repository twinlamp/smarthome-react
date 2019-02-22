import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import DeviceList from '../../components/DeviceList/DeviceList';
import Typography from '@material-ui/core/Typography';
import * as navActions from '../../components/Navigation/Navbar/NavActions/navActionTypes';

class Devices extends Component {
  componentDidMount() {
    let actions = {}
    actions[navActions.ADD_DEVICE] = {}
    actions[navActions.LOGOUT] = {}
    this.props.onSetNavActions(actions)
    this.props.onGetDevices(this.props.token)
  }

  render() {
    let body = <Typography variant="body1" gutterBottom={true}>Please add new device</Typography>
    if (this.props.devices && this.props.devices.length !== 0) {
      body = <DeviceList items={this.props.devices || []} />
    }

    return <React.Fragment>
      <Typography variant="h4" gutterBottom={true}>Device List</Typography>
      {body}      
    </React.Fragment>
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
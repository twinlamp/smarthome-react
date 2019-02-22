import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import Typography from '@material-ui/core/Typography';
import * as navActions from '../../components/Navigation/Navbar/NavActions/navActionTypes'

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
    return <React.Fragment>
      <Typography variant="h4" gutterBottom={true}>Device</Typography>
      <Typography variant="body1" gutterBottom={true}>{JSON.stringify(this.props.currentDevice)}</Typography>
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
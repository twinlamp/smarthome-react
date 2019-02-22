import React, { Component } from 'react';
import DeviceForm from '../../components/DeviceForm/DeviceForm';
import Typography from '@material-ui/core/Typography';
import * as navActions from '../../components/Navigation/Navbar/NavActions/navActionTypes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class EditDevice extends Component {
  state = {
    id: this.props.match.params.id
  }

  componentDidMount() {
    let actions = {}
    actions[navActions.BACK] = {url: `/devices/${this.state.id}`}
    actions[navActions.LOGOUT] = {}
    this.props.onSetNavActions(actions)
    this.props.onGetCurrentDevice(this.props.token, this.state.id)
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error) {
      this.form.setErrors({name: error})
      this.form.setSubmitting(false)
    }
    if (!error && prevProps.loading && !this.props.loading && this.form.getFormikContext().isSubmitting) {
      this.props.history.push(`/devices/${this.state.id}`)
    }
  }

  onEditDevice = (model) => {
    this.props.onEditDevice(this.state.id, model.name, model.timezone, this.props.token)
  }

  initialValues = () => {
    let device = this.props.currentDevice.device
    if (device) {
      return {deviceId: device.id, name: device.name, timezone: device.timezone}
    } else {
      return { name: '', deviceId: '', timezone: '' }
    }
  }

  render() {
    return <React.Fragment>
      <Typography variant="h4" gutterBottom={true}>Edit Device</Typography>
      <DeviceForm onSave={this.onEditDevice} buttonText="Save" ref={el => (this.form = el)} initialValues={this.initialValues()} />
    </React.Fragment>
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    error: state.devices.error,
    loading: state.devices.loading,
    currentDevice: state.devices.currentDevice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetNavActions: (navActions) => dispatch(actions.setNavActions(navActions)),
    onEditDevice: (id, name, timezone, token) => dispatch(actions.editDevice(id, name, timezone, token)),
    onGetCurrentDevice: (token, id) => dispatch(actions.getCurrentDevice(token, id))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditDevice));
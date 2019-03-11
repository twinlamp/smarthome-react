import React, { Component } from 'react';
import DeviceForm from '../../components/DeviceForm/DeviceForm';
import * as navActions from '../../components/Navigation/Navbar/NavActions/navActionTypes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class EditDevice extends Component {
  state = {
    id: this.props.match.params.id
  }

  componentDidMount() {
    this.props.onDropCurrentDevice()
    let actions = {}
    actions[navActions.BACK] = {url: `/devices/${this.state.id}`}
    actions[navActions.LOGOUT] = {}
    this.props.onSetNavActions(actions)
    this.props.onSetCurrentAction('Edit Device: ')
    this.props.onGetCurrentDevice(this.props.token, this.state.id)
  }

  componentDidUpdate(prevProps) {
    const { errors } = this.props;
    if (errors) {
      this.form.setErrors(errors)
      this.form.setSubmitting(false)
    }
    if (!errors && prevProps.loading && !this.props.loading && this.form.getFormikContext().isSubmitting) {
      this.props.history.push(`/devices/${this.state.id}`)
    }
  }

  onEditDevice = (model) => {
    this.props.onEditDevice(this.state.id, model.name, model.timezone, this.props.token)
  }

  initialValues = () => {
    if (this.props.currentDevice) {
      return {name: this.props.currentDevice.name, timezone: this.props.currentDevice.timezone}
    } else {
      return { name: '', timezone: '' }
    }
  }

  render() {
    return <React.Fragment>
      <DeviceForm onSave={this.onEditDevice} buttonText="Save" ref={el => (this.form = el)} initialValues={this.initialValues()} />
    </React.Fragment>
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    errors: state.devices.errors,
    loading: state.devices.loading,
    currentDevice: state.devices.currentDevice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetNavActions: (navActions) => dispatch(actions.setNavActions(navActions)),
    onEditDevice: (id, name, timezone, token) => dispatch(actions.editDevice(id, name, timezone, token)),
    onGetCurrentDevice: (token, id) => dispatch(actions.getCurrentDevice(token, id)),
    onDropCurrentDevice: () => dispatch(actions.dropCurrentDevice()),
    onSetCurrentAction: (currentAction) => dispatch(actions.setCurrentAction(currentAction))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditDevice));
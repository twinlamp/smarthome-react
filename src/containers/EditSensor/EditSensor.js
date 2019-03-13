import React, { Component } from 'react';
import SensorForm from '../../components/SensorForm/SensorForm';
import * as navActions from '../../components/Navigation/Navbar/NavActions/navActionTypes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { getLoadingStatus, makeGetErrorMessages } from '../../store/selectors';

class EditSensor extends Component {
  state = {
    id: this.props.match.params.id
  }

  componentDidMount() {
    this.props.onSetNavTitle('Edit Sensor: ', true)
    this.props.onGetCurrentSensor(this.props.token, this.state.id)
  }

  componentDidUpdate(prevProps) {
    const { errors, currentSensor } = this.props;

    this.setNavigation(currentSensor)

    if (errors) {
      this.form.setErrors(errors)
      this.form.setSubmitting(false)
    }
    if (!errors && prevProps.loading && !this.props.loading && this.form.getFormikContext().isSubmitting) {
      this.props.history.push(`/devices/${currentSensor.device_id}`)
    }
  }

  setNavigation(currentSensor) {
    let actions = {}
    if (currentSensor) {
      actions[navActions.BACK] = {url: `/devices/${currentSensor.device_id}`}
    }
    actions[navActions.LOGOUT] = {}
    this.props.onSetNavActions(actions)
  }

  onEditSensor = (model) => {
    this.props.onEditSensor(this.state.id, model.name, model.icon, model.min, model.max, this.props.token)
  }

  initialValues = () => {
    if (this.props.currentSensor) {
      return {
        name: this.props.currentSensor.name,
        icon: this.props.currentSensor.icon,
        min: this.props.currentSensor.min,
        max: this.props.currentSensor.max
      }
    } else {
      return { name: '', icon: '', min: '', max: '' }
    }
  }

  render() {
    return <SensorForm onSave={this.onEditSensor} buttonText="Save" ref={el => (this.form = el)} initialValues={this.initialValues()} />
  }
}

const makeMapStateToProps = () => {
  const getErrorMessages = makeGetErrorMessages(['EDIT_SENSOR'])
  const mapStateToProps = state => {
    return {
      token: state.auth.token,
      errors: getErrorMessages(state),
      loading: getLoadingStatus(state),
      currentSensor: state.sensors.currentSensor
    };
  };
  return mapStateToProps
}

const mapDispatchToProps = dispatch => {
  return {
    onSetNavActions: (navActions) => dispatch(actions.setNavActions(navActions)),
    onEditSensor: (id, name, icon, min, max, token) => dispatch(actions.editSensor(id, name, icon, min, max, token)),
    onGetCurrentSensor: (token, id) => dispatch(actions.getCurrentSensor(token, id)),
    onSetNavTitle: (currentAction, showCurrentItem) => dispatch(actions.setNavTitle(currentAction, showCurrentItem))
  };
};

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(EditSensor));
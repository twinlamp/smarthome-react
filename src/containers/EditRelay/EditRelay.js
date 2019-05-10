import React, { Component } from 'react';
import RelayForm from '../../components/RelayForm/RelayForm';
import * as navActions from '../../components/Navigation/Navbar/NavActions/navActionTypes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { getLoadingStatus, makeGetErrorMessages } from '../../store/selectors';

class EditRelay extends Component {
  state = {
    id: this.props.match.params.id
  }

  componentDidMount() {
    this.props.onSetNavTitle('Edit Relay: ', true)
    this.props.onGetCurrentRelay(this.props.token, this.state.id)
  }

  componentDidUpdate(prevProps) {
    const { errors, currentRelay } = this.props;

    this.setNavigation(currentRelay)

    if (errors) {
      this.form.setErrors(errors)
      this.form.setSubmitting(false)
    }
    if (!errors && prevProps.loading && !this.props.loading && this.form.getFormikContext().isSubmitting) {
      this.props.history.push(`/devices/${currentRelay.device_id}`)
    }
  }

  setNavigation(currentRelay) {
    let actions = {}
    if (currentRelay) {
      actions[navActions.BACK] = {url: `/devices/${currentRelay.device_id}`}
    }
    actions[navActions.LOGOUT] = {}
    this.props.onSetNavActions(actions)
  }

  onEditRelay = (model) => {
    this.props.onEditRelay(this.state.id, model.name, model.icon, model.state, model.sensor_id, model.task, this.props.token)
  }

  initialValues = () => {
    if (this.props.currentRelay) {
      return {
        name: this.props.currentRelay.name,
        icon: this.props.currentRelay.icon,
        state: this.props.currentRelay.state,
        sensor_id: this.props.currentRelay.sensor_id,
        task: this.props.currentRelay.task
      }
    } else {
      return { name: '', icon: '', state: '', sensor_id: '', task: {} }
    }
  }

  render() {
    return <RelayForm
      onSave={this.onEditRelay}
      buttonText="Save"
      ref={el => (this.form = el)}
      initialValues={this.initialValues()}
      possibleSensors={this.props.currentRelay ? this.props.currentRelay.possible_sensors : []}
    />
  }
}

const makeMapStateToProps = () => {
  const getErrorMessages = makeGetErrorMessages(['EDIT_RELAY'])
  const mapStateToProps = state => {
    return {
      token: state.auth.token,
      errors: getErrorMessages(state),
      loading: getLoadingStatus(state),
      currentRelay: state.relays.currentRelay
    };
  };
  return mapStateToProps
}

const mapDispatchToProps = dispatch => {
  return {
    onSetNavActions: (navActions) => dispatch(actions.setNavActions(navActions)),
    onEditRelay: (id, name, icon, state, sensor_id, task, token) => dispatch(actions.editRelay(id, name, icon, state, sensor_id, task, token)),
    onGetCurrentRelay: (token, id) => dispatch(actions.getCurrentRelay(token, id)),
    onSetNavTitle: (currentAction, showCurrentItem) => dispatch(actions.setNavTitle(currentAction, showCurrentItem))
  };
};

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(EditRelay));
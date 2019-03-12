import React, { Component } from 'react';
import DeviceForm from '../../components/DeviceForm/DeviceForm';
import * as navActions from '../../components/Navigation/Navbar/NavActions/navActionTypes';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import { getLoadingStatus, makeGetErrorMessages } from '../../store/selectors';

class NewDevice extends Component {
  componentDidMount() {
    let actions = {}
    actions[navActions.BACK] = {url: '/devices'}
    actions[navActions.LOGOUT] = {}
    this.props.onSetNavTitle('New Device', false)
    this.props.onSetNavActions(actions)
  }

  componentDidUpdate(prevProps) {
    const { errors } = this.props;
    if (errors) {
      this.form.setErrors(errors);
      this.form.setSubmitting(false)      
    }
    if (!errors && prevProps.loading && !this.props.loading) {
      this.props.history.push('/devices')
    }
  }

  onAddDevice = (model) => {
    this.props.onAddDevice(model.name, model.timezone, this.props.token)
  }

  render() {
    return <React.Fragment>
      <DeviceForm
        onSave={this.onAddDevice}
        buttonText="Add Device"
        ref={el => (this.form = el)}
        initialValues={{ name: '', timezone: '' }}
      />
    </React.Fragment>
  }
}



const makeMapStateToProps = () => {
  const getErrorMessages = makeGetErrorMessages(['ADD_DEVICE'])
  const mapStateToProps = state => {
    return {
      token: state.auth.token,
      errors: getErrorMessages(state),
      loading: getLoadingStatus(state)
    };
  };
  return mapStateToProps
}

const mapDispatchToProps = dispatch => {
  return {
    onSetNavActions: (navActions) => dispatch(actions.setNavActions(navActions)),
    onAddDevice: (name, timezone, token) => dispatch(actions.addDevice(name, timezone, token)),
    onSetNavTitle: (currentAction, showCurrentItem) => dispatch(actions.setNavTitle(currentAction, showCurrentItem))
  };
};

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(NewDevice));
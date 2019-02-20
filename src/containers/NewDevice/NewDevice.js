import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Formik, Field } from 'formik';
import * as actions from '../../store/actions';
import Input from '../../components/UI/Input/Input';
import * as Yup from 'yup';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import classes from './NewDevice.module.css'
import Button from "@material-ui/core/Button";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  timezone: Yup.string().required()
});

const timezoneOptions = [<option value="" disabled key={0}></option>]
timezoneOptions.push(moment.tz.names().map((name, index) => <option key={index+1} value={name}>{name}</option>))

class NewDevice extends Component {
  componentWillMount() {
    this.props.onSetNavActions(['Logout'])
  }

  componentDidUpdate() {
    const { error } = this.props;
    if (error) {
      this.form.setErrors({name: error});
      this.form.setSubmitting(false)      
    }
  }

  onAddDevice = (model) => {
    this.props.onAddDevice(model.name, model.timezone, this.props.token)
  }

  render() {
    return (
      <Formik
        ref={el => (this.form = el)}
        initialValues={{ name: '', deviceId: '', timezone: '' }}
        onSubmit={this.onAddDevice}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          isValid
        }) => (
          <form onSubmit={handleSubmit} className={classes.NewDevice}>
            <Field
              name="name"
              type="text"
              component={Input}
              label="Name"
              margin="normal"
              variant="outlined"
            />
            <Field
              name="timezone"
              type="text"
              component={Input}
              select
              SelectProps={{
                native: true
              }}
              children={timezoneOptions}
              label="Timezone"
              variant="outlined"
              margin="normal"
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting || !isValid}
              classes={{
                disabled: classes.DisabledButton
              }}
            >
              Add Device
            </Button>
          </form>
        )}
      </Formik>
    )
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    error: state.devices.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetNavActions: (navActions) => dispatch(actions.setNavActions(navActions)),
    onAddDevice: (name, timezone, token) => dispatch(actions.addDevice(name, timezone, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDevice);
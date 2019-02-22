import React from 'react';
import { Formik, Field } from 'formik';
import Input from '../../components/UI/Input/Input';
import * as Yup from 'yup';
import moment from 'moment-timezone';
import classes from './DeviceForm.module.css';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  timezone: Yup.string().required()
});

const timezoneOptions = [<option value="" disabled key={0}></option>]
timezoneOptions.push(moment.tz.names().map((name, index) => <option key={index+1} value={name}>{name}</option>))

const deviceForm = React.forwardRef((props, ref) => (
  <Formik
    ref={ref}
    enableReinitialize
    initialValues={props.initialValues}
    onSubmit={props.onSave}
    validationSchema={validationSchema}
    {...props}
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
      <form onSubmit={handleSubmit} className={classes.DeviceForm}>
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
          {props.buttonText}
          {props.loading && <CircularProgress size={24} className={classes.ButtonProgress} />}
        </Button>
      </form>
    )}
  </Formik>
));

export default deviceForm;
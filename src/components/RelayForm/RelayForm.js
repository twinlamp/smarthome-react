import React from 'react';
import { Formik, Field } from 'formik';
import Input from '../../components/UI/Input/Input';
import * as Yup from 'yup';
import classes from './RelayForm.module.css';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import relayTypes from '../../shared/relayTypes';
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from '@mdi/react';

const iconOptions = [<MenuItem value="" key={0}></MenuItem>]
iconOptions.push(relayTypes.filter((rt) => rt.name).map((type, index) => {
  return <MenuItem key={index+1} value={type.name}>
           <ListItemIcon >
             <Icon path={type.on} size={1} className={classes.RelayIcon} />
           </ListItemIcon>
           <ListItemText inset primary={type.name} />
         </MenuItem>
}))

const possibleStates = [{name: 'Off', value: 'off'}, {name: 'On', value: 'on'}, {name: 'Task Mode', value: 'task_mode'}]

const stateOptions = possibleStates.map((s, index) => <option key={index+1} value={s.value}>{s.name}</option>)


const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  icon: Yup.string().required().oneOf(relayTypes.map((type) => type.name)),
  state: Yup.string().required().oneOf(possibleStates.map((s) => s.value)),
  sensor_id: Yup.number(),
});

const relayForm = React.forwardRef((props, ref) => {

  const sensorOptions = [<option value="" key={0}></option>]
  sensorOptions.push(props.possibleSensors.map((s, index) => <option key={index+1} value={s.id}>{s.name}</option>))

  return <Formik
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
      <form onSubmit={handleSubmit} className={classes.RelayForm}>
        <Field
          name="name"
          type="text"
          component={Input}
          label="Name"
          margin="normal"
          variant="outlined"
        />
        <Field
          name="icon"
          type="text"
          component={Input}
          select
          SelectProps={{
            native: false,
            classes: { selectMenu: classes.SelectWithIcon }
          }}
          children={iconOptions}
          label="Icon"
          variant="outlined"
          margin="normal"
        />
        <Field
          name="state"
          type="text"
          component={Input}
          select
          SelectProps={{
            native: true
          }}
          children={stateOptions}
          label="State"
          variant="outlined"
          margin="normal"
        />
        <Field
          name="sensor_id"
          type="text"
          component={Input}
          select
          SelectProps={{
            native: true
          }}
          children={sensorOptions}
          label="Sensor"
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
});

export default relayForm;
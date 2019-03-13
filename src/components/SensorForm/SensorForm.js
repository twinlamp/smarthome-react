import React from 'react';
import { Formik, Field } from 'formik';
import Input from '../../components/UI/Input/Input';
import * as Yup from 'yup';
import classes from './SensorForm.module.css';
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import 'weathericons/css/weather-icons.min.css';
import sensorTypes from '../../shared/sensorTypes';
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  icon: Yup.string().required(),
  min: Yup.number().required(),
  max: Yup.number().required(),  
});

const iconOptions = [<MenuItem value="" key={0}></MenuItem>]
iconOptions.push(sensorTypes.map((type, index) => {
  return <MenuItem key={index+1} value={type.name}>
           <ListItemIcon>
             <i className={type.iconClass}></i>
           </ListItemIcon>
           <ListItemText inset primary={type.name} />
         </MenuItem>
}))

const sensorForm = React.forwardRef((props, ref) => (
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
      <form onSubmit={handleSubmit} className={classes.SensorForm}>
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
          name="min"
          type="number"
          component={Input}
          label="Min"
          margin="normal"
          variant="outlined"
        />
        <Field
          name="max"
          type="number"
          component={Input}
          label="Max"
          margin="normal"
          variant="outlined"
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

export default sensorForm;
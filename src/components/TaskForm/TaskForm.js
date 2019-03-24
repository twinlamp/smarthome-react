import React, { Component } from 'react';
import { Formik, Field } from 'formik';
import Input from '../../components/UI/Input/Input';
import Slider from '../../components/UI/Slider/Slider';
import * as Yup from 'yup';
import classes from './TaskForm.module.css';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
});

class TaskForm extends Component {
  state = {
    valuesRange: Boolean(this.props.initialValues.min || this.props.initialValues.max)
  }

  toggleValuesRange() {
    this.setState(prevState => {
      return { valuesRange: !prevState.valuesRange };
    });
  }

  render() {
    const { initialValues, sensor } = this.props;
    const { valuesRange } = this.state

    return <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      {...this.props}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid,
        setFieldValue,
        setFieldTouched
      }) => (
        <React.Fragment>
          { this.props.sensor && <FormControlLabel
              control={
                <Switch
                  onChange={() => this.toggleValuesRange()}
                  value={valuesRange}
                  checked={valuesRange}
                />
              }
              label="Values Range"
            />
          }
          { valuesRange && 
            <Slider
              onBlur={ () => {
                setFieldTouched('min', true);
                setFieldTouched('max', true)                
              }}
              onChange={ (values) => {
                setFieldValue('min', values[0])
                setFieldValue('max', values[1])                  
              }}
              values={[values.min, values.max]}
              titles={['min', 'max']}
              domain={[
                sensor.min,
                sensor.max
              ]}
            />
          }
        </React.Fragment>
      )}
    </Formik>    
  }
}

export default TaskForm;
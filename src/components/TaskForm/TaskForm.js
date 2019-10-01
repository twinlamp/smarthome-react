import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TaskFormComponent from './TaskFormComponent/TaskFormComponent'

const validationSchema = Yup.object().shape({
  min: Yup.number().integer(),
  max: Yup.number().integer(),
});

class TaskForm extends Component {

  componentDidUpdate() {
    const { errors } = this.props;

    if (errors) {
      this.form.setErrors(errors)
    }
  }

  render() {
    const { initialValues, sensor, onTaskChange } = this.props;

    return <Formik
      ref={el => (this.form = el)}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      render={formikProps => 
        <TaskFormComponent
          initialValues={initialValues}
          sensor={sensor}
          onTaskChange={onTaskChange}
          {...formikProps}
        /> 
      } 
    />
  }
}

export default TaskForm;
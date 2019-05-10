import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TaskFormComponent from './TaskFormComponent/TaskFormComponent'

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
});

class TaskForm extends Component {

  render() {
    const { initialValues, sensor, onTaskChange } = this.props;

    return <Formik
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
import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TaskScheduleFormComponent from './TaskScheduleFormComponent/TaskScheduleFormComponent'

const validationSchema = Yup.object().shape({
  start: Yup.date().nullable().default(null),
  stop: Yup.date().nullable().default(null)
});

class TaskScheduleForm extends Component {

  componentDidUpdate() {
    const { errors } = this.props;

    if (errors) {
      this.form.setErrors(errors)
    }
  }

  render() {
    const { initialValues, onTaskScheduleChange } = this.props;

    return <Formik
      ref={el => (this.form = el)}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      render={formikProps => 
        <TaskScheduleFormComponent
          initialValues={initialValues}
          onTaskScheduleChange={onTaskScheduleChange}
          {...formikProps}
        /> 
      }
    />
  }
}

export default TaskScheduleForm;
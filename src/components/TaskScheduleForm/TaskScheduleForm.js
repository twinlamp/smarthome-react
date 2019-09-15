import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TaskScheduleFormComponent from './TaskScheduleFormComponent/TaskScheduleFormComponent'

const validationSchema = Yup.object().shape({
  start: Yup.date(),
  stop: Yup.date()
});

class TaskScheduleForm extends Component {

  render() {
    const { initialValues, onTaskScheduleChange } = this.props;

    return <Formik
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
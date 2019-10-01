import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import WeeklyScheduleFormComponent from './WeeklyScheduleFormComponent/WeeklyScheduleFormComponent'

const validationSchema = Yup.object().shape({
  days: Yup.object().shape({
    mon: Yup.object().required(),
    tue: Yup.object().required(),
    wen: Yup.object().required(),
    thu: Yup.object().required(),
    fri: Yup.object().required(),
    sat: Yup.object().required(),
    sun: Yup.object().required(),
  }),
});

class WeeklyScheduleForm extends Component {

  componentDidUpdate() {
    const { errors } = this.props;

    if (errors) {
      this.form.setErrors(errors)
    }
  }

  render() {
    const { initialValues, onWeeklyScheduleChange } = this.props;

    return <Formik
      ref={el => (this.form = el)}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      render={formikProps => 
        <WeeklyScheduleFormComponent
          initialValues={initialValues}
          onWeeklyScheduleChange={onWeeklyScheduleChange}
          {...formikProps}
        /> 
      }
    />
  }
}

export default WeeklyScheduleForm;
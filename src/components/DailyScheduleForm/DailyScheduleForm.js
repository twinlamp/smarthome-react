import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import DailyScheduleFormComponent from './DailyScheduleFormComponent/DailyScheduleFormComponent'

const validationSchema = Yup.object().shape({
  on: Yup.date().nullable().default(null),
  off: Yup.date().nullable().default(null)
});

class DailyScheduleForm extends Component {

  componentDidUpdate() {
    const { errors } = this.props;

    if (errors) {
      this.form.setErrors(errors)
    }
  }

  render() {
    const { initialValues, onDailyScheduleChange } = this.props;

    return <Formik
      ref={el => (this.form = el)}
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      render={formikProps => 
        <DailyScheduleFormComponent
          initialValues={initialValues}
          onDailyScheduleChange={onDailyScheduleChange}
          {...formikProps}
        /> 
      }
    />
  }
}

export default DailyScheduleForm;
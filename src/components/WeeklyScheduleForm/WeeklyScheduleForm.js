import React, { Component } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import WeeklyScheduleFormComponent from './WeeklyScheduleFormComponent/WeeklyScheduleFormComponent'

const validationSchema = Yup.object().shape({
  days: Yup.object().shape({
    mon: Yup.object().shape({ on: Yup.date(), off: Yup.date() }),
    tue: Yup.object().shape({ on: Yup.date(), off: Yup.date() }),
    wen: Yup.object().shape({ on: Yup.date(), off: Yup.date() }),
    thu: Yup.object().shape({ on: Yup.date(), off: Yup.date() }),
    fri: Yup.object().shape({ on: Yup.date(), off: Yup.date() }),
    sat: Yup.object().shape({ on: Yup.date(), off: Yup.date() }),
    sun: Yup.object().shape({ on: Yup.date(), off: Yup.date() })
  }),
});

class WeeklyScheduleForm extends Component {

  render() {
    const { initialValues, onWeeklyScheduleChange } = this.props;

    return <Formik
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
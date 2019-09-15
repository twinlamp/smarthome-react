import React, { Component } from 'react';
import { Formik } from 'formik';
import DailyScheduleFormComponent from './DailyScheduleFormComponent/DailyScheduleFormComponent'

class DailyScheduleForm extends Component {

  render() {
    const { initialValues, onDailyScheduleChange } = this.props;

    return <Formik
      enableReinitialize
      initialValues={initialValues}
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
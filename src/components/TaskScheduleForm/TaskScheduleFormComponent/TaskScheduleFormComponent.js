import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import Input from '../../../components/UI/Input/Input';
import "react-datepicker/dist/react-datepicker.css";
import { Field } from 'formik';
import isEqual from 'react-fast-compare';
import WeeklyScheduleForm from '../../WeeklyScheduleForm/WeeklyScheduleForm';

const scheduleOptions = (['none', 'calendar', 'weekly'].map((s, index) => <option key={index+1} value={s}>{s}</option>))

class TaskScheduleFormComponent extends Component {
  componentWillUpdate(nextProps, nextState) {
    if (!isEqual(nextProps.values, nextProps.initialValues)) {
      this.props.onTaskScheduleChange(nextProps.values)
    }
  }

  render() {
    const { values, setFieldValue, errors } = this.props

    return <React.Fragment>
      <Field
        name="schedule"
        type="text"
        component={Input}
        select
        SelectProps={{
          native: true
        }}
        children={scheduleOptions}
        label="Schedule"
        variant="outlined"
        margin="normal"
      />
      { values.schedule === 'calendar' && 
        <React.Fragment>
          <Field
            name="start"
            render={({ field, form }) => {
              let handleChange = (value) => form.setFieldValue(field.name, value);
              let customInput = <Input
                field={field}
                form={form}
                variant="outlined"
                margin="normal"
                name="start"
                type="text"
                label="Start Date"
              />
              return <DatePicker 
                customInput={customInput}
                selected={field.value ? new Date(field.value) : null}
                onChange={handleChange}
                minDate={new Date(new Date())}
                maxDate={values.stop ? new Date(values.stop) : null}
                selectsStart
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                timeFormat="HH:mm"
              />
            }}
          />
          <Field
            name="stop"
            render={({ field, form }) => {
              let handleChange = (value) => form.setFieldValue(field.name, value);
              let customInput = <Input
                field={field}
                form={form}
                margin="normal"
                variant="outlined"
                name="stop"
                type="text"
                label="End Date"
              />
              return <DatePicker
                customInput={customInput}
                selected={field.value ? new Date(field.value) : null}
                onChange={handleChange}
                minDate={new Date(values.start ? new Date(values.start) : new Date())}
                selectsEnd
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                timeFormat="HH:mm"
              />
            }}
          />
        </React.Fragment>
      }
      { values.schedule === 'weekly' && 
        <WeeklyScheduleForm
          initialValues={values.days}
          onWeeklyScheduleChange={(val) => {
            setFieldValue('days', val)
          }}
          errors={errors.days}
        />
      }
    </React.Fragment>
  }
}

export default TaskScheduleFormComponent;
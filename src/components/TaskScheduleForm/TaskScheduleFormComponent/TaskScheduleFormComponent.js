import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import Input from '../../../components/UI/Input/Input';
import "react-datepicker/dist/react-datepicker.css";
import { Field } from 'formik';
import isEqual from 'react-fast-compare';
import WeeklyScheduleForm from '../../WeeklyScheduleForm/WeeklyScheduleForm';

const scheduleOptions = (['none', 'calendar', 'weekly'].map((s, index) => <option key={index+1} value={s}>{s}</option>))

class TaskScheduleFormComponent extends Component {
  state = {
    schedule: (this.props.initalValues && this.props.initalValues.start) ? 'calendar' : 'none',
  }

  componentWillUpdate(nextProps, nextState) {
    if (!isEqual(nextProps.values, nextProps.initialValues)) {
      this.props.onTaskScheduleChange(nextProps.values)
    }
  }

  render() {
    const { values, setFieldValue } = this.props
    const { schedule } = this.state

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
        value={schedule}
        onChange={(e) => this.setState({schedule: e.target.value})}
      />
      { schedule === 'calendar' && 
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
                selected={field.value}
                onChange={handleChange}
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
                selected={field.value}
                onChange={handleChange}
                selectsEnd
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                timeFormat="HH:mm"
              />
            }}
          />
        </React.Fragment>
      }
      { schedule === 'weekly' && 
        <WeeklyScheduleForm
          initialValues={values.days}
          onWeeklyScheduleChange={(val) => {
            setFieldValue('days', val)
          }}
        />
      }
    </React.Fragment>
  }
}

export default TaskScheduleFormComponent;
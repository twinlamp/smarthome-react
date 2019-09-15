import React, { Component } from 'react';
import Input from '../../../components/UI/Input/Input';
import { Field } from 'formik';
import TableCell from '@material-ui/core/TableCell';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import isEqual from 'react-fast-compare';
import classes from './DailyScheduleFormComponent.module.css';

class DailyScheduleFormComponent extends Component {
  componentWillUpdate(nextProps, nextState) {
    if (!isEqual(nextProps.values, nextProps.initialValues)) {
      console.log(this.props.values);
      this.props.onDailyScheduleChange(nextProps.values)
    }
  }

  render() {
    const { values } = this.props

    return <React.Fragment>
      <TableCell>
        <Field
          name="on"
          render={({ field, form }) => {
            let handleChange = (value) => form.setFieldValue(field.name, value);
            let customInput = <Input
              field={field}
              form={form}
              variant="outlined"
              margin="normal"
              name="on"
              type="text"
              label="Start Time"
            />
            return <DatePicker 
              customInput={customInput}
              selected={field.value}
              onChange={handleChange}
              minTime={new Date(new Date().setHours(0, 0, 0))}
              maxTime={new Date(values.off || new Date().setHours(23, 59, 59))}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              popperClassName={classes.Picker}
            />
          }}
        />
      </TableCell>
      <TableCell>
        <Field
          name="off"
          render={({ field, form }) => {
            let handleChange = (value) => form.setFieldValue(field.name, value);
            let customInput = <Input
              field={field}
              form={form}
              variant="outlined"
              margin="normal"
              name="off"
              type="text"
              label="End Time"
            />
            return <DatePicker 
              customInput={customInput}
              selected={field.value}
              onChange={handleChange}
              minTime={new Date(values.on || new Date().setHours(0, 0, 0))}
              maxTime={new Date(new Date().setHours(23, 59, 59))}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
              popperClassName={classes.Picker}
            />
          }}
        />
      </TableCell>
    </React.Fragment>
  }
}

export default DailyScheduleFormComponent;
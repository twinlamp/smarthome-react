import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import isEqual from 'react-fast-compare';
import DailyScheduleForm from '../../DailyScheduleForm/DailyScheduleForm';

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

class WeeklyScheduleFormComponent extends Component {
  componentWillUpdate(nextProps, nextState) {
    if (!isEqual(nextProps.values, nextProps.initialValues)) {
      this.props.onWeeklyScheduleChange(nextProps.values)
    }
  }

  render() {
    const { values, setFieldValue, errors } = this.props

    return <Table>
      <TableHead>
        <TableRow>
          <TableCell></TableCell>
          <TableCell>Start</TableCell>
          <TableCell>Stop</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {days.map(day => (
          <TableRow key={day}>
            <TableCell>{day}</TableCell>
            <DailyScheduleForm
              initialValues={values[day]}
              onDailyScheduleChange={(val) => {
                setFieldValue(day, val)
              }}
              errors={errors[day]}
            />
          </TableRow>
        ))}
      </TableBody>
    </Table>
  }
}

export default WeeklyScheduleFormComponent;
import React, { Component } from 'react';
import Slider from '../../../components/UI/Slider/Slider';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TaskScheduleForm from '../../TaskScheduleForm/TaskScheduleForm';
import isEqual from 'react-fast-compare';

class TaskFormComponent extends Component {
  componentWillUpdate(nextProps, nextState) {
    if (!isEqual(nextProps.values, nextProps.initialValues)) {
      this.props.onTaskChange(nextProps.values)
    }
  }

  render() {
    const { values, setFieldValue, setFieldTouched, sensor, errors } = this.props

    return <React.Fragment>
      { sensor && <FormControlLabel
          control={
            <Switch
              onChange={() => {
                setFieldValue('values_range', !values.values_range)
              }}
              value={values.values_range}
              checked={values.values_range}
            />
          }
          label="Values Range"
        />
      }
      { values.values_range && sensor &&
        <Slider
          onBlur={ () => {
            setFieldTouched('min', true)
            setFieldTouched('max', true)
          }}
          onChange={ (vals) => {
            setFieldValue('min', vals[0])
            setFieldValue('max', vals[1])
          }}
          values={[values.min, values.max]}
          titles={['min', 'max']}
          domain={[
            sensor.min,
            sensor.max
          ]}
        />
      }
      <TaskScheduleForm
        initialValues={values.task_schedule}
        onTaskScheduleChange={(val) => {
          setFieldValue('task_schedule', val)
        }}
        errors={errors.task_schedule}
      />
    </React.Fragment>
  }
}

export default TaskFormComponent;
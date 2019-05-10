import React, { Component } from 'react';
import Slider from '../../../components/UI/Slider/Slider';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TaskScheduleForm from '../../TaskScheduleForm/TaskScheduleForm';
import isEqual from 'react-fast-compare';

class TaskFormComponent extends Component {
  state = {
    valuesRange: Boolean(this.props.initialValues.min || this.props.initialValues.max),
  }

  toggleValuesRange() {
    this.setState(prevState => {
      return { valuesRange: !prevState.valuesRange };
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (!isEqual(nextProps.values, nextProps.initialValues)) {
      this.props.onTaskChange(nextProps.values)
    }
  }

  render() {
    const { values, setFieldValue, setFieldTouched, sensor} = this.props
    const { valuesRange } = this.state 

    return <React.Fragment>
      { sensor && <FormControlLabel
          control={
            <Switch
              onChange={() => {
                this.toggleValuesRange()
              }}
              value={valuesRange}
              checked={valuesRange}
            />
          }
          label="Values Range"
        />
      }
      { valuesRange && 
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
      />
    </React.Fragment>
  }
}

export default TaskFormComponent;
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class Input extends Component {

  render() {
    const { field, form: { errors } } = this.props

    return <TextField
      {...field}
      {...this.props}
      error={!!errors[field.name]}
      helperText={errors[field.name]}
    />
  }
}

export default Input;
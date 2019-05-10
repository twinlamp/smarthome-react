import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class Input extends Component {

  render() {
    const { field, form: { touched, errors } } = this.props
    const error = Boolean(errors[field.name] && touched[field.name])

    return <TextField
      {...field}
      {...this.props}
      error={error}
      helperText={error ? errors[field.name] : ' '}
    />
  }
}

export default Input;
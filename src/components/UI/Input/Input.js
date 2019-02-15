import React from 'react';
import TextField from '@material-ui/core/TextField';

const input = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const error = Boolean(errors[field.name] && touched[field.name])
  return <TextField
    {...field}
    {...props}
    error={error}
    helperText={error ? errors[field.name] : ' '}
  />
}

export default input;
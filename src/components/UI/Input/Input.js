import React from 'react';
import TextField from '@material-ui/core/TextField';

const input = ({
  field,
  form: { touched, errors },
  ...props
}) => (

  <TextField
    {...field}
    {...props}
    error={
      Boolean(errors[field.name] && touched[field.name])
    }
    helperText={Boolean(errors[field.name] && touched[field.name]) ? errors[field.name] : ''}
  />
);

export default input;
import React from 'react';
import { Link } from 'react-router-dom';
import BackIcon from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton';

const logout = (props) => (
  <IconButton
    color="inherit"
    component={Link}
    to={props.url}
  >
    <BackIcon />
  </IconButton>
);

export default logout;
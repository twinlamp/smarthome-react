import React from 'react';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import IconButton from '@material-ui/core/IconButton';

const logout = (props) => (
  <IconButton
    color="inherit"
    component={Link}
    to="/logout"
  >
    <ExitToAppIcon />
  </IconButton>
);

export default logout;
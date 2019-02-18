import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AddItemIcon from '@material-ui/icons/Add'

const addDevice = (props) => (
    <Button
      color="inherit"
      component={Link}
      to="/devices/new"
    >
      <AddItemIcon />
      New Device
    </Button>
);

export default addDevice;
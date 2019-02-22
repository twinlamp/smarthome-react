import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit'

const editDevice = (props) => (
    <Button
      color="inherit"
      component={Link}
      to={`/devices/${props.id}/edit`}
    >
      <EditIcon />
      Edit Device
    </Button>
);

export default editDevice;
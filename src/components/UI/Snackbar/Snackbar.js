import React from 'react';
import MuiSnackbar from '@material-ui/core/Snackbar';

const snackbar = (props) => {
  return <MuiSnackbar
    open={props.open}
    anchorOrigin={{vertical: 'bottom', 'horizontal': 'left'}}
    message={props.message}
    onClose={props.onClose}
    autoHideDuration={6000}
  />
}

export default snackbar;
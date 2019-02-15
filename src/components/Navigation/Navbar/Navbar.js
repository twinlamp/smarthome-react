import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classes from './Navbar.module.css'

class Navbar extends Component {

  render() {
    return <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" className={classes.NavLinks}>
          News
        </Typography>
        <Button
          color="inherit"
          component={NavLink}
          to="/logout"
        >Logout</Button>
      </Toolbar>
    </AppBar>
  }
}

export default Navbar;
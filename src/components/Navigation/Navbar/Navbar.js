import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import classes from './Navbar.module.css'
import NavActions from './NavActions/NavActions'

const navbar = (props) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit" className={classes.NavLinks}>
        Kak-tam-dom
      </Typography>
      <NavActions list={props.navActions}/>
    </Toolbar>
  </AppBar>
);

export default navbar;
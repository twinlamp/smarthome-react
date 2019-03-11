import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import classes from './Navbar.module.css'
import NavActions from './NavActions/NavActions'
import Back from './NavActions/Back/Back'

const navbar = (props) => (
  <AppBar position="static">
    <Toolbar>
      {props.navActions.Back ? <Back url={props.navActions.Back.url} /> : null}
      <Typography variant="h6" color="inherit" className={classes.NavLinks}>
        {`${(props.currentAction || '')} ${(props.currentItem ? props.currentItem.title : '')}`}
      </Typography>
      <NavActions list={props.navActions}/>
    </Toolbar>
  </AppBar>
);

export default navbar;
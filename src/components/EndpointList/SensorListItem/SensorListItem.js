import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton';
import 'weathericons/css/weather-icons.min.css';
import Typography from '@material-ui/core/Typography';
import classes from './SensorListItem.module.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom';
import sensorTypes from '../../../shared/sensorTypes';

let iconItem = (icon, value) => {
  let data = sensorTypes.find(type => type.name === icon)
  return <Typography variant="h6" color='textPrimary'>
          {data && data.iconClass && <i className={data.iconClass}></i>}
          {` ${value} ${data ? data.measurement : '???'}`}
         </Typography>
}

class sensorListItem extends Component {
  state = {
    anchorEl: null
  }

  handleClick(e) {
    this.setState({ anchorEl: e.currentTarget })
  }

  handleClose() {
    this.setState({ anchorEl: null })
  }

  render() {
    const { icon, value, title, id } = this.props;
    const { anchorEl } = this.state;

    return (
      <Card raised={true}>
        <CardHeader
          avatar={iconItem(icon, value)}
          title={title}
          titleTypographyProps={{variant: 'h5', color: 'secondary'}}
          action={
            <IconButton onClick={(e) => this.handleClick(e)} color='primary'>
              <MoreVertIcon />
            </IconButton>
          }
          classes={
            {
              action: classes.action,
              title: classes.title
            }
          }
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => this.handleClose()}
        >
          <MenuItem
            component={Link}
            to={`/sensors/${id}/edit`}
          >Edit</MenuItem>
          <MenuItem
            component={Link}
            to={`/sensors/${id}`}
          >Graph</MenuItem>
        </Menu>
      </Card>
    )
  }
}

export default sensorListItem;



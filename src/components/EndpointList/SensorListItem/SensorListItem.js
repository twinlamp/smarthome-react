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


let iconItem = (icon, value) => {
  switch(icon) {
  case 'temperature':
    return <Typography variant="h6" color='textPrimary'><i className='wi wi-thermometer'></i>{` ${value} ℃`}</Typography>;
  case 'humidity':
    return <Typography variant="h6" color='textPrimary'><i className='wi wi-humidity'></i>{` ${value} %`}</Typography>;
  case 'pressure':
    return <Typography variant="h6" color='textPrimary'><i className='wi wi-barometer'></i>{` ${value} mmHg`}</Typography>;
  case 'light':
    return <Typography variant="h6" color='textPrimary'><i className='wi wi-day-sunny'></i>{` ${value} lm`}</Typography>;
  default:
    return <Typography variant="h6" color='textPrimary'>{`${value} ???`}</Typography>;
  }
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
            to={`/sensor/${id}/edit`}
          >Edit</MenuItem>
          <MenuItem
            component={Link}
            to={`/sensor/${id}`}
          >Graph</MenuItem>
        </Menu>
      </Card>
    )
  }
}

export default sensorListItem;



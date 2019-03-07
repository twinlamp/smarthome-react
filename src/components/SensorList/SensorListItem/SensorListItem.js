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
    return <Typography variant="h6"><i className='wi wi-thermometer'></i>{` ${value} ℃`}</Typography>;
    break;
  case 'humidity':
    return <Typography variant="h6"><i className='wi wi-humidity'></i>{` ${value} %`}</Typography>;
    break;
  case 'pressure':
    return <Typography variant="h6"><i className='wi wi-barometer'></i>{` ${value} mmHg`}</Typography>;
    break;
  case 'light':
    return <Typography variant="h6"><i className='wi wi-day-sunny'></i>{` ${value} lm`}</Typography>;
    break;
  default:
    return <Typography variant="h6"><i className='wi wi-thermometer'></i>{` ${value} &#8451`}</Typography>;
    break;
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
          titleTypographyProps={{variant: 'h6'}}
          action={
            <IconButton onClick={(e) => this.handleClick(e)}>
              <MoreVertIcon />
            </IconButton>
          }
          classes={
            {
              action: classes.action
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



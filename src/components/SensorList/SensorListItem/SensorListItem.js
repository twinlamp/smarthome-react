import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton';
import 'weathericons/css/weather-icons.min.css';
import Typography from '@material-ui/core/Typography';
import classes from './SensorListItem.module.css';

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


const sensorListItem = (props) => (
  <Card raised={true}>
    <CardHeader
      avatar={iconItem(props.icon, props.value)}
      title={props.title}
      titleTypographyProps={{variant: 'h6'}}
      action={
        <IconButton to={`/sensor/${props.id}/edit`}>
          <MoreVertIcon />
        </IconButton>
      }
      classes={
        {
          action: classes.action
        }
      }
    />
  </Card>
);

export default sensorListItem;
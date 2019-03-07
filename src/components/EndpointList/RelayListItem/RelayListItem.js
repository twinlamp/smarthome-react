import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import classes from './RelayListItem.module.css';
import Button from '@material-ui/core/Button';
import Icon from '@mdi/react';
import { mdiRadiator, mdiRadiatorOff, mdiFan, mdiFanOff,
  mdiEngine, mdiEngineOff, mdiWater, mdiWaterOff, mdiPower,
  mdiPowerOff, mdiLightbulbOn, mdiLightbulb } from '@mdi/js';
import { withTheme } from '@material-ui/core/styles';

let iconItem = (icon, value) => {
  switch(icon) {
  case 'radiator':
    return value ? mdiRadiator : mdiRadiatorOff;
  case 'light':
    return value ? mdiLightbulbOn : mdiLightbulb;
  case 'fan':
    return value ? mdiFan : mdiFanOff;
  case 'engine':
    return value ? mdiEngine : mdiEngineOff;
  case 'water':
    return value ? mdiWater : mdiWaterOff;
  default:
    return value ? mdiPower : mdiPowerOff;
  }
}

let sensorValue = (icon, value) => {
  switch(icon) {
  case 'temperature':
    return `${value} ℃`;
  case 'humidity':
    return `${value} %`;
  case 'pressure':
    return `${value} mmHg`;
  case 'light':
    return `${value} lm`;
  default:
    return `${value} ???`;
  }
}

class relayListItem extends Component {
  render() {
    const { icon, value, title, id, sensor, theme } = this.props;

    return (
      <Card raised={true}>
        <CardHeader
          title={title}
          titleTypographyProps={{variant: 'h5', align: 'center', color: 'secondary'}}
          classes={{title: classes.title}}
        />
        <Divider variant="middle" />
        <CardContent className={classes.content}>
          <Icon path={iconItem(icon, value)}
            size={6}
            className={classes.icon}
            color={value ? theme.palette.primary.main : theme.palette.grey[500] }/>
          { sensor &&
            <Typography variant="h6" className={classes.value} color='textPrimary'>
              { sensorValue(sensor.icon, sensor.value) }
            </Typography>
          }
        </CardContent>
        <Divider variant="middle" />
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            component={Link}
            to={`/relays/${id}/edit`}
          >
            Edit
          </Button>
          {sensor &&
            <Button
              color="primary"
              component={Link}
              to={`/sensors/${id}`}
            >
              Graph
            </Button>
          }
        </CardActions>
      </Card>
    )
  }
}

export default withTheme()(relayListItem);



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
import { withTheme } from '@material-ui/core/styles';
import sensorTypes from '../../../shared/sensorTypes';
import relayTypes from '../../../shared/relayTypes';

class relayListItem extends Component {
  render() {
    const { icon, value, title, id, sensor, theme } = this.props;

    let iconItem = (icon, value) => {
      let data = relayTypes.find(type => type.name === icon)
      return <Icon path={value ? data.on : data.off}
                size={6}
                className={classes.icon}
                color={value ? theme.palette.primary.main : theme.palette.grey[500] }/>
    }

    let sensorValue = (icon, value) => {
      let data = sensorTypes.find(type => type.name === icon)
      return <Typography variant="h6" className={classes.value} color='textPrimary'>
              {` ${value} ${data ? data.measurement : '???'}`}
             </Typography>
    }

    return (
      <Card raised={true}>
        <CardHeader
          title={title}
          titleTypographyProps={{variant: 'h5', align: 'center', color: 'secondary'}}
          classes={{title: classes.title}}
        />
        <Divider variant="middle" />
        <CardContent className={classes.content}>
          {iconItem(icon, value)}
          { sensor && sensorValue(sensor.icon, sensor.value) }
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



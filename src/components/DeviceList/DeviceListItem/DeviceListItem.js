import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const deviceItem = (props) => (
  <Card raised={true}>
    <CardContent>
      <Link to={`/devices/${props.id}`} style={{'textDecoration': 'none'}}>
        <Typography variant="h5">{props.name}</Typography>
        <Typography variant="subheading" color="textSecondary">{props.identity}</Typography>
        <Typography variant="body1">{props.timezone}</Typography>
      </Link>
    </CardContent>
  </Card>
);

export default deviceItem;
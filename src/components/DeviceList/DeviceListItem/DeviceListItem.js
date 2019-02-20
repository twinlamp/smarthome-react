import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const deviceItem = (props) => (
  <Card raised={true}>
    <CardContent>
      <Typography variant="h5">{props.name}</Typography>
      <Typography variant="subheading" color="textSecondary">{props.identity}</Typography>
      <Typography variant="body1">{props.timezone}</Typography>
    </CardContent>
  </Card>
);

export default deviceItem;
import React from 'react';
import SensorListItem from './SensorListItem/SensorListItem'
import Grid from "@material-ui/core/Grid";

const sensorList = (props) => (
  <Grid container spacing={24} justify="flex-start">
    {
      props.items.map((sensor, index) => {
        return <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <SensorListItem {...sensor} />
        </Grid>
      })
    }
  </Grid>
);

export default sensorList;
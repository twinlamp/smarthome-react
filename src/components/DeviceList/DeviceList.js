import React from 'react';
import DeviceListItem from './DeviceListItem/DeviceListItem'
import Grid from "@material-ui/core/Grid";

const deviceList = (props) => (
  <Grid container spacing={24} justify="flex-start">
    {
      props.items.map((device, index) => {
        return <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          <DeviceListItem {...device} />
        </Grid>
      })
    }
  </Grid>
);

export default deviceList;
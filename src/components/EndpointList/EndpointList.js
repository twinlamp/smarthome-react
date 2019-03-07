import React from 'react';
import SensorListItem from './SensorListItem/SensorListItem'
import RelayListItem from './RelayListItem/RelayListItem'
import Grid from "@material-ui/core/Grid";

const endpointList = (props) => (
  <Grid container spacing={24} justify="flex-start">
    {
      props.items.map((endpoint, index) => {
        return <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
          {
            endpoint.type === 'sensor' ? <SensorListItem {...endpoint} /> : <RelayListItem {...endpoint} />
          }
        </Grid>
      })
    }
  </Grid>
);

export default endpointList;
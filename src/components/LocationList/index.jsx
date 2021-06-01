import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import useLocations from '../../hooks/useLocations';

const LocationList = ({
  openMap = () => {},
  selectedLocation = [],
}) => {
  const availableLocations = useLocations()
  return (
    <Grid className="mb-2" container direction="column">
      <Grid container direction="row">
        <Grid item xs={3}>
          <Typography align="center" variant="button" display="block" gutterBottom>Locations</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="overline" display="block" gutterBottom>Place</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="overline" display="block" gutterBottom>Unit</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="overline" display="block" gutterBottom>Cost</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Icon>add_location</Icon>}
            size="small"
            onClick={() => { openMap() }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      {selectedLocation.length === 0? (
        <Grid className="mb-1" container direction="row" justify="center">
            <Typography variant="overline">No Location selected</Typography>
        </Grid>
      ) : (
        <>
          <LocationItem/>
          <LocationItem/>
          <LocationItem/>
          <LocationItem/>
          <LocationItem/>
          <LocationItem/>
        </>
      )}
    </Grid>
  )
}

const LocationItem = () => {
  return (
    <Grid className="mb-1" container direction="row">
      <Grid item xs={3}></Grid>
      <Grid item xs={2}>
        <Typography variant="body2" display="block" gutterBottom>Asoke</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2" display="block" gutterBottom>2,000</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2" display="block" gutterBottom>5000.0</Typography>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
        >
          Remove
        </Button>
      </Grid>
    </Grid>
  )
}

export default LocationList
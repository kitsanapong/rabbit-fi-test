import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import useLocations from '../../hooks/useLocations';

const LocationList = ({
  openMap = () => {},
  data = [],
  remove = () => {},
  isEnable = false,
}) => {
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
            onClick={() => {
              openMap()
            }}
            disabled={!isEnable}
          >
            Add
          </Button>
        </Grid>
      </Grid>
      {data.length === 0? (
        <Grid className="mb-1" container direction="row" justify="center">
            <Typography variant="overline">No Location selected</Typography>
        </Grid>
      ) : data.map((distItem) => {
            const { location = {}, maxUnits, cost } = distItem
            return <LocationItem key={location.name} lable={location.name} units={maxUnits} cost={cost} onRemoveClick={() => { remove(distItem) }}/>
          }
      )}
    </Grid>
  )
}

const LocationItem = ({
  lable = 'Location',
  units = '99999',
  cost = '99999',
  onRemoveClick = () => {},
}) => {
  return (
    <Grid className="mb-1" container direction="row">
      <Grid item xs={3}></Grid>
      <Grid item xs={2}>
        <Typography variant="body2" display="block" gutterBottom>{lable}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2" display="block" gutterBottom>{units}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant="body2" display="block" gutterBottom>{cost}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          onClick={() => { onRemoveClick() }}
        >
          Remove
        </Button>
      </Grid>
    </Grid>
  )
}

export default LocationList
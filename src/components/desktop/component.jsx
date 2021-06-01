import React, { useState, useEffect } from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers'
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import './desktop.scss'

const SelectProduct = ({ state = [] }) => {
  const [product, setProduct] = state
  return (
    <Grid className="mb-2" container direction="row" alignItems="center">
      <Grid item xs={2}>
        <Typography align="center" variant="button" display="block" gutterBottom>Product</Typography>
      </Grid>
      <Grid item xc={9}>
        <FormControl variant="outlined" size="small">
          <Select
            id="select-product"
            value={product}
            onChange={(e) => { setProduct(e.target.value) }}
          >
            <MenuItem value={-1}>Select product</MenuItem>
            <MenuItem value={10}>Flyer - One Sided</MenuItem>
            <MenuItem value={20}>Flyer - Two Sided</MenuItem>
            <MenuItem value={30}>Brochure - 4 Page</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

const SelectDate = ({ state = [] }) => {
  const [date, setDate] = state
  return (
    <Grid className="mb-2" container direction="row" alignItems="center">
      <Grid item xs={2} direction="row">
        <Typography align="center" variant="button" display="block" gutterBottom>Date</Typography>
      </Grid>
      <Grid item xc={9}>
        <KeyboardDatePicker
          value={date}
          onChange={setDate}
          inputVariant="outlined"
          size="small"
        />
      </Grid>
    </Grid>
  )
}

const LocationList = () => {
  return (
    <Grid className="mb-2" container direction="column">
      <Grid container direction="row">
        <Grid item xs={2}>
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
          >
            Add
          </Button>
        </Grid>
      </Grid>
      <LocationItem/>
      <LocationItem/>
      <LocationItem/>
      <LocationItem/>
      <LocationItem/>
      <LocationItem/>
    </Grid>
  )
}

const LocationItem = () => {
  return (
    <Grid className="mb-1" container direction="row">
      <Grid item xs={2}></Grid>
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

const Summary = () => {
  return (
    <Grid className="mb-4" container direction="column">
      <Grid container direction="row">
        <Grid item xs={2}>
          <Typography align="center" variant="subtitle1" display="block" gutterBottom>TOTAL</Typography>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" display="block" gutterBottom>45,000</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" display="block" gutterBottom>650,000.0</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

const Submmit = () => {
  return (
    <Grid container direction="row" justify="center">
      <Button
        variant="contained"
        color="primary"
      >Submit</Button>
    </Grid>
  )
}

const Desktop = () => {
  const productState = useState(-1)
  const dateState = useState()
  return (
    <div className="desktop">
      <Grid container direction="column" justify="flex-start" alignItems="flex-start">
        <Grid container>
          <Paper className="toolbar" elevation={4}>
            <Typography variant="button">RABBIT PRODUCT DISTRIBUTION</Typography>
          </Paper>
        </Grid>
        <SelectProduct state={productState}/>
        <SelectDate state={dateState}/>
        <LocationList/>
        <Summary/>
        <Submmit/>
      </Grid>
    </div>
  )
}

export default Desktop
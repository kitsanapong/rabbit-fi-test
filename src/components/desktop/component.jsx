import React, { useState, useEffect } from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers'

import './desktop.scss'

const SelectProduct = ({ state = [] }) => {
  const [product, setProduct] = state
  return (
    <Grid container direction="row" alignItems="center">
      <Grid item xs={3}>
        <Typography variant="button" display="block" gutterBottom>Product</Typography>
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
    <Grid container direction="row" alignItems="center">
      <Grid item xs={3} direction="row">
        <Typography variant="button" display="block" gutterBottom>Date</Typography>
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

const Desktop = () => {
  const productState = useState(-1)
  const dateState = useState()
  return (
    <div className="desktop">
      <Grid container direction="column" justify="flex-start" alignItems="flex-start">
        <SelectProduct state={productState}/>
        <SelectDate state={dateState}/>
      </Grid>
    </div>
  )
}

export default Desktop
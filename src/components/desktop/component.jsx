import React, { useState } from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './desktop.scss'

const SelectProduct = () => {
  const [product, setProduct] = useState()
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
            onChange={setProduct}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Flyer - One Sided</MenuItem>
            <MenuItem value={20}>Flyer - Two Sided</MenuItem>
            <MenuItem value={30}>Brochure - 4 Page</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

const Desktop = () => {
  return (
    <div className="desktop">
      <Grid container direction="column" justify="flex-start" alignItems="flex-start">
        <SelectProduct/>
      </Grid>
    </div>
  )
}

export default Desktop
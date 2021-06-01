import React, { useState, useEffect } from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {
  KeyboardDatePicker,
} from '@material-ui/pickers'
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import './desktop.scss'
import useProducts from '../../hooks/useProducts';
import Map from '../Map/Map';
import LocationList from './LocationList'

const SelectProduct = ({ state = [] }) => {
  const [product, setProduct] = state
  const products = useProducts()
  return (
    <Grid className="mb-2" container direction="row" alignItems="center">
      <Grid item xs={3}>
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
            {products.map((item) => {
              return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            })}
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
      <Grid item xs={3} direction="row">
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

const Summary = () => {
  return (
    <Grid className="mb-4" container direction="column">
      <Grid container direction="row">
        <Grid item xs={3}>
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
  const [showMap, setShowMap] = useState(false)
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
        <LocationList openMap={() => { setShowMap(true) }}/>
        <Summary/>
        <Submmit/>
      </Grid>
      <Map
        open={showMap}
        onClose={()=> { setShowMap(false) }}
        style={{ height: '60vh', width: '80vw', margin: 'auto', marginTop: 64 }}
      />
    </div>
  )
}

export default Desktop
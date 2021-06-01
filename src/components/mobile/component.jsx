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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Map from '../Map/Map';

import './mobile.scss'
import useProducts from '../../hooks/useProducts';
import useLocations from '../../hooks/useLocations';

const SelectProduct = ({ state = [] }) => {
  const [product, setProduct] = state
  const products = useProducts()
  return (
    <Grid className="mb-2" container direction="column" alignItems="center">
      <Grid item xs={12}>
        <Typography align="center" variant="button" display="block" gutterBottom>Product</Typography>
      </Grid>
      <Grid item xc={12}>
        <FormControl variant="outlined" size="small">
          <Select
            id="select-product"
            value={product}
            onChange={(e) => { setProduct(e.target.value) }}
          >
            <MenuItem value={-1}>Select product</MenuItem>
            {products.map((item) => {
              return <MenuItem key={item.id} value={item}>{item.name}</MenuItem>
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
    <Grid className="mb-2" container direction="column" alignItems="center">
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
    <Grid className="mb-2" container direction="column" alignItems="center">
      <Grid item xs={12}>
        <Typography align="center" variant="button" display="block" gutterBottom>Summary</Typography>
      </Grid>
      <Grid container justify="center">
      <Paper elevation={1} className="mb-1" style={{ width: '90vw' }}>
        <SummaryItem lable="Total Units" value="20,000 units"/>
        <SummaryItem lable="Tortal Cost" value="5,000,000.0"/>
      </Paper>
      </Grid>
    </Grid>
  )
}

const SummaryItem = ({ lable = '', value = '' }) => {
  return (
    <Grid container direction="row" alignItems="center" className="p-1">
      <Grid item xs={4}><Typography variant="subtitle2">{lable}</Typography></Grid> 
      <Grid item xs={3}><Typography variant="caption">{value}</Typography></Grid> 
    </Grid>
  )
}

const Submmit = () => {
  return (
    <Grid container direction="row" justify="center">
      <Button
        className="submit-button"
        variant="contained"
        color="primary"
      >Submit</Button>
    </Grid>
  )
}

const LocationList = ({
  openMap = () => {},
  data = [],
}) => {
  console.log(data)
  return (
    <Grid className="mb-2" container direction="column" alignItems="center">
      <Grid item xs={12}>
        <Typography align="center" variant="button" display="block" gutterBottom>Locations</Typography>
      </Grid>
      <Grid container justify="center">
        <Paper elevation={1} className="mb-1" style={{ width: '90vw' }}>
          {data.map((distItem) => {
            const { location = {} } = distItem
            return <LocationItem key={location.name} lable={location.name}/>
          })}
        </Paper>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center" className="p-1">
        <Button variant="contained" color="primary" size="small" onClick={() => { openMap() }}>Add Location</Button>
      </Grid>
    </Grid>
  )
}

const LocationItem = ({ lable = 'Location' , units = '99999', cost = '99999'}) => {
  return (
    <Grid container direction="row" alignItems="center" className="p-1">
      <Grid item xs={4}><Typography variant="subtitle2">{lable}</Typography></Grid> 
      <Grid item xs={3}><Typography variant="caption">{units} Units</Typography></Grid> 
      <Grid item xs={4}><Typography variant="caption">Cost {cost}</Typography></Grid> 
      <Grid item xs={1} >
        <IconButton aria-label="delete" size="small">
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Grid>
    </Grid>
  )
}

function getValidLocations(allLocations = [], distribution = []) {
  const selectedLocations = distribution.reduce((idSet, item) => {
    const { location = {} } = item
    idSet.add(location.id)
    return idSet
  }, new Set())
  return allLocations.filter((location) => {
    return !selectedLocations.has(location.id)
  })
}

const Mobile = () => {
  const productState = useState(-1)
  const dateState = useState()
  const [showMap, setShowMap] = useState(false)
  const [distribution, setDistribution] = useState([])
  const availableLocations = useLocations()
  // console.log(distribution)
  // console.log('===================')
  return (
    <div className="mobile">
      <Grid container direction="column" justify="flex-start" alignItems="flex-start">
        <Grid container>
          <Paper className="toolbar" elevation={4}>
            <Typography variant="button">RABBIT PRODUCT DISTRIBUTION</Typography>
          </Paper>
        </Grid>
        <SelectProduct state={productState}/>
        <SelectDate state={dateState}/>
        <LocationList
          data={distribution}
          openMap={() => { setShowMap(true) }}
        />
        <Summary/>
        <Submmit/>
      </Grid>
      <Map
        data={getValidLocations(availableLocations, distribution)}
        open={showMap}
        onClose={()=> { setShowMap(false) }}
        style={{ width: '100wh', height: 'calc(100vh - 64px)' }}
        onSelect={(location) => {
          // console.log(productState[0])
          // console.log(dateState[0])
          // console.log(location)
          setDistribution(
            [
              ...distribution,
              {
                location: location,
                maxUnits: 1000,
                cost: 1000,
               }
            ]
          )
        }}
      />
    </div>
  )
}

export default Mobile
import React, { useContext } from 'react'
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
import moment from 'moment'

import useProducts from '../../hooks/useProducts';
import Map from '../Map/Map';
import LocationList from './LocationList'
import APIs from '../../apis'
import productDistributionProvider from '../../providers/productDistributionProvider';

import './desktop.scss'

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
          minDate={moment().add(1, 'd')}
        />
      </Grid>
    </Grid>
  )
}

const Summary = ({ data = [] }) => {
  const totalUnits = data.reduce((sum, item) => { return sum + item.maxUnits }, 0)
  const totalCost = data.reduce((sum, item) => { return sum + item.cost }, 0)
  return (
    <Grid className="mb-4" container direction="column">
      <Grid container direction="row">
        <Grid item xs={3}>
          <Typography align="center" variant="subtitle1" display="block" gutterBottom>TOTAL</Typography>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" display="block" gutterBottom>{totalUnits}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle1" display="block" gutterBottom>{totalCost}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

const Submmit = ({ payload = {} }) => {
  return (
    <Grid container direction="row" justify="center">
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          APIs.summitCart(payload)
        }}
      >Submit</Button>
    </Grid>
  )
}

const UnitInfo = ({ maxUnits = 0, availableUnits = 0 }) => {
  return (
    <>
      <Grid className="mb-2" container direction="row" alignItems="center">
        <Grid item xs={3}>
          <Typography align="center" variant="button" display="block" gutterBottom>MAXIMUM UNITS</Typography>
        </Grid>
        <Grid item xc={9}>
        <Typography align="center" variant="caption" display="block" gutterBottom>{maxUnits}</Typography>
        </Grid>
      </Grid>
      <Grid className="mb-2" container direction="row" alignItems="center">
      <Grid item xs={3}>
        <Typography align="center" variant="button" display="block" gutterBottom>AVAILABLE UNITS</Typography>
      </Grid>
      <Grid item xc={9}>
      <Typography align="center" variant="caption" display="block" gutterBottom>{availableUnits}</Typography>
      </Grid>
    </Grid>
  </>
  )
}

const Desktop = () => {
  const ProductDistribution = useContext(productDistributionProvider.Context)
  return (
    <div className="desktop">
      <Grid container direction="column" justify="flex-start" alignItems="flex-start">
        <Grid container>
          <Paper className="toolbar" elevation={4}>
            <Typography variant="button">RABBIT PRODUCT DISTRIBUTION</Typography>
          </Paper>
        </Grid>
        <SelectProduct state={ProductDistribution.productState}/>
        <SelectDate state={ProductDistribution.dateState}/>
        <UnitInfo maxUnits={ProductDistribution.maxUnits} availableUnits={ProductDistribution.availableUnits}/>
        <LocationList
          isEnable={ProductDistribution.shouldEnableAddLocation()}
          data={ProductDistribution.distribution}
          openMap={() => { ProductDistribution.setShowMap(true) }}
          remove={(toRemoveItem) => { ProductDistribution.removeLocation(toRemoveItem) }}
        />
        <Summary data={ProductDistribution.distribution}/>
        <Submmit payload={ProductDistribution.getPayload()}/>
      </Grid>
      <Map
        data={ProductDistribution.getValidLocations()}
        open={ProductDistribution.showMap}
        onClose={()=> { ProductDistribution.setShowMap(false) }}
        style={{ height: '60vh', width: '80vw', margin: 'auto', marginTop: 64 }}
        onSelect={(location) => { ProductDistribution.addLocation(location) }}
      />
    </div>
  )
}

export default Desktop
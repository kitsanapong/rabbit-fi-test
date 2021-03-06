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
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment'

import useProducts from '../../hooks/useProducts';
import APIs from '../../apis'
import productDistributionProvider from '../../providers/productDistributionProvider';
import Map from '../Map/Map';

import './mobile.scss'

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
          minDate={moment().add(1, 'd')}
          maxDate={moment().add(7, 'd')}
        />
      </Grid>
    </Grid>
  )
}

const Summary = ({data = []}) => {
  const totalUnits = data.reduce((sum, item) => { return sum + item.maxUnits }, 0)
  const totalCost = data.reduce((sum, item) => { return sum + item.cost }, 0)
  return (
    <Grid className="mb-2" container direction="column" alignItems="center">
      <Grid item xs={12}>
        <Typography align="center" variant="button" display="block" gutterBottom>Summary</Typography>
      </Grid>
      <Grid container justify="center">
      <Paper elevation={1} className="mb-1" style={{ width: '90vw' }}>
        <SummaryItem lable="Total Units" value={totalUnits + " units"}/>
        <SummaryItem lable="Tortal Cost" value={totalCost + " Baht"}/>
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

const Submmit = ({ payload = {}, isEnable = false }) => {
  return (
    <Grid container direction="row" justify="center">
      <Button
        className="submit-button"
        variant="contained"
        color="primary"
        disabled={!isEnable}
        onClick={() => {
          APIs.summitCart(payload)
        }}
      >Submit</Button>
    </Grid>
  )
}

const LocationList = ({
  openMap = () => {},
  data = [],
  remove = () => {},
  isEnable = false,
}) => {
  return (
    <Grid className="mb-2" container direction="column" alignItems="center">
      <Grid item xs={12}>
        <Typography align="center" variant="button" display="block" gutterBottom>Locations</Typography>
      </Grid>
      <Grid container justify="center">
        <Paper elevation={1} className="mb-1" style={{ width: '90vw' }}>
          {data.map((distItem) => {
            const { location = {}, maxUnits, cost } = distItem
            return <LocationItem key={location.name} lable={location.name} units={maxUnits} cost={cost} onRemoveClick={() => { remove(distItem) }}/>
          })}
        </Paper>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center" className="p-1">
        <Button
          variant="contained"
          color="primary"
          size="small"
          disabled={!isEnable}
          onClick={() => { openMap() }}>Add Location</Button>
      </Grid>
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
    <Grid container direction="row" alignItems="center" className="p-1">
      <Grid item xs={4}><Typography variant="subtitle2">{lable}</Typography></Grid> 
      <Grid item xs={3}><Typography variant="caption">{units} Units</Typography></Grid> 
      <Grid item xs={4}><Typography variant="caption">Cost {cost}</Typography></Grid> 
      <Grid item xs={1} >
        <IconButton aria-label="delete" size="small" onClick={() => { onRemoveClick() }}>
          <DeleteIcon fontSize="inherit" />
        </IconButton>
      </Grid>
    </Grid>
  )
}

const UnitInfo = ({ maxUnits = 0, availableUnits }) => {
  return (
    <Grid container direction="row" justify="center">
      <Grid item xs={4}>
        <Grid className="mb-2" container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography align="center" variant="button" display="block" gutterBottom>Max Units</Typography>
          </Grid>
          <Grid item xc={12}>
          <Typography align="center" variant="caption" display="block" gutterBottom>{maxUnits}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4}>
        <Grid className="mb-2" container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography align="center" variant="button" display="block" gutterBottom>Available Units</Typography>
          </Grid>
          <Grid item xc={12}>
            <Typography align="center" variant="caption" display="block" gutterBottom>{availableUnits}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

const Mobile = () => {
  const ProductDistribution = useContext(productDistributionProvider.Context)
  return (
    <div className="mobile">
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
        <Submmit
          isEnable={ProductDistribution.shouldEnableSubmit()}
          payload={ProductDistribution.getPayload()}
        />
      </Grid>
      <Map
        data={ProductDistribution.getValidLocations()}
        open={ProductDistribution.showMap}
        onClose={()=> { ProductDistribution.setShowMap(false) }}
        style={{ width: '100wh', height: 'calc(100vh - 64px)' }}
        onSelect={(location) => { ProductDistribution.addLocation(location) }}
      />
    </div>
  )
}

export default Mobile
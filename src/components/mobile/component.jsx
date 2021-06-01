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
import moment from 'moment'

import Map from '../Map/Map';

import './mobile.scss'
import useProducts from '../../hooks/useProducts';
import useLocations from '../../hooks/useLocations';
import CalUtils from '../../utils/calculations'
import APIs from '../../apis'

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

const Submmit = ({ product = {}, date = {}, distribution = [] }) => {
  const payload = {
    date: date.format('YYYY-MM-DD'),
    product: product.id,
    locations: distribution.map((item) => {
      return {
        id: item.location.id,
        quantity: item.maxUnits,
      }
    })
  }
  return (
    <Grid container direction="row" justify="center">
      <Button
        className="submit-button"
        variant="contained"
        color="primary"
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
        <Button variant="contained" color="primary" size="small" onClick={() => { openMap() }}>Add Location</Button>
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
  const productState = useState(-1)
  const dateState = useState(moment())
  const [showMap, setShowMap] = useState(false)
  const [distribution, setDistribution] = useState([])
  const availableLocations = useLocations()
  const [maxUnits, setMaxUnits] = useState(0)
  const [availableUnits, setAvailableUnits] = useState(0)
  useEffect(() => {
    const maxProductionUnits = CalUtils.maxProductionUnits(productState[0], dateState[0])
    setAvailableUnits(maxProductionUnits)
    setMaxUnits(maxProductionUnits)
  }, [productState[0], dateState[0]])
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
        <UnitInfo maxUnits={maxUnits} availableUnits={availableUnits}/>
        <LocationList
          data={distribution}
          openMap={() => { setShowMap(true) }}
          remove={(toRemoveItem) => {
            const newDistribution = distribution.filter((item) => {
              return item.location.id !== toRemoveItem.location.id
            })
            setDistribution(newDistribution)
            setAvailableUnits(availableUnits + toRemoveItem.maxUnits)
          }}
        />
        <Summary data={distribution}/>
        <Submmit product={productState[0]} date={dateState[0]} distribution={distribution}/>
      </Grid>
      <Map
        data={getValidLocations(availableLocations, distribution)}
        open={showMap}
        onClose={()=> { setShowMap(false) }}
        style={{ width: '100wh', height: 'calc(100vh - 64px)' }}
        onSelect={(location) => {
          const maxUnits = CalUtils.maxUnits(availableUnits, location)
          const [selectedProduct] = productState
          setDistribution(
            [
              ...distribution,
              {
                location: location,
                maxUnits: maxUnits,
                cost: maxUnits*selectedProduct.price_per_unit + location.fee,
               }
            ]
          )
          setAvailableUnits(availableUnits - maxUnits)
        }}
      />
    </div>
  )
}

export default Mobile
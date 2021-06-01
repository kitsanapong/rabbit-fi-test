import React, { useState, useEffect } from 'react'
import moment from 'moment'

import CalUtils from '../utils/calculations'
import useLocations from '../hooks/useLocations'

const Context = React.createContext()

const Provider = ({ children }) => {
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
  
  const addLocation = (location) => {
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
  }

  const removeLocation = (toRemoveItem) => {
    const newDistribution = distribution.filter((item) => {
      return item.location.id !== toRemoveItem.location.id
    })
    setDistribution(newDistribution)
    setAvailableUnits(availableUnits + toRemoveItem.maxUnits)
  }

  return (
    <Context.Provider value={{
      productState,
      dateState,
      showMap, setShowMap,
      distribution, setDistribution,
      availableLocations,
      maxUnits,
      setMaxUnits,
      availableUnits,
      setAvailableUnits,
      addLocation,
      removeLocation,
    }}>
      {children}
    </Context.Provider>
  )
}

export default {
  Context, Provider,
}
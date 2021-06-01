function maxProductionUnits(selectedProduct, selectedDate, ) {
  if (selectedProduct && selectedDate) {
    const {
      max_production = [],
    } = selectedProduct
    const dateNumber = Math.ceil(selectedDate.diff(new Date(), 'days', true))
    const maxDays = Object.keys(max_production).slice(-1)[0] + ''
    return maxDays < dateNumber? max_production[maxDays] : max_production[dateNumber]
  } else return 0
}

function maxUnits(availableUnits, location) {
  if(availableUnits >= location.max_dist) {
    return location.max_dist
  } else {
    return availableUnits
  }
}

export default {
  maxProductionUnits,
  maxUnits
}
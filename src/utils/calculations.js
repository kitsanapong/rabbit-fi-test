function maxUnits(availableUnits, location) {
  if(availableUnits >= location.max_dist) {
    return location.max_dist
  } else {
    return availableUnits
  }
}

export default {
  maxUnits
}
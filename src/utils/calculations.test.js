import moment from 'moment'

import CalUtils from './calculations'

describe('maxUnits', () => {
  it('should return lowest unit', () => {
    const availableUnits = 5000
    const location = {
      max_dist: 3000
    }
    const unit = CalUtils.maxUnits(availableUnits, location)
    expect(unit).toEqual(3000)
  })
  it('should return lowest unit', () => {
    const availableUnits = 4000
    const location = {
      max_dist: 5000
    }
    const unit = CalUtils.maxUnits(availableUnits, location)
    expect(unit).toEqual(4000)
  })
})

describe('maxProductionUnits', () => {
  it('should return selected date max_production', () => {
    const product = {
      "id": "1",
      "name": "Flyer - One Sided",
      "max_production": {
        "1": 5000,
        "2": 8000,
        "3": 12000,
      },
      "price_per_unit": 0.01,
    }
    
    let result = CalUtils.maxProductionUnits(product, moment().add(1, 'd'))
    expect(result).toEqual(5000)
    result = CalUtils.maxProductionUnits(product, moment().add(2, 'd'))
    expect(result).toEqual(8000)
    result = CalUtils.maxProductionUnits(product, moment().add(3, 'd'))
    expect(result).toEqual(12000)
    result = CalUtils.maxProductionUnits(product, moment().add(4, 'd'))
    expect(result).toEqual(12000)
    result = CalUtils.maxProductionUnits(product, moment().add(5, 'd'))
    expect(result).toEqual(12000)
    result = CalUtils.maxProductionUnits(product, moment().add(6, 'd'))
    expect(result).toEqual(12000)
    result = CalUtils.maxProductionUnits(product, moment().add(7, 'd'))
    expect(result).toEqual(12000)
  })
})
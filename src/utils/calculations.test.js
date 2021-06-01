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
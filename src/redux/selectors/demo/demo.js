import { createSelector } from 'reselect'

const data = state => state.app.data
const moreThan = (state, limit) => limit

const mapForDropdown = (innerData, innerMoreThan) => {
  return innerData.filter(item => item.value > innerMoreThan)
}

export default createSelector(
  data,
  moreThan,
  mapForDropdown
)

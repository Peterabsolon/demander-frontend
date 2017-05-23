import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button } from 'components/misc'
import { CategoryMultiSelect } from 'components/common'
import { filter } from 'decorators'

@connect(() => ({
  initialValues: {
    category: 1
  }
}))
@filter({
  form: 'feedFilters',
  persist: true
})
export default class FeedFiltersForm extends Component {
  render() {
    return (
      <div>
        <CategoryMultiSelect name="category" />
        <Button type="submit" label="Filtrovať" />
      </div>
    )
  }
}

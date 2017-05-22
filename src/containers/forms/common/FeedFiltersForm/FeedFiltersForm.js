import React, { Component } from 'react'

import { Button } from 'components/misc'
import { CategoryMultiSelect } from 'components/common'
import { filter } from 'decorators'

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

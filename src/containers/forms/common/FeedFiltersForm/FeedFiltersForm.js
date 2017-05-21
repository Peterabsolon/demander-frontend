import React, { Component } from 'react'

import { SelectCity, SelectTags } from 'components/fields'
import { Button } from 'components/misc'
import { filter } from 'decorators'

@filter({
  form: 'feedFilters',
  persist: true
})
export default class FeedFiltersForm extends Component {
  render() {
    return (
      <div>
        <SelectCity label="Región" name="city" />
        <SelectTags label="Tagy" name="tag" />
        <Button type="submit" label="Filtrovať" />
      </div>
    )
  }
}

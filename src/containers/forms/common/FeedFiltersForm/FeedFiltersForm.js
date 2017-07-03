import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import { connect } from 'react-redux'

import { SelectCategory } from 'components/fields'
import { filter } from 'decorators'

import style from './feed-filters-form.styl'

// @connect(() => ({
//   initialValues: {
//     category: 1
//   }
// }))
@filter({
  form: 'feedFilters',
  persist: true
})
export default class FeedFiltersForm extends Component {
  static propTypes = {
    formValues: PropTypes.object.isRequired
  };

  render() {
    const { formValues } = this.props

    return (
      <div className={style.wrapper}>
        {/* <CategoryMultiSelect name="category" /> */}

        <SelectCategory formValues={formValues} />
      </div>
    )
  }
}

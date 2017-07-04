// TODO: Clear selected values when parent field collapses

import React, { Component } from 'react'
import cx from 'classnames'
import { get } from 'lodash'
import PropTypes from 'prop-types'

import { Select } from 'components/fields'

import { apiSegments } from 'decorators/api'

import style from './select-category.styl'

@apiSegments({
  segments: true
})
export default class SelectCategory extends Component {
  static propTypes = {
    horizontal: PropTypes.bool,
    segments: PropTypes.any,
    formValues: PropTypes.object
  }

  render() {
    const { horizontal, segments, formValues } = this.props

    const isCategoryVisible =
      get(formValues, 'segment') && get(formValues, 'segment').length > 0

    const isSubCategoryVisible =
      isCategoryVisible &&
      get(formValues, 'category') &&
      get(formValues, 'category').length > 0 &&
      segments.state.subcategories.items.length > 0

    return (
      <div
        className={cx(style.wrapper, {
          [style.horizontal]: horizontal
        })}
      >
        <div className={style.field}>
          <Select
            searchable
            clearable
            multi
            label="Odvětví"
            labelKey="title"
            valueKey="id"
            name="segment"
            onSelectChange={segments.api.handleGetCategories}
            options={segments.state.segments.items}
          />
        </div>

        <div className={style.field}>
          {isCategoryVisible &&
            <Select
              options={segments.state.categories.items}
              searchable
              label="Kategorie"
              labelKey="title"
              valueKey="id"
              multi
              name="category"
              onSelectChange={segments.api.handleGetSubcategories}
            />}
        </div>

        <div className={style.field}>
          {isSubCategoryVisible &&
            <Select
              options={segments.state.subcategories.items}
              searchable
              label="Podkategorie"
              labelKey="title"
              valueKey="id"
              multi
              name="subcategory"
            />}
        </div>
      </div>
    )
  }
}

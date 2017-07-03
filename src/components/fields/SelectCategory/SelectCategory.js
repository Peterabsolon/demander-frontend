// TODO: Clear selected values when parent field collapses

import React, { Component } from 'react'
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
    segments: PropTypes.any,
    formValues: PropTypes.object
  };

  render() {
    const { segments, formValues } = this.props

    const isCategoryVisible =
      get(formValues, 'segments') && get(formValues, 'segments').length > 0

    const isSubCategoryVisible =
      isCategoryVisible &&
      get(formValues, 'categories') &&
      get(formValues, 'categories').length > 0 &&
      segments.state.subcategories.items.length > 0

    return (
      <div className={style.wrapper}>
        <Select
          searchable
          clearable
          multi
          label="Odvětví"
          labelKey="title"
          valueKey="id"
          name="segments"
          onSelectChange={segments.api.handleGetCategories}
          options={segments.state.segments.items}
        />

        {isCategoryVisible &&
          <Select
            options={segments.state.categories.items}
            searchable
            label="Kategorie"
            labelKey="title"
            valueKey="id"
            multi
            name="categories"
            onSelectChange={segments.api.handleGetSubcategories}
          />}

        {isSubCategoryVisible &&
          <Select
            options={segments.state.subcategories.items}
            searchable
            label="Podkategorie"
            labelKey="title"
            valueKey="id"
            multi
            name="subcategories"
          />}
      </div>
    )
  }
}

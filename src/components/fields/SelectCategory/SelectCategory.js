import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Select } from 'components/fields'

import { apiCategories } from 'decorators/api'

@apiCategories({ list: true })
export default class SelectCategory extends Component {
  static propTypes = {
    onlyCreatable: PropTypes.bool,
    categories: PropTypes.object.isRequired
  };

  static defaultProps = {
    creatable: false
  };

  render = () => {
    const { onlyCreatable, categories } = this.props

    let specificProps = {}

    if (onlyCreatable) {
      specificProps = {
        creatable: true,
        noResultsText: '',
        placeholder: 'Názov tagu...'
      }
    } else {
      specificProps = {
        options: categories.state.list
      }
    }

    return (
      <Select
        searchable
        clearable
        // multi
        labelKey="title"
        valueKey="id"
        promptTextCreator={label => `Vytvoriť tag "${label}"`}
        {...this.props}
        {...specificProps}
      />
    )
  };
}

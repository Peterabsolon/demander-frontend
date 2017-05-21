import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Select } from 'components/fields'

import { apiCommon } from 'decorators/api'

@apiCommon({ tags: true })
export default class SelectCity extends Component {
  static propTypes = {
    onlyCreatable: PropTypes.bool,
    common: PropTypes.object.isRequired
  };

  static defaultProps = {
    creatable: false
  };

  render = () => {
    const { onlyCreatable, common: { tags } } = this.props

    let specificProps = {}

    if (onlyCreatable) {
      specificProps = {
        creatable: true,
        noResultsText: '',
        placeholder: 'Názov tagu...'
      }
    } else {
      specificProps = {
        options: tags.list
      }
    }

    return (
      <Select
        searchable
        clearable
        multi
        labelKey="name"
        valueKey="id"
        promptTextCreator={label => `Vytvoriť tag "${label}"`}
        {...this.props}
        {...specificProps}
      />
    )
  };
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Select } from 'components/fields'

import { apiCompanies } from 'decorators/api'

@apiCompanies({ list: true })
export default class SelectCompany extends Component {
  static propTypes = {
    onlyCreatable: PropTypes.bool,
    companies: PropTypes.object.isRequired
  };

  static defaultProps = {
    creatable: false
  };

  render = () => {
    const { onlyCreatable, companies } = this.props

    let specificProps = {}

    if (onlyCreatable) {
      specificProps = {
        creatable: true,
        noResultsText: '',
        placeholder: 'Názov tagu...'
      }
    } else {
      specificProps = {
        options: companies.state.list.map(item => ({
          title: item.company_name,
          id: item.id
        }))
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

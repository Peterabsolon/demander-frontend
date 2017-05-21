import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Select } from 'components/fields'

import { apiCommon } from 'decorators/api'

@apiCommon()
export default class SelectCity extends Component {
  static propTypes = {
    getCities: PropTypes.func.isRequired
  };

  render = () => (
    <Select
      getOptions={this.props.getCities}
      searchable
      labelKey="name"
      valueKey="id"
      multi
      {...this.props}
    />
  );
}

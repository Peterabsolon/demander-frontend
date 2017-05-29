import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { EntityDetail } from 'components/layout'
import {
  ServiceDetailSidebar,
  ServiceDetailContent
} from 'components/sections/services'

import { apiServices } from 'decorators/api'

@apiServices({
  detail: true
})
export default class ServiceDetail extends Component {
  static propTypes = {
    services: PropTypes.object.isRequired
  };

  render() {
    const { services } = this.props

    return (
      <EntityDetail
        data={services.state.detail}
        Sidebar={ServiceDetailSidebar}
        Content={ServiceDetailContent}
      />
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { EntityDetail } from 'components/layout'
import {
  ServiceDetailSidebar,
  ServiceDetailContent
} from 'components/sections/services'

import { apiServices, apiConversations } from 'decorators/api'

@apiServices({
  detail: true
})
@apiConversations()
export default class ServiceDetail extends Component {
  static propTypes = {
    services: PropTypes.object.isRequired,
    conversations: PropTypes.object.isRequired
  }

  render() {
    const { services, conversations } = this.props

    const {
      handleRequestService,
      handleRequestServiceSubmit
    } = conversations.api

    return (
      <EntityDetail
        data={services.state.detail}
        handleRequestService={handleRequestService}
        handleRequestServiceSubmit={handleRequestServiceSubmit}
        Sidebar={ServiceDetailSidebar}
        Content={ServiceDetailContent}
      />
    )
  }
}

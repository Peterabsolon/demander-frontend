import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  ConversationsContainer,
  ConversationsList
} from 'components/sections/dashboard/dashboard-conversations'

import { apiAuth, apiConversations } from 'decorators/api'

@apiAuth()
@apiConversations({
  list: true
})
export default class DashboardConversations extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render = () =>
    <ConversationsContainer>
      <ConversationsList {...this.props} />

      {this.props.children}
    </ConversationsContainer>
}

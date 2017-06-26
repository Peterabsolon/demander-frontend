import React, { Component } from 'react'
import { get } from 'lodash'
import PropTypes from 'prop-types'

import {
  ConversationContainer,
  ConversationMessages
} from 'components/sections/dashboard/dashboard-conversations'

import { ConversationMessageForm } from 'containers/forms/dashboard/dashboard-conversations'

import { apiAuth, apiConversations } from 'decorators/api'

@apiAuth()
@apiConversations({
  detail: true
})
export default class DashboardConversation extends Component {
  static propTypes = {
    conversations: PropTypes.shape({
      handleSubmitMessage: PropTypes.func.isRequired
    }).isRequired,
    auth: PropTypes.shape({
      user: PropTypes.object.isRequired
    }).isRequired
  }

  handleSubmitMessage = ({ message }) => {
    const { conversations, params } = this.props

    conversations.api.handleSubmitMessage(params.id, message)
  }

  render() {
    const { conversations, auth } = this.props

    const { detail } = conversations.state

    const user = get(auth, 'state.user')

    return (
      <ConversationContainer>
        <ConversationMessages user={user} detail={detail} />
        <ConversationMessageForm onSubmit={this.handleSubmitMessage} />
      </ConversationContainer>
    )
  }
}

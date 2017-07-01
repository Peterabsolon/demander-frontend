import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { NoConversationsYet } from './__elements__'

import style from './conversations-container.styl'

export default class ConversationsContainer extends Component {
  static propTypes = {
    conversations: PropTypes.object,
    children: PropTypes.any
  };

  render() {
    const { conversations } = this.props

    const hasConversations = conversations.state.list.items.length > 0
    const isLoaded = conversations.state.list.loaded

    return (
      <div className={style.wrapper}>
        {hasConversations
          ? this.props.children
          : isLoaded && <NoConversationsYet />}
      </div>
    )
  }
}

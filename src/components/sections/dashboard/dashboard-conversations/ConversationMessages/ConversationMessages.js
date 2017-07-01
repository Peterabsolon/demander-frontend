import React, { Component } from 'react'
import { get } from 'lodash'
import PropTypes from 'prop-types'

import { ConversationMessage } from './__elements__'

import style from './conversation-messages.styl'

export default class ConversationMessages extends Component {
  static propTypes = {
    detail: PropTypes.object,
    user: PropTypes.object
  };

  static defaultProps = {
    detail: []
  };

  constructor() {
    super()

    this.board = null
  }

  componentDidMount() {
    this.handleScrollToBottom()
  }

  componentDidUpdate(prevProps) {
    const lengthRoute = 'detail.data.messages.items.length'

    const count = get(this.props, lengthRoute)
    const prevCount = get(prevProps, lengthRoute)

    if (count !== prevCount) {
      this.handleScrollToBottom()
    }
  }

  handleScrollToBottom = () => {
    const element = document.querySelectorAll('.node-conversations-board')

    element[0].scrollTop = element[0].scrollHeight
  };

  render() {
    const { detail, user } = this.props

    const items = get(detail, 'data.messages.items', [])

    return (
      <div
        className={`${style.wrapper} node-conversations-board`}
        ref={node => (this.board = node)}
      >
        {items.length > 0 &&
          items.map(message =>
            <ConversationMessage
              key={message.id}
              user={user}
              message={message}
            />
          )}
      </div>
    )
  }
}

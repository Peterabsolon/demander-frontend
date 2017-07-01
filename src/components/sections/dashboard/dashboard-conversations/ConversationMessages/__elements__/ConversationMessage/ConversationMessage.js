import React, { Component } from 'react'
import moment from 'moment'
import { get } from 'lodash'
import cx from 'classnames'
import PropTypes from 'prop-types'

import style from './conversation-message.styl'

export default class ConversationMessage extends Component {
  static propTypes = {
    message: PropTypes.object,
    user: PropTypes.object
  };

  state = { isRevealed: false };

  componentDidMount() {
    setTimeout(() => this.setState({ isRevealed: true }), 50)
  }

  render() {
    const { message, user } = this.props
    const { isRevealed } = this.state

    const userId = get(user, 'id', null)
    const isInbound = userId !== message.user_id
    const createdAt = moment(message.created_at).format('HH:mm')
    const text = message.message
      .replace('\n\n', '<br /><br />')
      .replace('\n', '<br />')

    return (
      <div
        className={cx(style.wrapper, {
          [style.isInbound]: isInbound,
          [style.isRevealed]: isRevealed
        })}
      >
        <div className={style.message}>
          <div dangerouslySetInnerHTML={{ __html: text }} />
        </div>
        <div className={style.createdAt}>
          {createdAt}
        </div>
      </div>
    )
  }
}

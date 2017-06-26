import React, { Component } from 'react'
import { get } from 'lodash'
import PropTypes from 'prop-types'

import { ConversationMessage } from './__elements__'

import style from './conversation-messages.styl'

export default class ConversationMessages extends Component {
  static propTypes = {
    detail: PropTypes.object,
    user: PropTypes.object
  }

  static defaultProps = {
    detail: []
  }

  render() {
    const { detail, user } = this.props

    const items = get(detail, 'data.messages.items', [])
    const companyFrom = get(detail, 'data.companyFrom', {})
    const companyTo = get(detail, 'data.companyFrom', {})

    return (
      <div className={style.wrapper}>
        {items.length > 0 &&
          items.map(message =>
            <ConversationMessage
              user={user}
              message={message}
              companyFrom={companyFrom}
              companyTo={companyTo}
            />
          )}
      </div>
    )
  }
}

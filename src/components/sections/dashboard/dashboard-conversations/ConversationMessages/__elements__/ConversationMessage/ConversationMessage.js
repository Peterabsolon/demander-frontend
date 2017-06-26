import React, { Component } from 'react'
import { get } from 'lodash'
import cx from 'classnames'
import PropTypes from 'prop-types'

import style from './conversation-message.styl'

export default class ConversationMessage extends Component {
  static propTypes = {
    message: PropTypes.object,
    user: PropTypes.object,
    companyFrom: PropTypes.object
  }

  render() {
    const { message, user, companyFrom } = this.props

    console.log('companyFrom', companyFrom)

    const userId = get(user, 'id', null)
    // const sender = companyFrom
    const isInbound = userId !== message.user_id
    // console.log('userCompanyId', userCompanyId)
    // console.log('sender', sender)
    // console.log('companyFrom', companyFrom)

    return (
      <div
        className={cx(style.wrapper, {
          [style.isInbound]: isInbound
        })}
      >
        {message.message}
      </div>
    )
  }
}

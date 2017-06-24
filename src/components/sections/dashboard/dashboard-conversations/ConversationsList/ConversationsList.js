import React, { Component } from 'react'
import { get } from 'lodash'
import PropTypes from 'prop-types'

import { ConversationsListItem } from './__elements__'

import style from './conversations-list.styl'

export default class ConversationsList extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    conversations: PropTypes.object.isRequired
  }

  render() {
    const { conversations, auth } = this.props

    const items = get(conversations, 'list.items', [])
    const userCompanyId = get(auth, 'state.user.company.id')

    return (
      <div className={style.wrapper}>
        {items.length > 0 &&
          items.map(item =>
            <ConversationsListItem
              key={item.id}
              item={item}
              userCompanyId={userCompanyId}
            />
          )}
      </div>
    )
  }
}

import React, { Component } from 'react'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import Waypoint from 'react-waypoint'

import { ConversationsListItem } from './__elements__'

import style from './conversations-list.styl'

export default class ConversationsList extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    conversations: PropTypes.object.isRequired
  }

  render() {
    const { conversations, auth, params } = this.props
    const { list: { items, loading, loaded } } = conversations.state

    const userCompanyId = get(auth, 'state.user.company.id')
    const activeConversationId = parseInt(params.id)

    return (
      <div className={style.wrapper}>
        <div className={style.scrollArea}>
          {items.length > 0
            ? <div>
              {items.map(item =>
                <ConversationsListItem
                  key={item.id}
                  isActive={parseInt(item.id) === activeConversationId}
                  item={item}
                  userCompanyId={userCompanyId}
                />
                )}

              <Waypoint
                bottomOffset="-250px"
                onEnter={conversations.api.handleFetchMore}
              />
            </div>
            : !loading && loaded && <div>Damn</div>}
        </div>
      </div>
    )
  }
}

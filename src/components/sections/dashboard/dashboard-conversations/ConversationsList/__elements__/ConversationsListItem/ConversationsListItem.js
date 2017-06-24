import React, { Component } from 'react'
import cx from 'classnames'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import { formatFromNow } from 'utils/dates'

import { Title } from 'components/misc'

import style from './conversations-list-item.styl'

export default class ConversationsListItem extends Component {
  static propTypes = {
    userCompanyId: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired
  }

  render() {
    const { item, userCompanyId } = this.props

    const isInbound = item.receiver_company_id === userCompanyId
    const target = isInbound ? 'sender' : 'receiver'

    return (
      <div className={style.wrapper}>
        <div className={style.colLeft}>
          <div className={style.logo}>
            <img
              src={get(item, `${target}_company_logo`)}
              alt={get(item, `${target}_company_name`)}
            />
          </div>
        </div>
        <div className={style.colMiddle}>
          <div className={style.name}>
            <Title noCenter noMargin h5>
              {get(item, `${target}_company_name`)}
            </Title>
          </div>
          <div className={style.title}>
            <Title noCenter noMargin h5>
              {get(item, 'title')}
            </Title>
          </div>
          <div className={cx(style.meta, 'color--gray-alpha')}>
            <div
              className={cx(style.role, {
                [style.roleInbound]: isInbound
              })}
            >
              {isInbound ? 'Zájemce' : 'Poskytovatel'}
            </div>
            &middot;
            <div className={style.modifiedAt}>
              {formatFromNow(get(item, 'modified_at'))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

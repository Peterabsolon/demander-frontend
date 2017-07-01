import React, { Component } from 'react'
import { Link } from 'react-router'
import cx from 'classnames'
import { get } from 'lodash'
import PropTypes from 'prop-types'
import { formatFromNow } from 'utils/dates'

import { Title } from 'components/misc'

import style from './conversations-list-item.styl'

export default class ConversationsListItem extends Component {
  static propTypes = {
    isActive: PropTypes.bool.isRequired,
    userCompanyId: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired
  };

  render() {
    const { item, userCompanyId, isActive } = this.props

    const isInbound = item.company_id === userCompanyId
    const route = `/dashboard/konverzace/${get(item, 'id')}`
    const name = get(item, 'company_name') || get(item, 'creator_name')
    const logo = get(item, 'company_logo')

    return (
      <div
        className={cx(style.wrapper, {
          [style.isActive]: isActive
        })}
      >
        <Link to={route}>
          <div className={style.colLeft}>
            <div
              className={cx(style.logo, {
                [style.logoPlaceholder]: !logo
              })}
            >
              {logo
                ? <img src={logo} alt={name} />
                : <i className="material-icons">perm_identity</i>}
            </div>
          </div>
          <div className={style.colMiddle}>
            <div className={style.name}>
              <Title noCenter noMargin h5>
                {name}
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
        </Link>
      </div>
    )
  }
}

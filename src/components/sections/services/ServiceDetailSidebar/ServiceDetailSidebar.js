import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  CompanyInfo,
  CategoryBadge,
  TimeElapsedBadge
} from 'components/common'

import style from './service-detail-sidebar.styl'

export default class ServiceDetailSidebar extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { data } = this.props

    const { company = {}, category = {}, created_at } = data

    console.log('data', data)

    return data
      ? <div>
        <CompanyInfo company={company} />
        <div className={style.meta}>
          <CategoryBadge category={category} />

          <TimeElapsedBadge date={created_at} />
        </div>
      </div>
      : <div />
  }
}

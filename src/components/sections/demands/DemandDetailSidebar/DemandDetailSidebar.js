import React, { Component } from 'react'
import PropTypes from 'prop-types'

import {
  CompanyInfo,
  CategoryBadge,
  TimeElapsedBadge
} from 'components/common'

export default class DemandDetailSidebar extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { data } = this.props

    const { company = {}, category = {}, created_at } = data

    return data
      ? <div>
        <CompanyInfo company={company} />
        <div>
          <CategoryBadge category={category} />
          <TimeElapsedBadge date={created_at} />
        </div>
      </div>
      : <div />
  }
}

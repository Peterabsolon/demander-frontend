import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { LatestServices } from 'containers/common'

export default class DashboardServices extends Component {
  static propTypes = {
    companies: PropTypes.object.isRequired
  }

  render() {
    const { companies } = this.props

    return (
      <div>
        <LatestServices noTitle companyId={companies.state.detail.id} />
      </div>
    )
  }
}

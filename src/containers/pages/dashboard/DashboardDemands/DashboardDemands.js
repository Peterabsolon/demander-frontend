import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { LatestDemands } from 'containers/common'

export default class DashboardDemands extends Component {
  static propTypes = {
    companies: PropTypes.object.isRequired
  }

  render() {
    const { companies } = this.props

    return (
      <div>
        <LatestDemands noTitle companyId={companies.state.detail.id} />
      </div>
    )
  }
}

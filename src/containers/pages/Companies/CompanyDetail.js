import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { CompanyDetailSummary } from 'components/sections/companies'
import { LatestServices, LatestDemands } from 'containers/common'

import { apiCompanies } from 'decorators/api'

@apiCompanies({
  detail: true
})
export default class CompanyDetail extends Component {
  static propTypes = {
    companies: PropTypes.object.isRequired
  };

  render() {
    const { companies } = this.props

    return (
      <div>
        <CompanyDetailSummary data={companies.state.detail} />
        <LatestDemands />
        <LatestServices />
      </div>
    )
  }
}

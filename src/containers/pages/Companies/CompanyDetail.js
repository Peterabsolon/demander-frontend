import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { CompanyDetailSummary } from 'components/sections/companies'
import { LatestServices, LatestDemands } from 'containers/common'
import { Timeline } from 'components/common'
import { Section } from 'components/layout'

import { apiCompanies } from 'decorators/api'

@apiCompanies({
  detail: true,
})
export default class CompanyDetail extends Component {
  static propTypes = {
    companies: PropTypes.object.isRequired,
  }

  render() {
    const { companies } = this.props

    return (
      <div>
        <CompanyDetailSummary data={companies.state.detail} />
        <LatestDemands companyId={companies.state.detail.id} />
        <LatestServices companyId={companies.state.detail.id} />
        <Timeline />
        <Section textCenter borderTop>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d327864.24120414926!2d14.18544508487069!3d50.05933245499073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b939c0970798b%3A0x400af0f66164090!2sPrague!5e0!3m2!1sen!2scz!4v1494406654719"
            width="90%"
            height="450"
            frameBorder="0"
            allowFullScreen
          />
        </Section>
      </div>
    )
  }
}

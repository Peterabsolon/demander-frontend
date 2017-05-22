import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import { Feed } from 'containers/misc'
import { Button } from 'components/misc'
import { PageHeader } from 'components/layout'

import { apiCompanies } from 'decorators/api'

@apiCompanies({
  list: true
})
export default class Companies extends Component {
  static propTypes = {
    companies: PropTypes.any.isRequired
  };

  render() {
    const { companies } = this.props

    console.log('companies', companies)

    return (
      <div>
        <PageHeader
          title="Seznam dodavatelů"
          subtitle="Společnosti registrované v systému Demander"
        >
          <Button label="Registrovat společnost" />
        </PageHeader>
        {/* <Feed instance="companies" items={companies.list} /> */}
      </div>
    )
  }
}
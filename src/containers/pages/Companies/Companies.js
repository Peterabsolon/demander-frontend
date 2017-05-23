import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Feed } from 'containers/misc'
import { DataCard, Button } from 'components/misc'
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
          <Button
            to="/dodavatele/vytvorit"
            label="Registrovat společnost"
            icon="add"
          />
        </PageHeader>
        <Feed
          instance="companies"
          items={companies.state.list}
          Item={DataCard}
          handleFetchMore={companies.api.handleFetchMore}
          loaded={companies.state.loaded}
          loading={companies.state.listLoading}
          setFilter={companies.api.setFilter}
        />
      </div>
    )
  }
}

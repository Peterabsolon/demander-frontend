import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'

import { Feed, DataCard } from 'components/common'
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

  handleGoToEdit = id => browserHistory.push(`/dodavatele/${id}/upravit`);

  handleGoToDetail = id => browserHistory.push(`/dodavatele/${id}`);

  render() {
    const { companies } = this.props

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
          type="company"
          items={companies.state.list}
          Item={DataCard}
          handleFetchMore={companies.api.handleFetchMore}
          loaded={companies.state.loaded}
          loading={companies.state.listLoading}
          setFilter={companies.api.setFilter}
          handleGoToEdit={this.handleGoToEdit}
          handleGoToDetail={this.handleGoToDetail}
          handleDeleteItem={companies.api.handleDeleteEntity}
        />
      </div>
    )
  }
}

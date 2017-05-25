import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'

import { DataCard, Feed } from 'components/common'
import { Button } from 'components/misc'
import { PageHeader } from 'components/layout'

import { apiServices } from 'decorators/api'

@apiServices({
  list: true
})
export default class Services extends Component {
  static propTypes = {
    services: PropTypes.any.isRequired
  };

  handleGoToDetail = id => browserHistory.push(`/sluzby/${id}/upravit`);

  render() {
    const { services } = this.props

    console.log('services', services)

    return (
      <div>
        <PageHeader
          title="Přehled služeb"
          subtitle="Aktuální nabízené služby v systému Demander"
        >
          <Button to="/sluzby/pridat" icon="add" label="Přidat službu" />
        </PageHeader>
        <Feed
          dark
          instance="services"
          type="service"
          items={services.state.list}
          Item={DataCard}
          handleFetchMore={services.api.handleFetchMore}
          loaded={services.state.loaded}
          loading={services.state.listLoading}
          setFilter={services.api.setFilter}
          handleGoToDetail={this.handleGoToDetail}
          handleDeleteItem={services.api.handleDeleteEntity}
        />
      </div>
    )
  }
}

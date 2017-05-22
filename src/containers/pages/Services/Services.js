import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Feed } from 'containers/misc'
import { DataCard, Button } from 'components/misc'
import { PageHeader } from 'components/layout'

import { apiServices } from 'decorators/api'

@apiServices({
  list: true
})
export default class Services extends Component {
  static propTypes = {
    services: PropTypes.any.isRequired
  };

  render() {
    const { services } = this.props

    console.log('services', services)

    return (
      <div>
        <PageHeader
          title="Přehled služeb"
          subtitle="Aktuální nabízené služby v systému Demander"
        >
          <Button label="Přidat službu" />
        </PageHeader>
        <Feed
          instance="services"
          items={services.state.list}
          Item={DataCard}
          handleFetchMore={services.api.handleFetchMore}
          loaded={services.state.loaded}
          loading={services.state.listLoading}
          setFilter={services.api.setFilter}
        />

      </div>
    )
  }
}

import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'

import { Feed, DataCard } from 'components/common'
import { Button } from 'components/misc'
import { PageHeader } from 'components/layout'

import { apiDemands } from 'decorators/api'

@apiDemands({
  list: true
})
export default class Demands extends Component {
  static propTypes = {
    demands: PropTypes.object.isRequired
  };

  handleGoToEdit = id => browserHistory.push(`/poptavky/${id}/upravit`);

  handleGoToDetail = id => browserHistory.push(`/poptavky/${id}`);

  render() {
    const { demands } = this.props

    return (
      <div>
        <PageHeader
          title="Seznam poptávek"
          subtitle="Aktuální poptávky v systému Demander"
        >
          <Button
            to="/poptavky/vytvorit"
            label="Vytvořit poptávku"
            icon="add"
          />
        </PageHeader>
        <Feed
          instance="demands"
          type="demand"
          items={demands.state.list}
          Item={DataCard}
          handleFetchMore={demands.api.handleFetchMore}
          loaded={demands.state.loaded}
          loading={demands.state.listLoading}
          setFilter={demands.api.setFilter}
          handleGoToEdit={this.handleGoToEdit}
          handleGoToDetail={this.handleGoToDetail}
          handleDeleteItem={demands.api.handleDeleteEntity}
        />
      </div>
    )
  }
}

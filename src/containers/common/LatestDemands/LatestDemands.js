import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'

import { LatestFeed, DataCard } from 'components/common'
import { Button } from 'components/misc'

import { apiDemands } from 'decorators/api'

@apiDemands({
  list: true
})
export default class LatestDemands extends Component {
  static propTypes = {
    demands: PropTypes.object,
    noTitle: PropTypes.bool
  }

  handleGoToEdit = id => browserHistory.push(`/poptavky/${id}/upravit`)

  handleGoToDetail = id => browserHistory.push(`/poptavky/${id}`)

  render() {
    const { noTitle, demands } = this.props

    return (
      <LatestFeed
        type="demand"
        handleGoToEdit={this.handleGoToEdit}
        handleGoToDetail={this.handleGoToDetail}
        title={!noTitle && 'Nejnovejší poptávky'}
        items={demands.state.list}
        Item={DataCard}
        button={
          <Button
            to="/poptavky/vytvorit"
            label="Vytvořit poptávku"
            icon="add"
          />
        }
      />
    )
  }
}

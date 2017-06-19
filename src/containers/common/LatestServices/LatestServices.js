import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'

import { LatestFeed, DataCard } from 'components/common'
import { Button } from 'components/misc'

import { apiServices } from 'decorators/api'

@apiServices({
  list: true
})
export default class LatestServices extends Component {
  static propTypes = {
    services: PropTypes.object,
    noTitle: PropTypes.bool
  }

  handleGoToEdit = id => browserHistory.push(`/sluzby/${id}/upravit`)

  handleGoToDetail = id => browserHistory.push(`/sluzby/${id}`)

  render() {
    const { services, noTitle } = this.props

    return (
      <LatestFeed
        dark
        type="demand"
        handleGoToEdit={this.handleGoToEdit}
        handleGoToDetail={this.handleGoToDetail}
        title={!noTitle && 'Nejnovější nabídky služeb'}
        items={services.state.list}
        Item={DataCard}
        button={
          <Button to="/sluzby/pridat" label="Nabídnout službu" icon="add" />
        }
      />
    )
  }
}

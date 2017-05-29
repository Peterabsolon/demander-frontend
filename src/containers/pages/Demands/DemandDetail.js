import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { EntityDetail } from 'components/layout'
import {
  DemandDetailSidebar,
  DemandDetailContent
} from 'components/sections/demands'

import { apiDemands } from 'decorators/api'

@apiDemands({
  detail: true
})
export default class DemandDetail extends Component {
  static propTypes = {
    demands: PropTypes.object.isRequired
  };

  render() {
    const { demands } = this.props

    return (
      <EntityDetail
        data={demands.state.detail}
        Sidebar={DemandDetailSidebar}
        Content={DemandDetailContent}
      />
    )
  }
}

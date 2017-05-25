import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { HomePresentation } from 'components/sections/home'
import { LatestDemands, LatestServices } from 'containers/common'

import { apiCategories } from 'decorators/api'

// Preload categories
@apiCategories({
  list: true
})
export default class Home extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (
      <div>
        <HomePresentation />
        <LatestDemands />
        <LatestServices />
      </div>
    )
  }
}

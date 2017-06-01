import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { ContactPresentation } from 'components/sections/contact'

// import { HomePresentation } from 'components/sections/home'
// import { LatestDemands, LatestServices } from 'containers/common'
//
// import { apiCategories } from 'decorators/api'

// Preload categories
// @apiCategories({
//   list: true
// })
export default class Contact extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  render() {
    return (
      <div>
        <div>
          <ContactPresentation />
          {/* <HomePresentation />
          <LatestDemands />
          <LatestServices /> */}
        </div>
      </div>
    )
  }
}

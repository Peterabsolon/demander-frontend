import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { AboutPresentation } from 'components/sections/about'

export default class About extends Component {
  static propTypes = {
    children: PropTypes.any,
  }

  render() {
    return (
      <div>
        <AboutPresentation />
      </div>
    )
  }
}

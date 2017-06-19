import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class DashboardProfile extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

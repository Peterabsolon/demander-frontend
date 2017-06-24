import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { apiConversations } from 'decorators/api'

@apiConversations({
  list: true
})
export default class DashboardDemands extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

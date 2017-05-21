import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class LineDivider extends Component {
  static propTypes = {
    offsetLeft: PropTypes.any
  };

  render() {
    const { offsetLeft } = this.props

    return (
      <div style={{ marginLeft: offsetLeft }}>
        <hr />
      </div>
    )
  }
}

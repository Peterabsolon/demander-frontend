import React, { Component } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import { Badge } from 'components/layout'

export default class TimeElapsedBadge extends Component {
  static propTypes = {
    date: PropTypes.string
  };

  render() {
    const { date } = this.props

    return <Badge icon="alarm" content={moment(date).fromNow()} />
  }
}

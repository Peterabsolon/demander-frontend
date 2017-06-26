import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './conversation-container.styl'

export default class ConversationContainer extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return <div className={style.wrapper}>{this.props.children}</div>
  }
}

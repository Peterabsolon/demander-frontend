import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './conversations-container.styl'

export default class ConversationsContainer extends Component {
  static propTypes = {
    children: PropTypes.any
  }

  render() {
    return (
      <div className={style.wrapper}>
        {this.props.children}
      </div>
    )
  }
}

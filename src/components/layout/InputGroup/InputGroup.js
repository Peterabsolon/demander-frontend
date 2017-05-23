import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './input-group.styl'

export default class InputGroup extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return <div className={style.wrapper}>{this.props.children}</div>
  }
}

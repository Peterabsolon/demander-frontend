import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import style from './text-box.styl'

export default class TextBox extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
  };

  render() {
    const { children, className } = this.props

    return (
      <div className={cx(style.wrapper, className)}>
        {children}
      </div>
    )
  }
}

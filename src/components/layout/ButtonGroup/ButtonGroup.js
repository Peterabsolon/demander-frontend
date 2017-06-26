import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import style from './button-group.styl'

export default class ButtonGroup extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    stretch: PropTypes.bool
  }

  render() {
    const { className, stretch } = this.props

    return (
      <div
        className={cx(style.wrapper, {
          [style.stretch]: stretch,
          [className]: className
        })}
      >
        {this.props.children}
      </div>
    )
  }
}

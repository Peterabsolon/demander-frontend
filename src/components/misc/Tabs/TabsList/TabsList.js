import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import style from './tabs-list.styl'

export default class TabsList extends Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    large: PropTypes.bool
  }

  render() {
    const { className, large } = this.props

    return (
      <div
        className={cx(style.wrapper, {
          [className]: className,
          [style.large]: large
        })}
      >
        {this.props.children}
      </div>
    )
  }
}

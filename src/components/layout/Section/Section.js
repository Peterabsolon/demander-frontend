import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import style from './section.styl'

export default class Section extends Component {
  static propTypes = {
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    children: PropTypes.any,
    maxWidth: PropTypes.number,
    gutters: PropTypes.bool,
    noBorder: PropTypes.bool
  };

  static defaultProps = {
    maxWidth: 1000
  };

  render() {
    const {
      className,
      contentClassName,
      noBorder,
      gutters,
      maxWidth
    } = this.props

    return (
      <div
        className={cx(style.wrapper, {
          [className]: className,
          [style.noBorder]: noBorder,
          [style.gutters]: gutters
        })}
      >
        <div
          style={{ maxWidth: maxWidth ? `${maxWidth}px` : 'none' }}
          className={cx(style.content, {
            [contentClassName]: contentClassName
          })}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

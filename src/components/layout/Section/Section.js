import React, { Component } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import style from './section.styl'

export default class Section extends Component {
  static propTypes = {
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    children: PropTypes.any,
    // maxWidth: PropTypes.number,
    gutters: PropTypes.bool,
    noGuttersTop: PropTypes.bool,
    loading: PropTypes.bool,
    guttersHalf: PropTypes.bool,
    borderTop: PropTypes.bool,
    textCenter: PropTypes.bool,
    noBorder: PropTypes.bool
  }

  static defaultProps = {
    maxWidth: 1050
  }

  render() {
    const {
      className,
      textCenter,
      contentClassName,
      noBorder,
      gutters,
      noGuttersTop,
      loading,
      guttersHalf,
      borderTop
      // maxWidth
    } = this.props

    return (
      <div
        className={cx(style.wrapper, {
          [className]: className,
          [style.noBorder]: noBorder,
          [style.loading]: loading,
          [style.borderTop]: borderTop,
          [style.textCenter]: textCenter,
          [style.gutters]: gutters,
          [style.guttersHalf]: guttersHalf,
          [style.noGuttersTop]: noGuttersTop
        })}
      >
        <div
          // style={{ maxWidth: maxWidth ? `${maxWidth}px` : 'none' }}
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

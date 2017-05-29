import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import style from './paragraph.styl'

export default class Paragraph extends Component {
  static propTypes = {
    children: PropTypes.any,
    primary: PropTypes.bool,
    secondary: PropTypes.bool,
    noMargin: PropTypes.bool,
    white: PropTypes.bool,
    center: PropTypes.bool
  };

  render() {
    const { center, primary, secondary, noMargin, white } = this.props

    return (
      <p
        className={cx(style.wrapper, {
          [style.primary]: primary,
          [style.secondary]: secondary,
          [style.noMargin]: noMargin,
          [style.white]: white,
          [style.center]: center
        })}
      >
        {this.props.children}
      </p>
    )
  }
}

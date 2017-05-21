import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import style from './paragraph.styl'

export default class Paragraph extends Component {
  static propTypes = {
    children: PropTypes.any,
    primary: PropTypes.bool
  };

  render() {
    const { primary } = this.props

    return (
      <p
        className={cx(style.wrapper, {
          [style.primary]: primary
        })}
      >
        {this.props.children}
      </p>
    )
  }
}

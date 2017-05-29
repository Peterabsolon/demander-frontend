import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import style from './button-group.styl'

export default class ButtonGroup extends Component {
  static propTypes = {
    children: PropTypes.any,
    stretch: PropTypes.bool
  };

  render() {
    const { stretch } = this.props

    return (
      <div
        className={cx(style.wrapper, {
          [style.stretch]: stretch
        })}
      >
        {this.props.children}
      </div>
    )
  }
}

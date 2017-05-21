import React, { Component } from 'react'
import cx from 'classnames'
import { Link } from 'react-router'
import PropTypes from 'prop-types'

import style from './logo.styl'

export default class Logo extends Component {
  static propTypes = {
    className: PropTypes.string,
    large: PropTypes.bool
  };

  render() {
    const { className, large } = this.props

    return (
      <div
        className={cx(style.wrapper, {
          [className]: className,
          [style.large]: large
        })}
      >
        <Link to="/">
          {large
            ? <img
              src={require('assets/img/logo-primary.png')}
              alt="Demander"
            />
            : <img
              src={require('assets/img/logo-shadow.png')}
              alt="Demander"
            />}
        </Link>
      </div>
    )
  }
}

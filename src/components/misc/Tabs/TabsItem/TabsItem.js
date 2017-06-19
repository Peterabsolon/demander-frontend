import React, { Component } from 'react'
import cx from 'classnames'
// import { Link } from 'react-router'
import PropTypes from 'prop-types'

import { Title, Link } from 'components/misc'

import style from './tabs-item.styl'

export default class TabsItem extends Component {
  static propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    to: PropTypes.string,
    isActive: PropTypes.bool,
    large: PropTypes.bool
  }

  render() {
    const { className, label, large, isActive, to } = this.props

    return (
      <div
        className={cx(style.wrapper, {
          [className]: className,
          [style.isActive]: isActive,
          [style.large]: large
        })}
      >
        <Link to={to}>
          <Title noMargin h4>{label}</Title>
        </Link>
      </div>
    )
  }
}

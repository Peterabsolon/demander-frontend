import React, { Component, PropTypes } from 'react'

import { Link } from 'components/misc'

import style from './nav-link.styl'

export default class NavLink extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    index: PropTypes.bool,
    label: PropTypes.string.isRequired
  };

  render() {
    const { to, label, index } = this.props

    return (
      <Link
        to={to}
        index={index}
        className={style.link}
        activeClassName={style.linkActive}
      >
        {label}
      </Link>
    )
  }
}

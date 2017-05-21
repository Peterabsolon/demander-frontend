import React, { Component, PropTypes } from 'react'

import { Link } from 'components/misc'

import style from './nav-link.styl'

export default class NavLink extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  };

  render() {
    const { to, label } = this.props

    return (
      <Link to={to} className={style.link} activeClassName={style.linkActive}>
        {label}
      </Link>
    )
  }
}

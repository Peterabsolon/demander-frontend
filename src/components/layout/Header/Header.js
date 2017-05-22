import React, { Component } from 'react'
import Headroom from 'react-headroom'
// import PropTypes from 'prop-types'

import NavLink from './NavLink/NavLink'
import {
  // Button,
  Logo
} from 'components/misc'

import style from './header.styl'

export default class Header extends Component {
  static propTypes = {
    // handleLogout: PropTypes.func.isRequired
  };

  render() {
    return (
      <Headroom>
        <div className={style.wrapper}>
          <div className="container-fluid">
            <div className={style.content}>
              <div className={style.logo}>
                <Logo />
              </div>

              <nav>
                <NavLink index to="/" label="Domů" />
                <NavLink to="/poptavky" label="Poptávky" />
                <NavLink to="/sluzby" label="Služby" />
                <NavLink to="/dodavatele" label="Dodavatelé" />
              </nav>

              {/* <Button
              label="Odhlásiť sa"
              noBackground
              className={style.btnLogout}
              onClick={this.props.handleLogout}
            /> */}
            </div>
          </div>
        </div>
      </Headroom>
    )
  }
}

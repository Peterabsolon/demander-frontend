import React, { Component } from 'react'
import Headroom from 'react-headroom'
import PropTypes from 'prop-types'

import NavLink from './NavLink/NavLink'
import { Button, Logo } from 'components/misc'

import { apiAuth } from 'decorators/api'

import style from './header.styl'

@apiAuth()
export default class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  render() {
    const { auth } = this.props

    const isLoggedIn = auth.state.isLoggedIn

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
                <NavLink to="/o-projektu" label="Jak to funguje" />
                <NavLink to="/kontakt" label="Kontakt" />
              </nav>

              <Button
                label={isLoggedIn ? 'Odhlásit' : 'Přihlášení'}
                icon="perm_identity"
                noBackground
                white
                className={style.btnLogout}
                to={!isLoggedIn ? '/prihlaseni' : ''}
                onClick={isLoggedIn ? auth.api.handleLogout : () => {}}
              />

              {/* <div className={style.socialLinks}>
                <i className="ico ico--facebook" />
                <i className="ico ico--twitter" />
                <i className="ico ico--linkedin" />
              </div> */}
            </div>
          </div>
        </div>
      </Headroom>
    )
  }
}

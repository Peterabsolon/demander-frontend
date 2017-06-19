import React, { Component } from 'react'
import Headroom from 'react-headroom'
import PropTypes from 'prop-types'

import NavLink from './NavLink/NavLink'
import { Logo, PopoverMenu } from 'components/misc'

import { apiAuth } from 'decorators/api'

import style from './header.styl'

@apiAuth()
export default class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  render() {
    const { auth } = this.props

    const isLoggedIn = auth.state.isLoggedIn
    // const user = get(auth, 'state.user')
    //

    console.log('isLoggedIn', isLoggedIn)

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
                <NavLink to="/o-projektu" label="O projektu" />
                <NavLink to="/kontakt" label="Kontakt" />
              </nav>

              <PopoverMenu
                label={isLoggedIn ? 'Můj účet' : 'Přihlášení'}
                icon="perm_identity"
                className={style.popover}
                to={!isLoggedIn ? '/prihlaseni' : ''}
                items={[
                  { to: '/dashboard/profil', label: 'Profil' },
                  { to: '/dashboard/sluzby', label: 'Služby' },
                  { to: '/dashboard/poptavky', label: 'Poptávky' },
                  { to: '/dashboard/konverzace', label: 'Konverzace' }
                ]}
                extraItems={[
                  { onClick: auth.api.handleLogout, label: 'Odhlásit' }
                ]}
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

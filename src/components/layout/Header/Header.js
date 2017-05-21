import React, { Component, PropTypes } from 'react'

import NavLink from './NavLink/NavLink'
import { Button, Logo } from 'components/misc'

import style from './header.styl'

export default class Header extends Component {
  static propTypes = {
    handleLogout: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className={style.wrapper}>
        <div className="container-fluid">
          <div className={style.content}>
            <div className={style.logo}>
              <Logo />
            </div>

            <nav>
              <NavLink to="/otazky" label="Otázky" />
              <NavLink to="/vytvorit-otazku" label="Vytvoriť otázku" />
              <NavLink to="/clanky" label="Články" />
              <NavLink to="/vytvorit-clanok" label="Vytvoriť článok" />
              <NavLink to="/nastavenia" label="Nastavenia" />
            </nav>

            <Button
              label="Odhlásiť sa"
              noBackground
              className={style.btnLogout}
              onClick={this.props.handleLogout}
            />
          </div>
        </div>
      </div>
    )
  }
}

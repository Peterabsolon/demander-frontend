import React, { Component, PropTypes } from 'react'

import { Logo, Title } from 'components/misc'

import style from './unauthorized.styl'

export default class Unauthorized extends Component {
  static propTypes = {
    children: PropTypes.any
  };

  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.colLeft} />
        <div className={style.colRight}>
          <div className={style.logo}>
            <Logo />
          </div>
          <Title h2>Prihlásenie</Title>
          <div className={style.content}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

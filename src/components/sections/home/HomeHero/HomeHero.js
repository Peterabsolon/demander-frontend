import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import { Logo, Button } from 'components/misc'

import style from './home-hero.styl'

export default class HomeHero extends Component {
  static propTypes = {
    something: PropTypes.any
  };

  state = {
    scrollPosition: 0
  };

  render() {
    return (
      <div className={cx(style.wrapper, 'container-fluid')}>
        <div className={style.content}>
          <Logo large className="base-margin--double" />
          <div className={style.buttons}>
            <Button
              className="base-margin--right"
              terniary
              icon="add"
              label="Přidat poptávku"
            />
            <Button label="Najít službu" icon="search" />
          </div>
        </div>
      </div>
    )
  }
}

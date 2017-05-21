import React, { Component, PropTypes } from 'react'
import { throttle } from 'lodash'
import cx from 'classnames'

import { Header } from 'components/layout'
import { HomeHero } from 'components/sections/home'

import style from './unauthorized.styl'

export default class Unauthorized extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    route: PropTypes.object.isRequired
  };

  constructor() {
    super()

    this.handleScroll = throttle(this.handleScroll, 5)

    this.state = { scrollPos: 0 }
  }

  componentDidMount() {
    if (typeof window !== undefined) {
      window.addEventListener('scroll', this.handleScroll)
    }
  }

  componentWillUnmount() {
    if (typeof window !== undefined) {
      window.removeEventListener('scroll', this.handleScroll)
    }
  }

  handleScroll = event =>
    this.setState({ scrollPos: event.srcElement.body.scrollTop });

  render() {
    const { route: { isHome } } = this.props
    const { scrollPos } = this.state

    const itemTranslate = Math.min(1000, scrollPos / 6)

    return (
      <div>
        <Header />
        <div
          style={{
            transform: 'translate3d(0px,' + itemTranslate + 'px, 0px)'
          }}
          className={cx(style.hero, {
            [style.isHome]: isHome
          })}
        >
          <div className={style.heroContent}>
            {isHome && <HomeHero />}
          </div>
        </div>

        <div className={style.page}>
          <div className="container-fluid">
            <div className={style.content}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

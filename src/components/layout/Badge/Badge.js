import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Title } from 'components/misc'

import style from './badge.styl'

export default class Badge extends Component {
  static propTypes = {
    icon: PropTypes.string,
    content: PropTypes.any
  };

  render() {
    const { icon, content } = this.props

    return (
      <div className={style.wrapper}>
        <Title h5 gray>
          <i className="material-icons">{icon}</i>
          {' '}
          <div className={style.content}>
            {content}
          </div>
        </Title>
      </div>
    )
  }
}

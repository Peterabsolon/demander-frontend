import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Title } from 'components/misc'

import style from './no-conversations-yet.styl'

export default class NoConversationsYet extends Component {
  static propTypes = {
    something: PropTypes.any
  };

  render() {
    return (
      <div className={style.wrapper}>
        <Title h3>Ještě jste nezačali žádnou konverzaci.</Title>
      </div>
    )
  }
}

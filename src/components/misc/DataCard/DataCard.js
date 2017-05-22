import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './data-card.styl'

export default class DataCard extends Component {
  static propTypes = {
    something: PropTypes.any
  };

  render() {
    return (
      <div className={style.wrapper}>
        DataCard
      </div>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './logo.styl'

export default class Logo extends Component {
  static propTypes = {
    something: PropTypes.any
  };

  render() {
    return (
      <div className={style.wrapper}>
        nas<span className={style.dot}>.</span>nazor
      </div>
    )
  }
}

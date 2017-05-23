import React, { Component } from 'react'
import PropTypes from 'prop-types'

import style from './form-header.styl'

export default class FormHeader extends Component {
  static propTypes = {
    number: PropTypes.number,
    label: PropTypes.string
  };

  render() {
    const { number, label } = this.props

    return (
      <div className={style.wrapper}>
        <div className={style.number}>
          {number}
        </div>
        {label}
      </div>
    )
  }
}

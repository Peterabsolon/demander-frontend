import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Title, Link } from 'components/misc'

import style from './not-found.styl'

export default class NotFound extends Component {
  static propTypes = {
    something: PropTypes.any
  };

  render() {
    return (
      <div className={style.page}>
        <div className={style.wrapper}>
          <Title h2>These are not the droids you're looking for.</Title>
          <Link className="color--primary text--underline" to="/login">
            Return to login
          </Link>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import { Title, Paragraph } from 'components/misc'

import style from './feature-item.styl'

export default class FeatureItem extends Component {
  static propTypes = {
    primary: PropTypes.bool,
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    button: PropTypes.element.isRequired
  };

  render() {
    const { icon, title, content, primary, button } = this.props

    return (
      <div
        className={cx(style.wrapper, {
          [style.primary]: primary
        })}
      >
        <div className={style.icon}>
          <i className={`ico ${icon}`} />
        </div>
        <div className={style.title}>
          <Title h3>{title}</Title>
        </div>
        <div className={style.content}>
          <Paragraph>{content}</Paragraph>
        </div>
        <div className={style.button}>
          {button}
        </div>
      </div>
    )
  }
}

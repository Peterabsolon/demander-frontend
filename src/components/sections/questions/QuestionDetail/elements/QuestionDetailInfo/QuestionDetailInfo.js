import React, { Component } from 'react'
import { get } from 'lodash'
import PropTypes from 'prop-types'

import { TextBox, Title } from 'components/misc'

import style from './question-detail-info.styl'

export default class QuestionInfo extends Component {
  static propTypes = {
    activeItem: PropTypes.object
  };

  render() {
    const { activeItem } = this.props

    const title = get(activeItem, 'title')
    const text = get(activeItem, 'text')

    return (
      <div className={style.wrapper}>
        <TextBox className="base-margin-small--bottom">
          <Title h2 className="reset--margin">{title}</Title>
        </TextBox>
        <TextBox>
          <p className="reset--margin">{text}</p>
        </TextBox>
      </div>
    )
  }
}

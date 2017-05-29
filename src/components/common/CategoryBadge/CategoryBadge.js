import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Title } from 'components/misc'

import style from './category-badge.styl'

export default class CategoryBadge extends Component {
  static propTypes = {
    category: PropTypes.object
  };

  render() {
    const { category } = this.props

    return category
      ? <div className={style.wrapper}>
        <Title h5 gray>
          <i className="material-icons">{category.icon}</i>
          {' '}
          {category.title}
        </Title>
      </div>
      : <div />
  }
}

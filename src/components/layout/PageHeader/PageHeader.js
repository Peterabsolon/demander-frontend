import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Title } from 'components/misc'
import { Section } from 'components/layout'

import style from './page-header.styl'

export default class PageHeader extends Component {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    subtitle: PropTypes.string
  };

  render() {
    const { title, subtitle } = this.props

    return (
      <Section guttersHalf textCenter contentClassName={style.wrapper}>
        <div className={style.content}>
          {title &&
            <Title h2 noMargin={!subtitle} smallMargin={subtitle}>
              {title}
            </Title>}
          {subtitle &&
            <Title h4 noMargin>
              {subtitle}
            </Title>}
        </div>
        <div className={style.actions}>
          {this.props.children}
        </div>
      </Section>
    )
  }
}

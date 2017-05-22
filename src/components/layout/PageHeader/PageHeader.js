import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Title } from 'components/misc'
import { Section } from 'components/layout'

export default class PageHeader extends Component {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    subtitle: PropTypes.string
  };

  render() {
    const { title, subtitle } = this.props

    return (
      <Section guttersHalf textCenter>
        {title && <Title h2>{title}</Title>}
        {subtitle && <Title h4>{subtitle}</Title>}
        {this.props.children}
      </Section>
    )
  }
}

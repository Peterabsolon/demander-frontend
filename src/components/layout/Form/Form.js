import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import { Section } from 'components/layout'
import style from './form.styl'

export default class Form extends Component {
  static propTypes = {
    children: PropTypes.any,
    mediumWide: PropTypes.bool,
    wide: PropTypes.bool,
    loading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired
  };

  render() {
    const { wide, mediumWide, loading } = this.props

    return (
      <form
        className={cx(style.wrapper, {
          [style.wide]: wide,
          [style.mediumWide]: mediumWide,
          [style.loading]: loading
        })}
        onSubmit={this.props.onSubmit}
      >
        <Section {...this.props}>
          {this.props.children}
        </Section>
      </form>
    )
  }
}

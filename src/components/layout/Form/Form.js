import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import { Section } from 'components/layout'
import { FormStepper } from 'components/misc'
import style from './form.styl'

export default class Form extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    mediumWide: PropTypes.bool,
    wide: PropTypes.bool,
    loading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    steps: PropTypes.array
  }

  render() {
    const { className, wide, mediumWide, loading, steps } = this.props

    return (
      <form
        className={cx(style.wrapper, {
          [className]: className,
          [style.wide]: wide,
          [style.mediumWide]: mediumWide,
          [style.loading]: loading
        })}
        onSubmit={this.props.onSubmit}
      >
        <Section {...this.props}>
          {steps
            ? <FormStepper {...this.props} steps={steps} />
            : this.props.children}
        </Section>
      </form>
    )
  }
}

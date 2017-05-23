import React, { Component } from 'react'
import { FormattedHTMLMessage } from 'react-intl'
import PropTypes from 'prop-types'
import cx from 'classnames'

import styles from './field-label.styl'

export default class FieldLabel extends Component {
  static propTypes = {
    labelless: PropTypes.bool,
    label: PropTypes.string,
    intlKey: PropTypes.string,
    optional: PropTypes.bool,
    required: PropTypes.bool,
    isFocused: PropTypes.bool,
    inline: PropTypes.bool,
    inlineLabelWidth: PropTypes.string,
    name: PropTypes.string.isRequired
  };

  render() {
    const {
      label,
      name,
      intlKey,
      inline,
      optional,
      required,
      labelless,
      inlineLabelWidth,
      isFocused
    } = this.props

    console.log('isFocused', isFocused)

    const srOnlyClass = labelless ? 'sr-only' : ''

    return (
      <label
        htmlFor={name}
        className={cx('control-label', styles.label, {
          [srOnlyClass]: srOnlyClass,
          [styles.isFocused]: isFocused,
          [styles.inline]: inline
        })}
        style={{ minWidth: inlineLabelWidth }}
      >
        {intlKey
          ? <FormattedHTMLMessage id={intlKey} defaultMessage={label} />
          : label}
        {optional && ' '}
        {optional &&
          <FormattedHTMLMessage
            id="label.optional"
            defaultMessage="(optional)"
          />}
        {required && <span className={styles.required}> *</span>}
      </label>
    )
  }
}

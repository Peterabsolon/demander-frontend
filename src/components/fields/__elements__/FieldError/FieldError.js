import React, { Component } from 'react'
import { get } from 'lodash'
import { FormattedHTMLMessage } from 'react-intl'
import styles from './field-error.styl'

export default class FieldError extends Component {
  static propTypes = {
    toShow: React.PropTypes.any,
    inlineLabelWidth: React.PropTypes.string,
    message: React.PropTypes.any,
    className: React.PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  render() {
    const { toShow, message, className, inlineLabelWidth } = this.props

    const style = inlineLabelWidth ? { marginLeft: inlineLabelWidth } : {}

    return (
      <span
        className={
          `${className} ${styles.error} ${toShow ? styles.active : ''}`
        }
        style={style}
      >
        {message && message.intlKey
          ? <FormattedHTMLMessage
            id={message.intlKey}
            defaultMessage={message.text}
            values={message.values}
          />
          : get(message, 'text') || message}
      </span>
    )
  }
}

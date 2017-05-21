import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

export default class Title extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    h1: PropTypes.bool,
    h2: PropTypes.bool,
    h3: PropTypes.bool,
    h4: PropTypes.bool,
    h5: PropTypes.bool,
    h6: PropTypes.bool,
    intlKey: PropTypes.string
  };

  renderContent = () => {
    const { intlKey, children } = this.props

    if (intlKey) {
      return (
        <FormattedMessage
          id={intlKey}
          defaultMessage={typeof children === 'string' ? children : ''}
        />
      )
    }
    return children
  };

  render() {
    const { h1, h2, h3, h4, h5, h6, className, style } = this.props

    if (h1) {
      return (
        <h1 className={className} style={style}>{this.renderContent()}</h1>
      )
    }
    if (h2) {
      return (
        <h2 className={className} style={style}>{this.renderContent()}</h2>
      )
    }
    if (h3) {
      return (
        <h3 className={className} style={style}>{this.renderContent()}</h3>
      )
    }
    if (h4) {
      return (
        <h4 className={className} style={style}>{this.renderContent()}</h4>
      )
    }
    if (h5) {
      return (
        <h5 className={className} style={style}>{this.renderContent()}</h5>
      )
    }
    if (h6) {
      return (
        <h6 className={className} style={style}>{this.renderContent()}</h6>
      )
    }

    return null
  }
}

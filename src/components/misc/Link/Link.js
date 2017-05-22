/**
 * This is just for autoinjecting global 'link' class
 * We're already importing { Link } from 'react-router' everytime
 * so why not have something extra?
 */

import React, { Component } from 'react'
import cx from 'classnames'
import { Link as RouterLink, IndexLink } from 'react-router'
import { omit } from 'lodash'
import PropTypes from 'prop-types'

export default class Link extends Component {
  static propTypes = {
    className: PropTypes.any,
    primary: PropTypes.bool,
    index: PropTypes.bool,
    noGlobalClass: PropTypes.bool
  };

  render() {
    const { className, noGlobalClass, primary, index } = this.props

    const linkProps = omit(this.props, ['noGlobalClass', 'primary', 'index'])

    const LinkComponent = index ? IndexLink : RouterLink

    return (
      <LinkComponent
        {...linkProps}
        className={cx({
          [className]: className,
          link: !noGlobalClass,
          'link--primary': primary
        })}
      />
    )
  }
}

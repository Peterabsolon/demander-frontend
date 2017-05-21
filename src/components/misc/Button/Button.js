import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import Ink from 'react-ink'

import { Spinner } from 'components/misc'

import style from './button.styl'

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    center: PropTypes.bool,
    wide: PropTypes.bool,
    block: PropTypes.bool,
    noBackground: PropTypes.bool,
    type: PropTypes.string,
    offsetLeft: PropTypes.string,
    label: PropTypes.string,
    isLoading: PropTypes.bool,
    danger: PropTypes.bool,
    success: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    type: 'button'
  };

  render() {
    const {
      block,
      children,
      className,
      noBackground,
      center,
      wide,
      type,
      danger,
      success,
      isLoading,
      offsetLeft,
      label
    } = this.props

    return (
      <button
        type={type}
        onClick={this.props.onClick}
        className={cx(style.button, 'base-margin-small--bottom', {
          [className]: className,
          [style.block]: block,
          [style.noBackground]: noBackground,
          [style.wide]: wide,
          [style.danger]: danger,
          [style.success]: success,
          [style.center]: center,
          [style.hasOffset]: offsetLeft
        })}
        style={{ marginLeft: offsetLeft, width: `calc(100% - ${offsetLeft})` }}
      >
        <div className={style.content}>
          {isLoading &&
            <div className={style.spinner}>
              <Spinner white />
            </div>}

          <Ink background opacity={success || danger ? 0.75 : 0.25} />

          {children || label}
        </div>
      </button>
    )
  }
}

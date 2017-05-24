import React, { Component, PropTypes } from 'react'
import cx from 'classnames'
import Ink from 'react-ink'
import { Link } from 'react-router'

import { Spinner } from 'components/misc'

import style from './button.styl'

export default class Button extends Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    icon: PropTypes.string,
    iconClass: PropTypes.string,
    iconRight: PropTypes.string,
    iconRightClass: PropTypes.string,
    to: PropTypes.string,
    center: PropTypes.bool,
    alignRight: PropTypes.bool,
    wide: PropTypes.bool,
    secondary: PropTypes.bool,
    terniary: PropTypes.bool,
    block: PropTypes.bool,
    noBackground: PropTypes.bool,
    type: PropTypes.string,
    offsetLeft: PropTypes.string,
    label: PropTypes.string,
    isLoading: PropTypes.bool,
    danger: PropTypes.bool,
    small: PropTypes.bool,
    success: PropTypes.bool,
    onClick: PropTypes.func
  };

  static defaultProps = {
    type: 'button'
  };

  renderContent = () => {
    const {
      children,
      danger,
      noBackground,
      success,
      isLoading,
      label,
      icon,
      iconRight,
      iconRightClass,
      iconClass
    } = this.props

    return (
      <div className={style.content}>
        {isLoading &&
          <div className={style.spinner}>
            <Spinner white />
          </div>}

        {!noBackground &&
          <Ink background opacity={success || danger ? 0.75 : 0.15} />}

        <div className={style.labelContent}>
          {icon &&
            <i
              className={cx('material-icons', style.iconLeft, {
                [iconClass]: iconClass
              })}
            >
              {icon}
            </i>}

          {children || label}

          {iconRight &&
            <i
              className={cx('material-icons', style.iconRight, {
                [iconRightClass]: iconRightClass
              })}
            >
              {iconRight}
            </i>}
        </div>

      </div>
    )
  };

  render() {
    const {
      block,
      className,
      noBackground,
      center,
      secondary,
      terniary,
      alignRight,
      wide,
      to,
      type,
      danger,
      small,
      success,
      offsetLeft
    } = this.props

    const commonProps = {
      className: cx(style.button, 'base-margin-small--bottom', {
        [className]: className,
        [style.block]: block,
        [style.noBackground]: noBackground,
        [style.wide]: wide,
        [style.secondary]: secondary,
        [style.terniary]: terniary,
        [style.danger]: danger,
        [style.small]: small,
        [style.alignRight]: alignRight,
        [style.success]: success,
        [style.center]: center,
        [style.hasOffset]: offsetLeft
      }),
      style: { marginLeft: offsetLeft, width: `calc(100% - ${offsetLeft})` }
    }

    return to
      ? <div {...commonProps}>
        <Link to={to}>
          {this.renderContent()}
        </Link>
      </div>
      : <button type={type} onClick={this.props.onClick} {...commonProps}>
        {this.renderContent()}
      </button>
  }
}

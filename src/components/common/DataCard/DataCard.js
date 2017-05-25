import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import { Button, Paragraph, Title } from 'components/misc'

import style from './data-card.styl'

export default class DataCard extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string,
    handleUpdateItem: PropTypes.func,
    handleDeleteItem: PropTypes.func,
    company_name: PropTypes.string,
    company_description: PropTypes.string,
    slogan: PropTypes.string,
    category_title: PropTypes.string,
    category_icon: PropTypes.string,
    logo_url: PropTypes.string,
    web_url: PropTypes.string,
    fb_url: PropTypes.string,
    twitter_url: PropTypes.string,
    linkedin_url: PropTypes.string
  };

  constructor() {
    super()

    this.description = null

    this.state = {
      hasOverflowingText: false,
      isCollapsed: true
    }
  }

  componentDidMount() {
    this.handleOverlowingDescription()

    window.addEventListener('resize', this.handleOverlowingDescription)
  }

  componentDidUpdate() {
    this.handleOverlowingDescription()
  }

  componenWillUnmount() {
    window.removeEventListener('resize', this.handleOverlowingDescription)
  }

  handleOverlowingDescription = () => {
    const node = this.description

    // Account for bottom margin
    const hasOverflowingText = node &&
      node.offsetHeight &&
      node.offsetHeight + 26 < node.scrollHeight

    if (hasOverflowingText && !this.state.hasOverflowingText) {
      this.setState({ hasOverflowingText: true })
    }
  };

  handleToggleIsCollapsed = () =>
    this.setState({ isCollapsed: !this.state.isCollapsed });

  render() {
    const {
      id,
      type,
      company_description,
      category_title,
      category_icon,
      company_name,
      slogan,
      logo_url,
      web_url,
      fb_url,
      twitter_url,
      linkedin_url
    } = this.props
    const { isCollapsed, hasOverflowingText } = this.state

    const company = type === 'company'

    return (
      <div
        className={cx(style.wrapper, {
          [style.company]: company
        })}
      >
        {company &&
          <div className={style.header}>

            <Title h4 white noUppercase>
              {company_name}
            </Title>

            <div className={style.links}>
              {web_url &&
                <a href={web_url} className={style.icon}>
                  <i className="material-icons">language</i>
                </a>}
              {fb_url &&
                <a href={fb_url} className={style.icon}>
                  <i className="ico ico--facebook" />
                </a>}
              {twitter_url &&
                <a href={twitter_url} className={style.icon}>
                  <i className="ico ico--twitter" />
                </a>}
              {linkedin_url &&
                <a href={linkedin_url} className={style.icon}>
                  <i className="ico ico--linkedin" />
                </a>}
            </div>
          </div>}

        {logo_url &&
          <div className={style.logo}>
            <img src={logo_url} alt={company_name} />
          </div>}

        {category_title &&
          <Title h5 gray className={style.category}>
            <i className="material-icons">{category_icon}</i> {category_title}
          </Title>}

        {(slogan || company_description) &&
          <div
            className={cx(style.descriptionWrapper, {
              [style.hasOverflow]: hasOverflowingText,
              [style.isOpen]: !isCollapsed
            })}
          >
            <div
              ref={node => this.description = node}
              className={style.description}
            >
              <Paragraph>{slogan || company_description}</Paragraph>
            </div>

            {hasOverflowingText &&
              <a
                onClick={this.handleToggleIsCollapsed}
                className={cx(style.btnCollapse, 'link', {
                  [style.btnIsOpen]: !isCollapsed
                })}
              >
                <i className="ico ico--angle-down" />
              </a>}
          </div>}

        <Button
          label="Více info"
          iconRight="keyboard_backspace"
          iconRightClass="flip"
          center
          className={style.btnPrimary}
        />

        <div className={style.buttons}>
          <Button
            label="Upravit"
            onClick={() => this.props.handleUpdateItem(id)}
            small
            terniary
          />
          <Button
            label="Smazat"
            small
            terniary
            onClick={() => this.props.handleDeleteItem(id)}
          />
        </div>
      </div>
    )
  }
}

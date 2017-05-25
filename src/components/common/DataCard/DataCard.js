import React, { Component } from 'react'
import moment from 'moment'
import cx from 'classnames'
import PropTypes from 'prop-types'

import { Button, Paragraph, Title } from 'components/misc'

import style from './data-card.styl'

export default class DataCard extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string,
    handleGoToEdit: PropTypes.func,
    handleGoToDetail: PropTypes.func,
    handleDeleteItem: PropTypes.func,
    company_name: PropTypes.string,
    company_description: PropTypes.string,
    slogan: PropTypes.string,
    category_title: PropTypes.string,
    category_icon: PropTypes.string,
    logo_url: PropTypes.string,
    company_logo_url: PropTypes.string,
    created_at: PropTypes.string,
    goal: PropTypes.string,
    web_url: PropTypes.string,
    fb_url: PropTypes.string,
    twitter_url: PropTypes.string,
    linkedin_url: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string
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
    console.log(this.props)
    const {
      id,
      type,
      company_description,
      category_title,
      category_icon,
      company_name,
      company_logo_url,
      created_at,
      slogan,
      goal,
      title,
      description,
      logo_url,
      web_url,
      fb_url,
      twitter_url,
      linkedin_url
    } = this.props
    const { isCollapsed, hasOverflowingText } = this.state

    const isCompany = type === 'company'
    const isService = type === 'service'
    const isDemand = type === 'demand'

    const content = slogan || company_description || description || goal

    return (
      <div
        className={cx(style.wrapper, {
          [style.company]: isCompany
        })}
      >
        {isCompany &&
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

        {title &&
          <Title h4 noUppercase className={style.title}>
            {title}
          </Title>}

        {content &&
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
              <Paragraph>{content}</Paragraph>
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
          onClick={() => this.props.handleGoToDetail(id)}
        />

        <div className={style.buttons}>
          <Button
            label="Upravit"
            onClick={() => this.props.handleGoToEdit(id)}
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

        {(isService || isDemand) &&
          <div className={style.metaInfo}>
            <div className={cx(style.metaItem, style.metaCompany)}>
              {company_logo_url &&
                <div className={style.metaCompanyLogo}>
                  <img src={company_logo_url} alt={company_name} />
                </div>}

              {company_name &&
                <div className={style.metaCompanyName}>
                  {company_name}
                </div>}

              {created_at &&
                (isService || isDemand) &&
                <div className={cx(style.metaItem, style.metaFromNow)}>
                  {moment(created_at).fromNow()}
                </div>}
            </div>
          </div>}
      </div>
    )
  }
}

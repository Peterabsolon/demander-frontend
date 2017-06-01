import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Title, Paragraph } from 'components/misc'
import { Timeline } from 'components/common'
import { Section } from 'components/layout'

import style from './company-detail-summary.styl'

export default class CompanyDetailHeader extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  renderInfoBlock = (icon, title, data) => (
    <div className={style.infoBlock}>
      <div className={style.infoBlockHeader}>
        <div className={style.infoBlockIcon}>
          <i className="material-icons">{icon}</i>
        </div>
        <div className={style.infoBlockTitle}>
          <Title h4>{title}</Title>
        </div>
      </div>
      <div className={style.infoBlockBody}>
        {data}
      </div>
    </div>
  )

  render() {
    const { data } = this.props

    const company = data
    const category = data.category

    return company && category
      ? <div className={style.wrapper}>

        <Section textCenter>
          <div className="avatar">
            <img
              src={company.logo_url}
              alt={company.company_name}
              className={style.topLogo}
            />
          </div>
          <div className="name">
            <Title h1>
              {company.company_nice_name || company.company_name}
            </Title>
            <Title h4>
              {company.slogan}
            </Title>
          </div>
        </Section>

        <div className={style.header}>

          <div className={style.badge}>
            {/* {company.logo_url &&
            <div className={style.badgeLogo}>
              <img src={company.logo_url} alt={company.company_name} />
            </div>}

            <div className={style.badgeName}>
              <Title h2>
                {company.company_nice_name || company.company_name}
              </Title>
            </div>

            <div className={style.badgeSlogan}>
              <Paragraph noMargin>{company.slogan}</Paragraph>
            </div> */}
            <Paragraph>
              {company.company_description}
            </Paragraph>
          </div>

          <div className={style.about}>
            <div className={style.aboutHeader}>
              <div className={style.category}>
                {category.title &&
                <Title h5 gray>
                  <i className="material-icons">{category.icon}</i>
                  {' '}
                  {category.title}
                </Title>}
              </div>
              <div className={style.socialLinks}>
                {company.web_url &&
                <a href={company.web_url} className={style.icon}>
                  <i className="material-icons">language</i>
                </a>}
                {company.fb_url &&
                <a href={company.fb_url} className={style.icon}>
                  <i className="ico ico--facebook" />
                </a>}
                {company.twitter_url &&
                <a href={company.twitter_url} className={style.icon}>
                  <i className="ico ico--twitter" />
                </a>}
                {company.linkedin_url &&
                <a href={company.linkedin_url} className={style.icon}>
                  <i className="ico ico--linkedin" />
                </a>}
              </div>
            </div>

            <div className={style.info}>
              {this.renderInfoBlock(
                  'pin_drop',
                  'Najděte nás',
                <div>
                  {company.company_address &&
                  <div>{company.company_address}</div>}
                  {company.company_opening_hours &&
                  <div>{company.company_opening_hours}</div>}
                </div>,
                )}

              {this.renderInfoBlock(
                  'business_center',
                  'Údaje o firmě',
                <div>
                  {(company.company_nice_name || company.company_name) &&
                  <div>
                    {company.company_nice_name || company.company_name}
                  </div>}
                  {company.company_id && <div>{company.company_id}</div>}
                  {company.company_vat_id &&
                  <div>{company.company_vat_id}</div>}
                </div>,
                )}

              {this.renderInfoBlock(
                  'phone',
                  'Kontakt',
                <div>
                  {company.contact_person &&
                  <div>{company.contact_person}</div>}
                  {company.contact_telephone &&
                  <div>{company.contact_telephone}</div>}
                  {company.contact_email &&
                  <div>{company.contact_email}</div>}
                </div>,
                )}
            </div>
          </div>
        </div>

        <Timeline />
        {/* <Section textCenter maxWidth={600} guttersHalf>
          <Paragraph noMargin>
            {company.company_description}
          </Paragraph>
        </Section> */}
      </div>
      : <div />
  }
}

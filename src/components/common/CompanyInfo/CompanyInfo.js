import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Title, Paragraph, Button } from 'components/misc'

import style from './company-info.styl'

export default class CompanyInfo extends Component {
  static propTypes = {
    company: PropTypes.object
  };

  render() {
    const { company } = this.props

    return (
      <div className={style.badge}>
        {company.logo_url &&
          <div className={style.badgeLogo}>
            <img src={company.logo_url} alt={company.company_name} />
          </div>}

        <div className={style.badgeName}>
          <Title h2>
            {company.company_nice_name || company.company_name}
          </Title>
        </div>

        <div className={style.badgeSlogan}>
          <Paragraph>{company.slogan}</Paragraph>
        </div>

        <Button
          small
          terniary
          className="base-margin--bottom"
          to={`/dodavatele/${company.id}`}
          label="Profil dodavatele"
        />
      </div>
    )
  }
}

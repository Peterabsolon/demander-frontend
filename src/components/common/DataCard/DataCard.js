import React, { Component } from 'react'
import cx from 'classnames'
import PropTypes from 'prop-types'

import { Button, Paragraph } from 'components/misc'

import style from './data-card.styl'

export default class DataCard extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    type: PropTypes.string,
    handleUpdateItem: PropTypes.func,
    handleDeleteItem: PropTypes.func,
    company_name: PropTypes.string,
    company_description: PropTypes.string,
    category: PropTypes.string,
    logo_url: PropTypes.string
  };

  render() {
    console.log(this.props)
    const {
      id,
      type,
      company_description,
      category,
      company_name,
      logo_url
    } = this.props

    const company = type === 'company'

    return (
      <div
        className={cx(style.wrapper, {
          [style.company]: company
        })}
      >
        {company &&
          <div className={style.header}>
            {company_name}
          </div>}

        {logo_url &&
          <div className={style.logo}>
            <img src={logo_url} alt={company_name} />
          </div>}

        {category &&
          <div className={style.category}>
            {category}
          </div>}

        {company_description &&
          <div className={style.description}>
            <Paragraph>{company_description}</Paragraph>
          </div>}

        <Button label="Více info" center className={style.btnPrimary} />

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

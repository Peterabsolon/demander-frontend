import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'components/misc'
import { PageHeader } from 'components/layout'
import { CompanyDetailForm } from 'containers/forms/companies'

export default class CompanyNew extends Component {
  static propTypes = {
    props: PropTypes.object
  };

  render() {
    const { params } = this.props

    return (
      <div>
        <PageHeader
          title="Upravit společnost"
          // subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        >
          <Button
            to="/dodavatele"
            label="Seznam dodavatelů"
            icon="keyboard_backspace"
          />
        </PageHeader>
        <CompanyDetailForm params={params} />
      </div>
    )
  }
}

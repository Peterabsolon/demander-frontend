import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'components/misc'
import { PageHeader } from 'components/layout'
import { CompanyNewForm } from 'containers/forms/companies'

export default class CompanyNew extends Component {
  static propTypes = {
    something: PropTypes.any
  };

  render() {
    return (
      <div>
        <PageHeader
          title="Registrovat společnost"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        >
          <Button
            to="/dodavatele"
            label="Seznam dodavatelů"
            icon="keyboard_backspace"
          />
        </PageHeader>
        <CompanyNewForm />
      </div>
    )
  }
}

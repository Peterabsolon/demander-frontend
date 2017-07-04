import React, { Component } from 'react'

import { Button } from 'components/misc'
import { PageHeader } from 'components/layout'
import { CompanyNewForm } from 'containers/forms/companies'

export default class CompanyNew extends Component {
  render() {
    return (
      <div>
        <PageHeader title="Zaregistrovat firmu">
          {/* // subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit." */}
          <Button
            to="/dodavatele"
            label="Seznam dodavatelů"
            icon="keyboard_backspace"
            terniary
          />
          <Button
            to="/poptavky/vytvorit"
            label="Vložit poptávku bez registrace firmy"
            icon="add"
            offsetLeft="20"
          />
        </PageHeader>
        <CompanyNewForm {...this.props} />
      </div>
    )
  }
}

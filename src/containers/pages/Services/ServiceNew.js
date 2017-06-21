import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'components/misc'
import { PageHeader } from 'components/layout'
import { ServiceNewForm } from 'containers/forms/services'

export default class ServiceNew extends Component {
  static propTypes = {
    something: PropTypes.any,
  }

  render() {
    return (
      <div>
        <PageHeader title="Přidat novou službu">
          {/* // subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit." */}
          <Button
            to="/sluzby"
            label="Katalog služeb"
            icon="keyboard_backspace"
          />
        </PageHeader>
        <ServiceNewForm />
      </div>
    )
  }
}

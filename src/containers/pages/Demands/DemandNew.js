import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'components/misc'
import { PageHeader } from 'components/layout'
import { DemandNewForm } from 'containers/forms/demands'

export default class DemandNew extends Component {
  static propTypes = {
    something: PropTypes.any
  };

  render() {
    return (
      <div>
        <PageHeader title="Vytvořit poptávku">
          <Button
            terniary
            to="/poptavky"
            label="Seznam poptávek"
            icon="keyboard_backspace"
          />
        </PageHeader>
        <DemandNewForm />
      </div>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'components/misc'
import { PageHeader } from 'components/layout'
import { DemandDetailForm } from 'containers/forms/demands'

export default class DemandEdit extends Component {
  static propTypes = {
    params: PropTypes.object
  }

  render() {
    const { params } = this.props

    return (
      <div>
        <PageHeader title="Upravit poptávku">
          <Button
            to="/poptavky"
            label="Seznam poptávek"
            icon="keyboard_backspace"
          />
        </PageHeader>
        <DemandDetailForm params={params} />
      </div>
    )
  }
}

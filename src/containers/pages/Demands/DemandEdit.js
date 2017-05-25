import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'components/misc'
import { PageHeader } from 'components/layout'
import { DemandDetailForm } from 'containers/forms/demands'

export default class CompanyNew extends Component {
  static propTypes = {
    props: PropTypes.object
  };

  render() {
    const { params } = this.props

    return (
      <div>
        <PageHeader
          title="Upravit poptávku"
          // subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        >
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

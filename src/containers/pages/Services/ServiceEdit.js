import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'components/misc'
import { PageHeader } from 'components/layout'
import { ServiceDetailForm } from 'containers/forms/services'

export default class CompanyNew extends Component {
  static propTypes = {
    props: PropTypes.object
  };

  render() {
    const { params } = this.props

    return (
      <div>
        <PageHeader
          title="Upravit službu"
          // subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        >
          <Button
            to="/sluzby"
            label="Seznam služeb"
            icon="keyboard_backspace"
          />
        </PageHeader>
        <ServiceDetailForm params={params} />
      </div>
    )
  }
}

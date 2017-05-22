import React, { Component } from 'react'
import PropTypes from 'prop-types'

// import { Feed } from 'containers/misc'
import { Button } from 'components/misc'
import { PageHeader } from 'components/layout'

import { apiDemands, apiCategories } from 'decorators/api'

@apiDemands({
  list: true
})
@apiCategories({
  list: true
})
export default class Demands extends Component {
  static propTypes = {
    demands: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired
  };

  render() {
    const { demands, categories } = this.props

    console.log(demands)
    console.log(categories)

    return (
      <div>
        <PageHeader
          title="Seznam poptávek"
          subtitle="Aktuální poptávky v systému Demander"
        >
          <Button label="Vytvořit poptávku" />
        </PageHeader>
        {/* <Feed instance="demands" items={demands.list} /> */}
      </div>
    )
  }
}

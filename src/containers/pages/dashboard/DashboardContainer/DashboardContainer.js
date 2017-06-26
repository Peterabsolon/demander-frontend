import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import PropTypes from 'prop-types'

import { TabsList, TabsItem } from 'components/misc'

import { apiCompanies } from 'decorators/api'

@apiCompanies()
export default class DashboardContainer extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    companies: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  }

  handleGoToEdit = id => browserHistory.push(`/poptavky/${id}/upravit`)

  handleGoToDetail = id => browserHistory.push(`/poptavky/${id}`)

  render() {
    const { companies, location } = this.props

    const path = location.pathname

    return (
      <div>
        <TabsList>
          <TabsItem
            to="/dashboard/profil"
            isActive={path.includes('profil')}
            label="Profil"
          />
          <TabsItem
            to="/dashboard/sluzby"
            isActive={path.includes('sluzby')}
            label="Služby"
          />
          <TabsItem
            to="/dashboard/poptavky"
            isActive={path.includes('poptavky')}
            label="Poptávky"
          />
          <TabsItem
            to="/dashboard/konverzace"
            isActive={path.includes('konverzace')}
            label="Konverzace"
          />
        </TabsList>

        {React.cloneElement(this.props.children, { companies })}
      </div>
    )
  }
}

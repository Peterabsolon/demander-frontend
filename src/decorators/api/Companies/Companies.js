import React, { Component } from 'react'
import { omit } from 'lodash'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import apiAbstract from 'decorators/api/apiAbstract'
import { apiAuth } from 'decorators/api'
import { schema } from 'models/companies'

import * as companiesApi from 'redux/modules/api/companies'
import * as appActions from 'redux/modules/app'

// // TODO: Czech
// const messages = {
//   createSuccess: 'Článok úspešne vytvorený',
//   editSuccess: 'Článok úspešne upravený',
//   deleteSuccess: 'Článok úspešne zmazaný',
//   deleteConfirm: 'Naozaj zmazať článok?'
// }

const decorator = (config = {}) => ComposedComponent => {
  // messages: messages,
  @connect(
    ({ api }) => ({
      state: api.companies
    }),
    {
      ...companiesApi,
      ...appActions
    }
  )
  @apiAbstract({
    ...config,
    schema,
    events: {
      onCreate: () => browserHistory.push('/dodavatele'),
      onEdit: () => browserHistory.push('/dodavatele'),
      onDelete: () => browserHistory.push('/dodavatele')
    }
  })
  @apiAuth()
  class Posts extends Component {
    static propTypes = {
      notification: PropTypes.func.isRequired,
      // Validate abstract decorator payload
      payload: PropTypes.shape({
        // Reducer state for this decorator/model
        state: PropTypes.object.isRequired,
        // Raw api actions + api handlers
        api: PropTypes.shape({
          getList: PropTypes.func.isRequired,
          getById: PropTypes.func.isRequired,
          setFilter: PropTypes.func.isRequired,
          setParams: PropTypes.func.isRequired,
          createEntity: PropTypes.func.isRequired,
          updateEntity: PropTypes.func.isRequired,
          deleteEntity: PropTypes.func.isRequired,
          handleCreateEntity: PropTypes.func.isRequired,
          handleEditEntity: PropTypes.func.isRequired,
          handleDeleteEntity: PropTypes.func.isRequired,
          handleFetchMore: PropTypes.func.isRequired
        })
      }).isRequired
    }

    handleCreateEntity = async model => {
      const { payload: companies, auth } = this.props

      const data = schema(model)
      const company = await companies.api.createEntity(data)

      await companies.api.getList(companies)

      auth.api.loadUserCompany(company.body)

      this.props.notification('Záznam úspešne vytvorený', 'success')
      browserHistory.push(`/dodavatele/${company.body.id}`)
    }

    render() {
      const filteredProps = omit(this.props, ['payload'])

      return (
        <ComposedComponent
          {...filteredProps}
          companies={{
            ...this.props.payload,
            api: {
              ...this.props.payload.api,
              handleCreateEntity: this.handleCreateEntity
            }
          }}
        />
      )
    }
  }

  return Posts
}

export default decorator

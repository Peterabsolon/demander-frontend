import React, { Component } from 'react'
import { omit } from 'lodash'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import apiAbstract from 'decorators/api/apiAbstract'
import { schema } from 'models/services'

import * as servicesApi from 'redux/modules/api/services'

// // TODO: Czech
// const messages = {
//   createSuccess: 'Článok úspešne vytvorený',
//   editSuccess: 'Článok úspešne upravený',
//   deleteSuccess: 'Článok úspešne zmazaný',
//   deleteConfirm: 'Naozaj zmazať článok?'
// }

const decorator = (config = {}) =>
  ComposedComponent => {
    // messages: messages,
    @connect(
      ({ api }) => ({
        state: api.services
      }),
      {
        ...servicesApi
      }
    )
    @apiAbstract({
      ...config,
      schema,
      events: {
        onCreate: () => browserHistory.push('/sluzby'),
        onEdit: () => browserHistory.push('/sluzby'),
        onDelete: () => browserHistory.push('/sluzby')
      }
    })
    class Posts extends Component {
      static propTypes = {
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
      };

      render() {
        const filteredProps = omit(this.props, ['payload'])

        return (
          <ComposedComponent {...filteredProps} services={this.props.payload} />
        )
      }
    }

    return Posts
  }

export default decorator

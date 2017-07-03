import React, { Component } from 'react'
import { omit } from 'lodash'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import apiAbstract from 'decorators/api/apiAbstract'
import { schema } from 'models/demand'

import * as demandsApi from 'redux/modules/api/demands'

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
      state: api.demands
    }),
    {
      ...demandsApi
    }
  )
  @apiAbstract({
    ...config,
    schema,
    events: {
      onCreate: () => browserHistory.push('/poptavky'),
      onEdit: () => browserHistory.push('/poptavky'),
      onDelete: () => browserHistory.push('/poptavky')
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
        <ComposedComponent {...filteredProps} demands={this.props.payload} />
      )
    }
  }

  return Posts
}

export default decorator

import React, { Component } from 'react'
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
        onCreate: id => browserHistory.push(`/sluzby/${id}`),
        onEdit: () => {},
        onDelete: () => browserHistory.push('/sluzby')
      }
    })
    class Posts extends Component {
      static propTypes = {
        state: PropTypes.object.isRequired, // reducer state
        handleCreateEntity: PropTypes.func.isRequired,
        handleEditEntity: PropTypes.func.isRequired,
        handleDeleteEntity: PropTypes.func.isRequired,
        handleFetchMore: PropTypes.func.isRequired
      };

      render() {
        return (
          <ComposedComponent
            {...this.props}
            services={this.props.state}
            // Expose CRUD methods from apiAbstract
            handleCreatePost={this.props.handleCreateEntity}
            handleEditPost={this.props.handleEditEntity}
            handleDeletePost={this.props.handleDeleteEntity}
            handleFetchMore={this.props.handleFetchMore}
          />
        )
      }
    }

    return Posts
  }

export default decorator

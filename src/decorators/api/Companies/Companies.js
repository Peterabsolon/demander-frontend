import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import apiAbstract from 'decorators/api/apiAbstract'
import { schema } from 'models/companies'

import * as companiesApi from 'redux/modules/api/companies'

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
        state: api.companies
      }),
      {
        ...companiesApi
      }
    )
    @apiAbstract({
      ...config,
      schema,
      events: {
        onCreate: id => browserHistory.push(`/dodavatele/${id}`),
        onEdit: () => {},
        onDelete: () => browserHistory.push('/dodavatele')
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
            companies={this.props.state}
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

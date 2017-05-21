import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import apiAbstract from 'decorators/api/apiAbstract'
import { schema } from 'models/posts'

import * as postsApi from 'redux/modules/api/posts'
import * as appActions from 'redux/modules/app'

const decorator = (config = {}) =>
  ComposedComponent => {
    @connect(
      ({ api }) => ({
        state: api.posts
      }),
      {
        ...postsApi,
        ...appActions
      }
    )
    @apiAbstract({
      ...config,
      schema,
      messages: {
        createSuccess: 'Článok úspešne vytvorený',
        editSuccess: 'Článok úspešne upravený',
        deleteSuccess: 'Článok úspešne zmazaný',
        deleteConfirm: 'Naozaj zmazať článok?'
      },
      events: {
        onCreate: id => browserHistory.push(`/clanky/${id}`),
        onEdit: () => {},
        onDelete: () => browserHistory.push('/clanky')
      }
    })
    class Posts extends Component {
      static propTypes = {
        state: PropTypes.object.isRequired, // reducer state
        notification: PropTypes.func.isRequired,
        handleCreateEntity: PropTypes.func.isRequired,
        handleEditEntity: PropTypes.func.isRequired,
        handleDeleteEntity: PropTypes.func.isRequired,
        handleFetchMore: PropTypes.func.isRequired
      };

      handleGetPostExcelFile = () => {
        this.props.notification('Backend not ready yet', 'error')
      };

      render() {
        return (
          <ComposedComponent
            {...this.props}
            posts={this.props.state}
            // Expose CRUD metho sds from apiAbstract
            handleCreatePost={this.props.handleCreateEntity}
            handleEditPost={this.props.handleEditEntity}
            handleDeletePost={this.props.handleDeleteEntity}
            handleFetchMore={this.props.handleFetchMore}
            handleGetPostExcelFile={this.handleGetPostExcelFile}
          />
        )
      }
    }

    return Posts
  }

export default decorator

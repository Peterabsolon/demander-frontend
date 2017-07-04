import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { get } from 'lodash'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { PAGE_SIZE } from 'constants/misc'

import * as conversationsApi from 'redux/modules/api/conversations'
import * as appActions from 'redux/modules/app'

import modals from 'constants/modals'

const decorator = (config = {}) => ComposedComponent => {
  @connect(
    ({ api }) => ({
      state: api.conversations,
      user: api.auth.user
    }),
    {
      ...conversationsApi,
      ...appActions
    }
  )
  class Conversations extends Component {
    static propTypes = {
      // Reducer state
      state: PropTypes.object.isRequired,
      user: PropTypes.object.isRequired,
      sendMessage: PropTypes.func.isRequired,
      getList: PropTypes.func.isRequired,
      modal: PropTypes.func.isRequired,
      putMessage: PropTypes.func.isRequired,
      createConversation: PropTypes.func.isRequired,
      getDetail: PropTypes.func.isRequired,
      setListParams: PropTypes.func.isRequired
    };

    componentWillMount() {
      const { state, user, params, getList, getDetail } = this.props
      const companyId = get(user, 'company.id')

      config.list && !state.list.loaded && getList(state.list, companyId)
      config.detail && get(params, 'id') && getDetail(params.id)
    }

    componentWillReceiveProps(nextProps) {
      this.handleFetchList(nextProps)
      this.handleFetchDetail(nextProps)
    }

    handleFetchList = nextProps => {
      const { state, user } = this.props
      const { filter, offset, limit, sort } = nextProps.state.list
      const companyId = get(user, 'company.id')

      if (state.list.limit !== limit) {
        config.list &&
          this.props.getList(nextProps.state.list, companyId, {
            noLoading: true
          })
      } else if (
        state.list.filter !== filter ||
        state.list.offset !== offset ||
        state.list.sort !== sort
      ) {
        config.list && this.props.getList(nextProps.state.list, companyId)
      }
    };

    handleFetchMore = () => {
      const { state } = this.props
      const { limit, count } = state.list

      const hasMore = Math.abs(limit + PAGE_SIZE) <= PAGE_SIZE + count

      hasMore && this.props.setListParams({ limit: limit + PAGE_SIZE })
    };

    handleRefreshList = () => {
      const { state, user } = this.props
      const companyId = get(user, 'company.id')

      return this.props.getList(state.list, companyId)
    };

    handleFetchDetail = nextProps => {
      const currentId = get(this.props, 'params.id')
      const nextId = get(nextProps, 'params.id')

      if (config.detail && nextId && currentId !== nextId) {
        this.props.getDetail(nextId)
      }
    };

    handleRequestService = () => this.props.modal(modals.REQUEST_SERVICE);

    handleRequestServiceSubmit = (formValues, service) => {
      const payload = {
        message: formValues.message,
        company_id: service.company_id,
        title: service.title,
        topic: 'SERVICE'
      }

      this.props.createConversation(payload).then(({ body }) => {
        browserHistory.push(`/dashboard/konverzace/${body.id}`)

        this.handleRefreshList()
      })
    };

    handleSubmitMessage = (conversationId, message) => {
      const { user } = this.props

      const payload = {
        message,
        conversation_id: conversationId,
        anonymous: false
      }

      this.props
        .sendMessage(payload)
        .then(() => this.props.putMessage({ message, user_id: user.id }))
    };

    render() {
      const { state } = this.props

      const payload = {
        state,
        api: {
          handleFetchMore: this.handleFetchMore,
          handleRequestService: this.handleRequestService,
          handleRequestServiceSubmit: this.handleRequestServiceSubmit,
          handleSubmitMessage: this.handleSubmitMessage
        }
      }

      return <ComposedComponent {...this.props} conversations={payload} />
    }
  }

  return Conversations
}

export default decorator

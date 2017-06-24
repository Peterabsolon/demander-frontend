import React, { Component } from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as conversationsApi from 'redux/modules/api/conversations'

const decorator = (config = {}) => ComposedComponent => {
  @connect(
    ({ api }) => ({
      state: api.conversations,
      user: api.auth.user
    }),
    {
      ...conversationsApi
    }
  )
  class Conversations extends Component {
    static propTypes = {
      // Reducer state
      state: PropTypes.object.isRequired,
      user: PropTypes.object.isRequired,
      getConversations: PropTypes.func.isRequired
    }

    componentWillMount() {
      const { state, user, getConversations } = this.props
      const companyId = get(user, 'company.id')

      config.list &&
        !state.list.loaded &&
        companyId &&
        getConversations(state, companyId)
    }

    render() {
      const { state } = this.props

      return <ComposedComponent {...this.props} conversations={state} />
    }
  }

  return Conversations
}

export default decorator

import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import * as conversationsApi from 'redux/modules/api/conversations'

const decorator = () => ComposedComponent => {
  @connect(
    ({ api }) => ({
      state: api.conversations
    }),
    {
      ...conversationsApi
    }
  )
  class Conversations extends Component {
    static propTypes = {
      // Reducer state
      state: PropTypes.object.isRequired
    }

    componentWillMount() {
      console.log('yo')
    }

    render() {
      const { state } = this.props

      return <ComposedComponent conversations={state} />
    }
  }

  return Conversations
}

export default decorator

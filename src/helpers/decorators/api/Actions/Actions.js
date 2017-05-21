import React, { Component } from 'react'
import { connect } from 'react-redux'
import { notification } from 'redux/modules/app'
import { actions as actionsApi } from 'redux/modules/api'

function decorator(config = {}) {
  return ComposedComponent => {
    @connect(({ api, app }) => ({
      localeId: app.locale.id,
      actions: api.actions
    }), { ...actionsApi, notification })
    class Actions extends Component {
      static propTypes = {
        actions: React.PropTypes.object.isRequired,
        getActions: React.PropTypes.func.isRequired,
      }

      componentWillMount() {
        // const { actions } = this.props

        // config.list && this.handleGetActions(actions)
      }

      componentWillReceiveProps(nextProps) {
        const { actions } = this.props
        const { filter, limit, offset, sort } = nextProps.actions

        if ((actions.filter !== filter) || actions.limit !== limit || actions.offset !== offset || actions.sort !== sort) {
          config.list && this.handleGetActions(nextProps.actions)
        }
      }

      handleGetActions = actions => this.props.getActions(actions)

      render() {
        return (
          <ComposedComponent {...this.props} />
        )
      }
    }
    return Actions
  }
}

export default decorator

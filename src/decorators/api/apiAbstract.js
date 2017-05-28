import React, { Component } from 'react'
import { get, omit } from 'lodash'
import { connect } from 'react-redux'
import { PAGE_SIZE } from 'constants/misc'
import PropTypes from 'prop-types'

import * as appActions from 'redux/modules/app'

const decorator = (config = {}) =>
  ComposedComponent => {
    if (!config.messages) {
      config.messages = {
        createSuccess: 'Záznam úspešne vytvorený',
        editSuccess: 'Záznam úspešne upravený',
        deleteSuccess: 'Záznam úspešne zmazaný',
        deleteConfirm: 'Naozaj zmazať záznam?'
      }
    }

    @connect(null, {
      ...appActions
    })
    class apiAbstract extends Component {
      static propTypes = {
        // REDUCER STATE
        state: PropTypes.object.isRequired,
        createEntity: PropTypes.func.isRequired,
        params: PropTypes.object,
        setParams: PropTypes.func.isRequired,
        notification: PropTypes.func.isRequired,
        updateEntity: PropTypes.func.isRequired,
        deleteEntity: PropTypes.func.isRequired,
        getList: PropTypes.func.isRequired,
        getById: PropTypes.func.isRequired
      };

      componentWillMount() {
        const { state, params } = this.props

        config.list && !state.loaded && this.props.getList(state)
        config.detail && get(params, 'id') && this.props.getById(params.id)
      }

      componentWillReceiveProps(nextProps) {
        this.handleFetchList(nextProps)
        this.handleFetchDetail(nextProps)
      }

      /**
       * Fetch list on filters/pagination change
       */
      handleFetchList = nextProps => {
        const { state } = this.props
        const { filter, offset, limit, sort } = nextProps.state

        if (state.limit !== limit) {
          config.list &&
            this.props.getList(nextProps.state, {
              noLoading: true
            })
        } else if (
          state.filter !== filter ||
          state.offset !== offset ||
          state.sort !== sort
        ) {
          config.list && this.props.getList(nextProps.state)
        }
      };

      /**
       * Fetch detail on route change
       */
      handleFetchDetail = nextProps => {
        const currentId = get(this.props, 'params.id')
        const nextId = get(nextProps, 'params.id')

        if (config.detail && nextId && currentId !== nextId) {
          this.props.getById(nextId)
        }
      };

      handleCreateEntity = async model => {
        const { state } = this.props
        const data = config.schema(model)

        const entity = await this.props.createEntity(data)

        await this.props.getList(state)
        const newId = entity.body.id

        this.props.notification(config.messages.createSuccess, 'success')

        if (config.events.onCreate) {
          return setTimeout(() => config.events.onCreate(newId), 0)
        }
      };

      handleEditEntity = async model => {
        const { state } = this.props
        const id = state.detail.id
        const data = config.schema(model)

        await this.props.updateEntity(id, data)
        await this.props.getList(state, { noLoading: true })

        this.props.notification(config.messages.editSuccess, 'success')

        if (config.events.onEdit) {
          return setTimeout(() => config.events.onEdit(id), 0)
        }
      };

      handleDeleteEntity = async entityId => {
        const promptConfirmed = confirm(config.messages.deleteConfirm)

        if (promptConfirmed) {
          const { state } = this.props
          const id = entityId || state.detail.id

          await this.props.deleteEntity(id)
          await this.props.getList(state)

          this.props.notification(config.messages.deleteSuccess, 'success')

          if (config.events.onDelete) {
            return setTimeout(() => config.events.onDelete(id), 0)
          }
        }
      };

      /**
       * Fetch more items for the infinite scroll feed
       */
      handleFetchMore = () => {
        const { state } = this.props
        const { limit, count } = state

        const hasMore = Math.abs(limit + PAGE_SIZE) <= PAGE_SIZE + count

        hasMore && this.props.setParams({ limit: limit + PAGE_SIZE })
      };

      render() {
        // REDUCER STATE!
        const { state } = this.props

        const reducerMethods = [
          'getList',
          'getById',
          'setFilter',
          'setParams',
          'createEntity',
          'updateEntity',
          'deleteEntity'
        ]

        const api = {
          handleCreateEntity: this.handleCreateEntity,
          handleEditEntity: this.handleEditEntity,
          handleDeleteEntity: this.handleDeleteEntity,
          handleFetchMore: this.handleFetchMore
        }

        // 1. Filter reducer methods to prevent conflicts
        const filteredProps = omit(this.props, ['state', ...reducerMethods])

        // 2. Reattach reducer methods to the payload
        reducerMethods.forEach(method => {
          api[method] = this.props[method]
        })

        const payload = { state, api }

        return <ComposedComponent {...filteredProps} payload={payload} />
      }
    }

    return apiAbstract
  }

export default decorator
